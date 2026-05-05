import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { AdminShell } from "@/components/admin/AdminShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { committeeSchema } from "@/lib/validators"
import {
  listCommitteesAdminFn,
  createCommitteeFn,
  updateCommitteeFn,
  deleteCommitteeFn,
} from "@/lib/server-fns/admin/committees"

type Committee = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  color: string
  order: number
  _count: { members: number }
}

export const Route = createFileRoute("/admin/committees")({
  loader: async () => ({ committees: await listCommitteesAdminFn() }),
  component: CommitteesPage,
})

function CommitteesPage() {
  const { committees } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<Committee | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Committee | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteCommitteeFn({ data: { id: deleting.id } })
      toast.success("Committee deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="About page"
      title="Committees"
      description="Each committee is a section on the about page with its own member grid."
      actions={
        <Button onClick={() => setCreating(true)} className="gap-2">
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add committee
        </Button>
      }
    >
      {committees.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No committees yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Color</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tagline</TableHead>
                <TableHead className="w-24">Members</TableHead>
                <TableHead className="w-20">Order</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {committees.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <span
                      className="block h-4 w-4 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{c.slug}</TableCell>
                  <TableCell className="text-xs text-muted-foreground truncate max-w-xs">
                    {c.tagline}
                  </TableCell>
                  <TableCell className="tabular-nums text-sm">{c._count.members}</TableCell>
                  <TableCell className="tabular-nums">{c.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(c)}
                        className="h-8 w-8"
                      >
                        <HugeiconsIcon icon={Edit01Icon} size={14} strokeWidth={2} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(c)}
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
        <CommitteeDialog
          committee={editing}
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
            <AlertDialogTitle>Delete committee?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deleting?.name}" and all{" "}
              {deleting?._count.members ?? 0} of its members.
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

function CommitteeDialog({
  committee,
  onClose,
  onSaved,
}: {
  committee: Committee | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    committee
      ? {
          slug: committee.slug,
          name: committee.name,
          tagline: committee.tagline,
          description: committee.description,
          color: committee.color,
          order: committee.order,
        }
      : {
          slug: "",
          name: "",
          tagline: "",
          description: "",
          color: "#018BCE",
          order: 0,
        },
  )
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = committeeSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (committee) {
        await updateCommitteeFn({ data: { id: committee.id, data: parsed.data } })
        toast.success("Committee updated.")
      } else {
        await createCommitteeFn({ data: parsed.data })
        toast.success("Committee created.")
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{committee ? "Edit committee" : "Add committee"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
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
                placeholder="executive"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={form.tagline}
              onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
              placeholder="Leadership"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Describe this committee…"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
