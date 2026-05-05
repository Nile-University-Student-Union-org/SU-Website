import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { AdminShell, AdminFieldRow } from "@/components/admin/AdminShell"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { officeHoursSchema } from "@/lib/validators"
import { getOfficeHoursFn } from "@/lib/server-fns/public"
import { updateOfficeHoursFn } from "@/lib/server-fns/admin/singletons"

export const Route = createFileRoute("/admin/office-hours")({
  loader: async () => ({ data: await getOfficeHoursFn() }),
  component: OfficeHoursPage,
})

function OfficeHoursPage() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const [form, setForm] = useState({
    dayRange: data?.dayRange ?? "Sunday – Thursday",
    hours: data?.hours ?? "10:00 – 16:00",
    note: data?.note ?? "",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = officeHoursSchema.safeParse({
      ...form,
      note: form.note || undefined,
    })
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      await updateOfficeHoursFn({ data: parsed.data })
      toast.success("Saved.")
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell eyebrow="Site-wide" title="Office hours" description="Shown on the contact page.">
      <form onSubmit={onSubmit}>
        <AdminFieldRow label="Day range" htmlFor="dayRange">
          <Input
            id="dayRange"
            value={form.dayRange}
            onChange={(e) => setForm((f) => ({ ...f, dayRange: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Hours" htmlFor="hours">
          <Input
            id="hours"
            value={form.hours}
            onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Note" htmlFor="note" hint="Optional extra line (e.g. holiday hours).">
          <Textarea
            id="note"
            rows={2}
            value={form.note ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          />
        </AdminFieldRow>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </AdminShell>
  )
}
