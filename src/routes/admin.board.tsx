import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Edit01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { AdminShell } from "@/components/admin/AdminShell"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { RichTextEditor } from "@/components/admin/RichTextEditor"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { boardMemberSchema } from "@/lib/validators"
import { listBoardMembersAdminFn, createBoardMemberFn, updateBoardMemberFn, deleteBoardMemberFn } from "@/lib/server-fns/admin/board"
import { listCommitteesAdminFn } from "@/lib/server-fns/admin/committees"

type Member = {
  id: string
  name: string
  role: string
  committeeId: string
  major: string
  year: string
  image: string
  bio: string
  cvDescription: string
  inSu: string[]
  collaborations: string[]
  achievements: string[]
  email: string | null
  linkedin: string | null
  order: number
  committee: { id: string; name: string; slug: string; color: string }
}

type Committee = { id: string; name: string; slug: string; color: string }

export const Route = createFileRoute("/admin/board")({
  loader: async () => {
    const [members, committees] = await Promise.all([
      listBoardMembersAdminFn(),
      listCommitteesAdminFn(),
    ])
    return {
      members: members as Member[],
      committees: committees.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        color: c.color,
      })),
    }
  },
  component: BoardPage,
})

function BoardPage() {
  const { members, committees } = Route.useLoaderData()
  const router = useRouter()
  const [editing, setEditing] = useState<Member | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Member | null>(null)

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteBoardMemberFn({ data: { id: deleting.id } })
      toast.success("Member deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  return (
    <AdminShell
      eyebrow="About page"
      title="Board members"
      description="Profiles shown on the about page member grids."
      actions={
        <Button
          onClick={() => setCreating(true)}
          disabled={committees.length === 0}
          className="gap-2"
        >
          <HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2} />
          Add member
        </Button>
      }
    >
      {committees.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          Create at least one committee before adding board members.
        </div>
      ) : members.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No members yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Committee</TableHead>
                <TableHead className="w-20">Order</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                      {m.image && (
                        <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.role}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 text-xs">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: m.committee.color }}
                      />
                      {m.committee.name}
                    </span>
                  </TableCell>
                  <TableCell className="tabular-nums">{m.order}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditing(m)}
                        className="h-8 w-8"
                      >
                        <HugeiconsIcon icon={Edit01Icon} size={14} strokeWidth={2} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(m)}
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

      {(creating || editing) && committees.length > 0 && (
        <MemberDialog
          member={editing}
          committees={committees}
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
            <AlertDialogTitle>Delete member?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes "{deleting?.name}".
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

function ListInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const [inputVal, setInputVal] = useState("")

  function add() {
    const v = inputVal.trim()
    if (!v) return
    onChange([...value, v])
    setInputVal("")
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {value.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {value.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="flex-1 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm">
                {item}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                onClick={() => onChange(value.filter((_, j) => j !== i))}
              >
                <HugeiconsIcon icon={Delete01Icon} size={14} strokeWidth={2} />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              add()
            }
          }}
          placeholder={placeholder ?? "Type and press Enter to add"}
        />
        <Button type="button" variant="outline" onClick={add}>
          Add
        </Button>
      </div>
    </div>
  )
}

function MemberDialog({
  member,
  committees,
  onClose,
  onSaved,
}: {
  member: Member | null
  committees: Committee[]
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState(
    member
      ? {
          name: member.name,
          role: member.role,
          committeeId: member.committeeId,
          major: member.major,
          year: member.year,
          image: member.image,
          bio: member.bio,
          cvDescription: member.cvDescription,
          inSu: member.inSu,
          collaborations: member.collaborations,
          achievements: member.achievements,
          email: member.email ?? "",
          linkedin: member.linkedin ?? "",
          order: member.order,
        }
      : {
          name: "",
          role: "",
          committeeId: committees[0]?.id ?? "",
          major: "",
          year: "",
          image: "",
          bio: "",
          cvDescription: "",
          inSu: [] as string[],
          collaborations: [] as string[],
          achievements: [] as string[],
          email: "",
          linkedin: "",
          order: 0,
        },
  )
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = boardMemberSchema.safeParse({
      ...form,
      email: form.email || undefined,
      linkedin: form.linkedin || undefined,
    })
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      if (member) {
        await updateBoardMemberFn({ data: { id: member.id, data: parsed.data } })
        toast.success("Member updated.")
      } else {
        await createBoardMemberFn({ data: parsed.data })
        toast.success("Member created.")
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{member ? "Edit member" : "Add member"}</DialogTitle>
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
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="President"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Committee</Label>
            <Select
              value={form.committeeId}
              onValueChange={(v) => setForm((f) => ({ ...f, committeeId: v }))}
            >
              <SelectTrigger>
                {committees.find((c) => c.id == form.committeeId)?.name}
              </SelectTrigger>
              <SelectContent>
                {committees.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                value={form.major}
                onChange={(e) => setForm((f) => ({ ...f, major: e.target.value }))}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={form.year}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                placeholder="Senior"
                required
              />
            </div>
          </div>

          <ImageUploader
            value={form.image}
            onChange={(url) => setForm((f) => ({ ...f, image: url }))}
            prefix="members"
            requirement="boardMember"
            label="Portrait"
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">Short bio</Label>
            <Input
              id="bio"
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              placeholder="Short one-line bio…"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>CV description</Label>
            <RichTextEditor
              value={form.cvDescription}
              onChange={(html) => setForm((f) => ({ ...f, cvDescription: html }))}
              placeholder="Long-form profile shown in the member dialog…"
            />
            <p className="text-xs text-muted-foreground">
              Optional. If filled, this block renders in the member dialog.
            </p>
          </div>

          <ListInput
            label="Inside the Union"
            value={form.inSu}
            onChange={(v) => setForm((f) => ({ ...f, inSu: v }))}
          />

          <ListInput
            label="Collaborations"
            value={form.collaborations}
            onChange={(v) => setForm((f) => ({ ...f, collaborations: v }))}
          />

          <ListInput
            label="Deals & Achievements"
            value={form.achievements}
            onChange={(v) => setForm((f) => ({ ...f, achievements: v }))}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="linkedin">LinkedIn URL (optional)</Label>
              <Input
                id="linkedin"
                value={form.linkedin}
                onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="order">Order within committee</Label>
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
