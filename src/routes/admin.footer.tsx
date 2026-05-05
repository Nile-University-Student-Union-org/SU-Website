import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { AdminShell, AdminFieldRow } from "@/components/admin/AdminShell"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { footerSchema } from "@/lib/validators"
import { getFooterFn } from "@/lib/server-fns/public"
import { updateFooterFn } from "@/lib/server-fns/admin/singletons"

export const Route = createFileRoute("/admin/footer")({
  loader: async () => ({ data: await getFooterFn() }),
  component: FooterPage,
})

function FooterPage() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const [form, setForm] = useState({
    description: data?.description ?? "",
    copyrightSuffix: data?.copyrightSuffix ?? "",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = footerSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      await updateFooterFn({ data: parsed.data })
      toast.success("Saved.")
      router.invalidate()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminShell eyebrow="Site-wide" title="Footer" description="Text shown in the public site footer.">
      <form onSubmit={onSubmit}>
        <AdminFieldRow label="Description" htmlFor="description" hint="Short paragraph next to the logo.">
          <Textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Short paragraph shown next to the logo…"
          />
        </AdminFieldRow>

        <AdminFieldRow
          label="Copyright suffix"
          htmlFor="copyrightSuffix"
          hint="Text after the year, e.g. 'Nile University Student Union. All rights reserved.'"
        >
          <Textarea
            id="copyrightSuffix"
            rows={2}
            value={form.copyrightSuffix}
            onChange={(e) => setForm((f) => ({ ...f, copyrightSuffix: e.target.value }))}
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
