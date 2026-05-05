import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { AdminShell } from "@/components/admin/AdminShell"
import { ImageUploader } from "@/components/admin/ImageUploader"
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
import { sponsorSchema } from "@/lib/validators"
import {
  listSponsorsAdminFn,
  createSponsorFn,
  updateSponsorFn,
  deleteSponsorFn,
} from "@/lib/server-fns/admin/sponsors"

type Sponsor = {
  id: string
  name: string
  label: string
  year: string
  imageUrl: string
  websiteUrl: string | null
  description: string | null
  order: number
}

const emptyForm = {
  name: "",
  label: "",
  year: "",
  imageUrl: "",
  websiteUrl: "",
  description: "",
  order: 0,
}

export const Route = createFileRoute("/admin/sponsors")({
  loader: async () => ({ sponsors: await listSponsorsAdminFn() }),
  component: SponsorsPage,
})

function SponsorsPage() {
  const { sponsors } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<Sponsor | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Sponsor | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteSponsorFn({ data: { id: deleting.id } })
      toast.success("Sponsor deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="Home page"
      title="Sponsors"
      description="Sponsors shown in the carousel on the home page."
      actions={
        <Button onClick={() => setCreating(true)} className="gap-2">
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add sponsor
        </Button>
      }
    >
      {sponsors.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No sponsors yet. Click "Add sponsor" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sponsors.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border overflow-hidden bg-background">
              <div className="aspect-video bg-muted overflow-hidden">
                {s.imageUrl && <img src={s.imageUrl} alt={s.name} className="h-full w-full object-cover" />}
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  {s.label && <p className="text-xs text-muted-foreground">{s.label}</p>}
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    Order {s.order}
                  </span>
                  <div className="flex gap-1">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <SponsorDialog
          sponsor={editing}
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
            <AlertDialogTitle>Delete sponsor?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deleting?.name}". This action cannot be undone.
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

function SponsorDialog({
  sponsor,
  onClose,
  onSaved,
}: {
  sponsor: Sponsor | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    sponsor
      ? {
          name: sponsor.name,
          label: sponsor.label,
          year: sponsor.year,
          imageUrl: sponsor.imageUrl,
          websiteUrl: sponsor.websiteUrl ?? "",
          description: sponsor.description ?? "",
          order: sponsor.order,
        }
      : emptyForm,
  )
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = sponsorSchema.safeParse({
      ...form,
      websiteUrl: form.websiteUrl || undefined,
      description: form.description || undefined,
    })
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (sponsor) {
        await updateSponsorFn({ data: { id: sponsor.id, data: parsed.data } })
        toast.success("Sponsor updated.")
      } else {
        await createSponsorFn({ data: parsed.data })
        toast.success("Sponsor created.")
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
          <DialogTitle>{sponsor ? "Edit sponsor" : "Add sponsor"}</DialogTitle>
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

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="label">Label (optional)</Label>
              <Input
                id="label"
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                placeholder="The Clubs Festival"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="year">Year (optional)</Label>
              <Input
                id="year"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                placeholder="2025"
              />
            </div>
          </div>

          <ImageUploader
            value={form.imageUrl}
            onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
            prefix="sponsors"
            requirement="sponsor"
            label="Logo"
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="websiteUrl">Website URL (optional)</Label>
            <Input
              id="websiteUrl"
              value={form.websiteUrl}
              onChange={(e) => setForm((f) => ({ ...f, websiteUrl: e.target.value }))}
              placeholder="https://example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="order">Display order</Label>
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
