import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { AdminShell, AdminFieldRow } from "@/components/admin/AdminShell"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { aboutCTASchema } from "@/lib/validators"
import { getAboutCTAFn } from "@/lib/server-fns/public"
import { updateAboutCTAFn } from "@/lib/server-fns/admin/singletons"

export const Route = createFileRoute("/admin/about-cta")({
  loader: async () => ({ data: await getAboutCTAFn() }),
  component: AboutCTAPage,
})

function AboutCTAPage() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const [form, setForm] = useState({
    enabled: data?.enabled ?? true,
    eyebrow: data?.eyebrow ?? "Recruitment opens every spring",
    title: data?.title ?? "Want a seat\nat this table?",
    description: data?.description ?? "",
    buttonText: data?.buttonText ?? "Get In Touch",
    buttonLink: data?.buttonLink ?? "/contact",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = aboutCTASchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      await updateAboutCTAFn({ data: parsed.data })
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
      eyebrow="About page"
      title="About CTA"
      description="The call-to-action banner at the bottom of the about page."
    >
      <form onSubmit={onSubmit}>
        <AdminFieldRow label="Visible" hint="Hide the CTA from the public site without deleting it.">
          <div className="flex items-center gap-2">
            <Switch
              checked={form.enabled}
              onCheckedChange={(v) => setForm((f) => ({ ...f, enabled: v }))}
            />
            <span className="text-sm text-muted-foreground">
              {form.enabled ? "Shown on the site" : "Hidden"}
            </span>
          </div>
        </AdminFieldRow>

        <AdminFieldRow label="Eyebrow" htmlFor="eyebrow">
          <Input
            id="eyebrow"
            value={form.eyebrow}
            onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Title" htmlFor="title" hint="Use line breaks for multiple lines.">
          <Textarea
            id="title"
            rows={3}
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Description" htmlFor="description">
          <Textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Write a short call-to-action description…"
          />
        </AdminFieldRow>

        <AdminFieldRow label="Button text" htmlFor="buttonText">
          <Input
            id="buttonText"
            value={form.buttonText}
            onChange={(e) => setForm((f) => ({ ...f, buttonText: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Button link" htmlFor="buttonLink">
          <Input
            id="buttonLink"
            value={form.buttonLink}
            onChange={(e) => setForm((f) => ({ ...f, buttonLink: e.target.value }))}
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
