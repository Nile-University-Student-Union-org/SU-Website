import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { AdminShell, AdminFieldRow } from "@/components/admin/AdminShell"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { whoWeAreSchema } from "@/lib/validators"
import { getWhoWeAreFn } from "@/lib/server-fns/public"
import { updateWhoWeAreFn } from "@/lib/server-fns/admin/singletons"

export const Route = createFileRoute("/admin/who-we-are")({
  loader: async () => ({ data: await getWhoWeAreFn() }),
  component: WhoWeArePage,
})

function WhoWeArePage() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const [form, setForm] = useState({
    eyebrow: data?.eyebrow ?? "Who We Are",
    countWord: data?.countWord ?? "Six",
    titleSuffix: data?.titleSuffix ?? "Committees.\nOne Voice.",
    description: data?.description ?? "",
    ctaLabel: data?.ctaLabel ?? "Meet the Board",
    ctaLink: data?.ctaLink ?? "/about",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = whoWeAreSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      await updateWhoWeAreFn({ data: parsed.data })
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
      eyebrow="Home page"
      title="Who We Are"
      description="The mission section on the home page."
    >
      <form onSubmit={onSubmit}>
        <AdminFieldRow label="Eyebrow" htmlFor="eyebrow" hint="Small label above the title.">
          <Input
            id="eyebrow"
            value={form.eyebrow}
            onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Count word" htmlFor="countWord" hint="The first line of the title (e.g. 'Six').">
          <Input
            id="countWord"
            value={form.countWord}
            onChange={(e) => setForm((f) => ({ ...f, countWord: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow
          label="Title suffix"
          htmlFor="titleSuffix"
          hint="Lines that follow the count word. Use line breaks for separate lines."
        >
          <Textarea
            id="titleSuffix"
            rows={3}
            value={form.titleSuffix}
            onChange={(e) => setForm((f) => ({ ...f, titleSuffix: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Description" htmlFor="description">
          <Textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Write a short description…"
          />
        </AdminFieldRow>

        <AdminFieldRow label="CTA label" htmlFor="ctaLabel">
          <Input
            id="ctaLabel"
            value={form.ctaLabel}
            onChange={(e) => setForm((f) => ({ ...f, ctaLabel: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="CTA link" htmlFor="ctaLink" hint="Internal path like /about or external URL.">
          <Input
            id="ctaLink"
            value={form.ctaLink}
            onChange={(e) => setForm((f) => ({ ...f, ctaLink: e.target.value }))}
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
