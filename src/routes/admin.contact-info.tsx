import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { AdminShell, AdminFieldRow } from "@/components/admin/AdminShell"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { contactInfoSchema } from "@/lib/validators"
import { getContactInfoFn } from "@/lib/server-fns/public"
import { updateContactInfoFn } from "@/lib/server-fns/admin/singletons"

export const Route = createFileRoute("/admin/contact-info")({
  loader: async () => ({ data: await getContactInfoFn() }),
  component: ContactInfoPage,
})

function ContactInfoPage() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const [form, setForm] = useState({
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    address: data?.address ?? "",
    mapUrl: data?.mapUrl ?? "",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = contactInfoSchema.safeParse({
      ...form,
      mapUrl: form.mapUrl || undefined,
    })
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      await updateContactInfoFn({ data: parsed.data })
      toast.success("Saved.")
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell
      eyebrow="Site-wide"
      title="Contact info"
      description="Used on the contact page and in the footer."
    >
      <form onSubmit={onSubmit}>
        <AdminFieldRow label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Phone" htmlFor="phone">
          <Input
            id="phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Address" htmlFor="address">
          <Input
            id="address"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Map URL" htmlFor="mapUrl" hint="Optional Google Maps URL.">
          <Input
            id="mapUrl"
            value={form.mapUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, mapUrl: e.target.value }))}
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
