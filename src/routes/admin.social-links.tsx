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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { socialLinkSchema } from "@/lib/validators"
import {
  listSocialLinksAdminFn,
  createSocialLinkFn,
  updateSocialLinkFn,
  deleteSocialLinkFn,
} from "@/lib/server-fns/admin/social-links"

type SocialLink = {
  id: string
  label: string
  href: string
  icon: string
  order: number
}

const KNOWN_ICONS = [
  "linkedin",
  "instagram",
  "twitter",
  "facebook",
  "youtube",
  "tiktok",
  "mail",
  "phone",
  "location",
]

export const Route = createFileRoute("/admin/social-links")({
  loader: async () => ({ links: await listSocialLinksAdminFn() }),
  component: SocialLinksPage,
})

function SocialLinksPage() {
  const { links } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<SocialLink | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<SocialLink | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteSocialLinkFn({ data: { id: deleting.id } })
      toast.success("Link deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="Site-wide"
      title="Social links"
      description="Links shown in the public site footer."
      actions={
        <Button onClick={() => setCreating(true)} className="gap-2">
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add link
        </Button>
      }
    >
      {links.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No links yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="w-20">Order</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.label}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{link.icon}</TableCell>
                  <TableCell className="text-xs text-muted-foreground truncate max-w-md">
                    {link.href}
                  </TableCell>
                  <TableCell className="tabular-nums">{link.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(link)}
                        className="h-8 w-8"
                      >
                        <HugeiconsIcon icon={Edit01Icon} size={14} strokeWidth={2} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(link)}
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
        <SocialLinkDialog
          link={editing}
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
            <AlertDialogTitle>Delete link?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes "{deleting?.label}" from the footer.
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

function SocialLinkDialog({
  link,
  onClose,
  onSaved,
}: {
  link: SocialLink | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    link
      ? { label: link.label, href: link.href, icon: link.icon, order: link.order }
      : { label: "", href: "", icon: "linkedin", order: 0 },
  )
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = socialLinkSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (link) {
        await updateSocialLinkFn({ data: { id: link.id, data: parsed.data } })
        toast.success("Link updated.")
      } else {
        await createSocialLinkFn({ data: parsed.data })
        toast.success("Link created.")
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
          <DialogTitle>{link ? "Edit link" : "Add link"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={form.label}
              onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
              placeholder="LinkedIn"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="href">URL</Label>
            <Input
              id="href"
              type="url"
              value={form.href}
              onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
              placeholder="https://linkedin.com/company/..."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Icon</Label>
            <Select
              value={form.icon}
              onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {KNOWN_ICONS.map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
