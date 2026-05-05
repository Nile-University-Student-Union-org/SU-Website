import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { AdminShell } from "@/components/admin/AdminShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { eventStatusSchema } from "@/lib/validators"
import {
  listEventStatusesAdminFn,
  createEventStatusFn,
  updateEventStatusFn,
  deleteEventStatusFn,
} from "@/lib/server-fns/admin/events"

type Status = {
  id: string
  slug: string
  name: string
  color: string
  order: number
  _count: { events: number }
}

export const Route = createFileRoute("/admin/event-statuses")({
  loader: async () => ({ statuses: await listEventStatusesAdminFn() }),
  component: EventStatusesPage,
})

function EventStatusesPage() {
  const { statuses } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<Status | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Status | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteEventStatusFn({ data: { id: deleting.id } })
      toast.success("Category deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="Events page"
      title="Event categories"
      description="Coloured tags applied to events. Used in the calendar legend."
      actions={
        <Button onClick={() => setCreating(true)} className="gap-2">
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add category
        </Button>
      }
    >
      {statuses.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No categories yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Color</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-24">Events</TableHead>
                <TableHead className="w-20">Order</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statuses.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <span
                      className="block h-4 w-4 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.slug}</TableCell>
                  <TableCell className="tabular-nums text-sm">{s._count.events}</TableCell>
                  <TableCell className="tabular-nums">{s.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(s)}
                        className="h-8 w-8"
                      >
                        <HugeiconsIcon icon={Edit01Icon} size={14} strokeWidth={2} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(s)}
                        disabled={s._count.events > 0}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={14} strokeWidth={2} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {(creating || editing) && (
        <StatusDialog
          status={editing}
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

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes "{deleting?.name}". Events using it must be re-categorised first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  )
}

function StatusDialog({
  status,
  onClose,
  onSaved,
}: {
  status: Status | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    status
      ? { slug: status.slug, name: status.name, color: status.color, order: status.order }
      : { slug: "", name: "", color: "#018BCE", order: 0 },
  )
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = eventStatusSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (status) {
        await updateEventStatusFn({ data: { id: status.id, data: parsed.data } })
        toast.success("Category updated.")
      } else {
        await createEventStatusFn({ data: parsed.data })
        toast.success("Category created.")
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{status ? "Edit category" : "Add category"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="fashion-style"
              required
            />
            <p className="text-xs text-muted-foreground">Lowercase letters, numbers, dashes only.</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                className="h-10 w-14 rounded-md border border-border cursor-pointer"
              />
              <Input
                id="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
                placeholder="#018BCE"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="order">Order</Label>
            <Input
              id="order"
              type="number"
              value={form.order}
              onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
            />
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
