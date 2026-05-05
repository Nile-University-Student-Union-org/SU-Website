import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit01Icon, Delete01Icon, Calendar01Icon } from "@hugeicons/core-free-icons"
import { AdminShell } from "@/components/admin/AdminShell"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { eventSchema } from "@/lib/validators"
import {
  listEventsAdminFn,
  createEventFn,
  updateEventFn,
  deleteEventFn,
  listEventStatusesAdminFn,
} from "@/lib/server-fns/admin/events"

type Status = { id: string; slug: string; name: string; color: string }

type Event = {
  id: string
  name: string
  startAt: Date | string
  endAt: Date | string
  statusId: string
  location: string
  description: string
  tags: string[]
  image: string
  status: Status
}

function toLocalInput(d: Date | string): string {
  const date = d instanceof Date ? d : new Date(d)
  const pad = (n: number) => n.toString().padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const Route = createFileRoute("/admin/events")({
  loader: async () => {
    const [events, statuses] = await Promise.all([
      listEventsAdminFn(),
      listEventStatusesAdminFn(),
    ])
    return {
      events: events as Event[],
      statuses: statuses.map((s) => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        color: s.color,
      })),
    }
  },
  component: EventsAdminPage,
})

function EventsAdminPage() {
  const { events, statuses } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<Event | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Event | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteEventFn({ data: { id: deleting.id } })
      toast.success("Event deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="Events page"
      title="Events"
      description="Events shown on the public events calendar."
      actions={
        <Button
          onClick={() => setCreating(true)}
          disabled={statuses.length === 0}
          className="gap-2"
        >
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add event
        </Button>
      }
    >
      {statuses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          Create at least one event category before adding events.
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No events yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {format(new Date(e.startAt), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: e.status.color }}
                      />
                      {e.status.name}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                    {e.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(e)}
                        className="h-8 w-8"
                      >
                        <HugeiconsIcon
                          icon={Edit01Icon}
                          size={14}
                          strokeWidth={2}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(e)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <HugeiconsIcon
                          icon={Delete01Icon}
                          size={14}
                          strokeWidth={2}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {(creating || editing) && statuses.length > 0 && (
        <EventDialog
          event={editing}
          statuses={statuses}
          onClose={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSaved={() => {
            setCreating(false)
            setEditing(null)
            router.invalidate()
          }}
        />
      )}

      <AlertDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete event?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deleting?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  )
}

function DateTimeInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const datePart = value.slice(0, 10)
  const timePart = value.slice(11, 16) || "00:00"
  const selected = datePart ? new Date(datePart + "T00:00") : undefined

  function handleSelect(date: Date | undefined) {
    if (!date) return
    onChange(`${format(date, "yyyy-MM-dd")}T${timePart}`)
    setOpen(false)
  }

  function handleTime(e: React.ChangeEvent<HTMLInputElement>) {
    const d = datePart || format(new Date(), "yyyy-MM-dd")
    onChange(`${d}T${e.target.value}`)
  }

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button type="button" variant="outline" className="w-full justify-start gap-2 font-normal">
              <HugeiconsIcon icon={Calendar01Icon} size={14} strokeWidth={2} className="shrink-0" />
              {selected ? format(selected, "MMM d, yyyy") : "Pick a date"}
            </Button>
          }
        />
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <Input type="time" value={timePart} onChange={handleTime} />
    </div>
  )
}

function EventDialog({
  event,
  statuses,
  onClose,
  onSaved,
}: {
  event: Event | null
  statuses: Status[]
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    event
      ? {
          name: event.name,
          startAt: toLocalInput(event.startAt),
          endAt: toLocalInput(event.endAt),
          statusId: event.statusId,
          location: event.location,
          description: event.description,
          tags: event.tags,
          image: event.image,
        }
      : {
          name: "",
          startAt: toLocalInput(new Date()),
          endAt: toLocalInput(new Date()),
          statusId: statuses[0]?.id ?? "",
          location: "",
          description: "",
          tags: [] as string[],
          image: "",
        }
  )
  const [tagInput, setTagInput] = useState("")
  const [saving, setSaving] = useState(false)

  function addTag() {
    const t = tagInput.trim()
    if (!t) return
    if (!form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }))
    }
    setTagInput("")
  }

  function removeTag(tag: string) {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = eventSchema.safeParse({
      ...form,
      startAt: new Date(form.startAt),
      endAt: new Date(form.endAt),
    })
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (event) {
        await updateEventFn({ data: { id: event.id, data: parsed.data } })
        toast.success("Event updated.")
      } else {
        await createEventFn({ data: parsed.data })
        toast.success("Event created.")
      }
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit event" : "Add event"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label>Start</Label>
              <DateTimeInput
                value={form.startAt}
                onChange={(v) => setForm((f) => ({ ...f, startAt: v }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>End</Label>
              <DateTimeInput
                value={form.endAt}
                onChange={(v) => setForm((f) => ({ ...f, endAt: v }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select
              value={form.statusId}
              onValueChange={(v) => setForm((f) => ({ ...f, statusId: v }))}
            >
              <SelectTrigger>
                {statuses.find((s) => s.id === form.statusId)?.name}
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <RichTextEditor
              value={form.description}
              onChange={(html) => setForm((f) => ({ ...f, description: html }))}
              placeholder="Describe the event…"
            />
          </div>

          <ImageUploader
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
            prefix="events"
            requirement="event"
            label="Cover image"
          />

          <div className="flex flex-col gap-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
                placeholder="Type and press Enter"
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
            {form.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-destructive-foreground inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:border-destructive hover:bg-destructive"
                  >
                    {tag}
                    <span className="text-muted-foreground">×</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
