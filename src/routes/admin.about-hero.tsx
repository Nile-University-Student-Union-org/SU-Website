import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { toast } from "sonner"
import { AdminShell, AdminFieldRow } from "@/components/admin/AdminShell"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { aboutHeroSchema } from "@/lib/validators"
import { getAboutHeroFn } from "@/lib/server-fns/public"
import { updateAboutHeroFn } from "@/lib/server-fns/admin/singletons"

export const Route = createFileRoute("/admin/about-hero")({
  loader: async () => ({ data: await getAboutHeroFn() }),
  component: AboutHeroPage,
})

function AboutHeroPage() {
  const { data } = Route.useLoaderData()
  const router = useRouter()
  const [form, setForm] = useState({
    eyebrow: data?.eyebrow ?? "Nile University Student Union",
    title: data?.title ?? "About\nThe Union",
    description: data?.description ?? "",
  })
  const [saving, setSaving] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = aboutHeroSchema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the fields.")
      return
    }
    setSaving(true)
    try {
      await updateAboutHeroFn({ data: parsed.data })
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
      title="About hero"
      description="The headline section at the top of the about page."
    >
      <form onSubmit={onSubmit}>
        <AdminFieldRow label="Eyebrow" htmlFor="eyebrow">
          <Input
            id="eyebrow"
            value={form.eyebrow}
            onChange={(e) => setForm((f) => ({ ...f, eyebrow: e.target.value }))}
          />
        </AdminFieldRow>

        <AdminFieldRow label="Title" htmlFor="title" hint="Use line breaks to split across multiple lines.">
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
            placeholder="Write a description…"
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
