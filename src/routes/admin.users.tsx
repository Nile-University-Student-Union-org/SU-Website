import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon, UserAdd01Icon } from "@hugeicons/core-free-icons"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { authClient } from "@/lib/auth-client"
import { createMemberSchema } from "@/lib/validators"
import { listAdminUsersFn, updateUserRoleFn } from "@/lib/server-fns/admin/users"
import { getAdminSessionFn } from "@/lib/server-fns/session"

type AdminUser = {
  id: string
  name: string
  email: string
  role: string | null
  banned: boolean | null
  createdAt: Date | string
}

export const Route = createFileRoute("/admin/users")({
  beforeLoad: async () => {
    const session = await getAdminSessionFn()
    if (!session || session.user.role !== "super-admin") {
      throw redirect({ to: "/admin" })
    }
  },
  loader: async () => ({
    users: (await listAdminUsersFn()) as AdminUser[],
    currentUser: await getAdminSessionFn(),
  }),
  component: UsersPage,
})

function UsersPage() {
  const { users, currentUser } = Route.useLoaderData()
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [removing, setRemoving] = useState<AdminUser | null>(null)

  async function handleRoleChange(user: AdminUser, role: "admin" | "super-admin") {
    if (role === user.role) return
    try {
      await updateUserRoleFn({ data: { userId: user.id, role } })
      toast.success("Role updated.")
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed")
    }
  }

  async function handleRemove() {
    if (!removing) return
    try {
      // Better Auth admin plugin: removeUser
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (authClient.admin as any).removeUser({ userId: removing.id })
      if (res?.error) throw new Error(res.error.message ?? "Failed")
      toast.success("User removed.")
      setRemoving(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed")
    }
  }

  return (
    <AdminShell
      eyebrow="Access"
      title="Members"
      description="Admins who can sign in and edit content. Super-admins manage other admins."
      actions={
        <Button onClick={() => setCreating(true)} className="gap-2">
          <HugeiconsIcon icon={UserAdd01Icon} size={14} strokeWidth={2} />
          Add member
        </Button>
      }
    >
      <div className="rounded-2xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-44">Role</TableHead>
              <TableHead className="w-44">Joined</TableHead>
              <TableHead className="w-24"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => {
              const isSelf = currentUser?.user.id === u.id
              return (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">
                    {u.name}
                    {isSelf && (
                      <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        You
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                  <TableCell>
                    <Select
                      value={u.role ?? "admin"}
                      onValueChange={(v) => handleRoleChange(u, v as "admin" | "super-admin")}
                      disabled={isSelf}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">admin</SelectItem>
                        <SelectItem value="super-admin">super-admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {format(new Date(u.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setRemoving(u)}
                        disabled={isSelf}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={14} strokeWidth={2} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {creating && (
        <CreateMemberDialog
          onClose={() => setCreating(false)}
          onSaved={() => {
            setCreating(false)
            router.invalidate()
          }}
        />
      )}

      <AlertDialog open={!!removing} onOpenChange={(open) => !open && setRemoving(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>
            <AlertDialogDescription>
              {removing?.name} ({removing?.email}) will lose access immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  )
}

function CreateMemberDialog({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState<{
    name: string
    email: string
    password: string
    role: "admin" | "super-admin"
  }>({
    name: "",
    email: "",
    password: "",
    role: "admin",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = createMemberSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await (authClient.admin as any).createUser({
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
        role: parsed.data.role,
      })
      if (res?.error) throw new Error(res.error.message ?? "Failed")
      toast.success("Member created.")
      onSaved()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add member</DialogTitle>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              minLength={8}
              required
            />
            <p className="text-xs text-muted-foreground">Min 8 characters.</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm((f) => ({ ...f, role: v as "admin" | "super-admin" }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="super-admin">super-admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Creating…" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
