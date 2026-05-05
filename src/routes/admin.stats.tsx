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
import { statSchema } from "@/lib/validators"
import { listStatsAdminFn, createStatFn, updateStatFn, deleteStatFn } from "@/lib/server-fns/admin/stats"

type Stat = { id: string; value: string; label: string; order: number }

export const Route = createFileRoute("/admin/stats")({
  loader: async () => ({ stats: (await listStatsAdminFn()) as Stat[] }),
  component: StatsPage,
})

function StatsPage() {
  const { stats } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<Stat | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Stat | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteStatFn({ data: { id: deleting.id } })
      toast.success("Stat deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="Home page"
      title="Stats"
      description="Numbers shown in the mission section of the home page (e.g. 500+ students)."
      actions={
        <Button onClick={() => setCreating(true)} className="gap-2">
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add stat
        </Button>
      }
    >
      {stats.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No stats yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Value</TableHead>
                <TableHead>Label</TableHead>
                <TableHead className="w-24">Order</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-semibold tabular-nums">{s.value}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.label}</TableCell>
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
        <StatDialog
          stat={editing}
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
            <AlertDialogTitle>Delete stat?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes "{deleting?.value} {deleting?.label}" from the home page.
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

function StatDialog({
  stat,
  onClose,
  onSaved,
}: {
  stat: Stat | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    stat
      ? { value: stat.value, label: stat.label, order: stat.order }
      : { value: "", label: "", order: 0 },
  )
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = statSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (stat) {
        await updateStatFn({ data: { id: stat.id, data: parsed.data } })
        toast.success("Stat updated.")
      } else {
        await createStatFn({ data: parsed.data })
        toast.success("Stat created.")
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
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{stat ? "Edit stat" : "Add stat"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={form.value}
              onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
              placeholder="500+"
              required
            />
            <p className="text-xs text-muted-foreground">The number or text shown large (e.g. "500+" or "12").</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              placeholder="students"
              required
            />
            <p className="text-xs text-muted-foreground">Descriptor shown below the value.</p>
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
