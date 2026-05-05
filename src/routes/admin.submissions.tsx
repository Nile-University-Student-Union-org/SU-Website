import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete01Icon, Mail01Icon, MailOpen01Icon } from "@hugeicons/core-free-icons"
import { AdminShell } from "@/components/admin/AdminShell"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  listSubmissionsFn,
  markSubmissionReadFn,
  deleteSubmissionFn,
} from "@/lib/server-fns/admin/submissions"

type Submission = {
  id: string
  name: string
  phone: string
  email: string
  subject: string
  content: string
  isRead: boolean
  createdAt: Date | string
}

export const Route = createFileRoute("/admin/submissions")({
  loader: async () => ({ submissions: (await listSubmissionsFn()) as Submission[] }),
  component: SubmissionsPage,
})

function SubmissionsPage() {
  const { submissions } = Route.useLoaderData()
  const router = useRouter()
  const [viewing, setViewing] = useState<Submission | null>(null)
  const [deleting, setDeleting] = useState<Submission | null>(null)

  async function toggleRead(s: Submission) {
    try {
      await markSubmissionReadFn({ data: { id: s.id, isRead: !s.isRead } })
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed")
    }
  }

  async function handleView(s: Submission) {
    setViewing(s)
    if (!s.isRead) {
      try {
        await markSubmissionReadFn({ data: { id: s.id, isRead: true } })
        router.invalidate()
      } catch {}
    }
  }

  async function handleDelete() {
    if (!deleting) return
    try {
      await deleteSubmissionFn({ data: { id: deleting.id } })
      toast.success("Submission deleted.")
      setDeleting(null)
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  const unreadCount = submissions.filter((s) => !s.isRead).length

  return (
    <AdminShell
      eyebrow="Inbox"
      title="Contact submissions"
      description={
        unreadCount > 0
          ? `${unreadCount} unread message${unreadCount === 1 ? "" : "s"}.`
          : "Messages submitted from the public contact form."
      }
    >
      {submissions.length === 0 ? (
        <div className="text-sm text-muted-foreground py-12 text-center border border-dashed border-border rounded-2xl">
          No messages yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-44">Received</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((s) => (
                <TableRow
                  key={s.id}
                  className={`cursor-pointer ${!s.isRead ? "font-semibold bg-muted/30" : ""}`}
                  onClick={() => handleView(s)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleRead(s)}
                      className="h-8 w-8"
                      title={s.isRead ? "Mark unread" : "Mark read"}
                    >
                      <HugeiconsIcon
                        icon={s.isRead ? MailOpen01Icon : Mail01Icon}
                        size={14}
                        strokeWidth={2}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{s.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        {s.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="truncate max-w-md">{s.subject}</TableCell>
                  <TableCell className="text-xs text-muted-foreground font-normal">
                    {format(new Date(s.createdAt), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1 justify-end">
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

      <Dialog open={!!viewing} onOpenChange={(open) => !open && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          {viewing && (
            <>
              <DialogHeader>
                <DialogTitle>{viewing.subject}</DialogTitle>
                <DialogDescription>
                  From{" "}
                  <a
                    href={`mailto:${viewing.email}`}
                    className="text-foreground underline hover:no-underline"
                  >
                    {viewing.name} &lt;{viewing.email}&gt;
                  </a>{" "}
                  · {viewing.phone} ·{" "}
                  {format(new Date(viewing.createdAt), "MMM d, yyyy HH:mm")}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 max-h-[60vh] overflow-y-auto">
                {viewing.content}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the message from {deleting?.name}.
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
