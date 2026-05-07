import { createFileRoute, redirect, useNavigate, useSearch } from "@tanstack/react-router"
import { useState } from "react"
import { z } from "zod"
import { authClient } from "@/lib/auth-client"
import { signInSchema } from "@/lib/validators"
import { getAdminSessionFn } from "@/lib/server-fns/session"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(undefined),
})

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — NUSU" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  validateSearch: loginSearchSchema,
  beforeLoad: async ({ search }) => {
    const session = await getAdminSessionFn()
    if (session && ["admin", "super-admin"].includes(session.user.role)) {
      throw redirect({ to: (search.redirect ?? "/admin") as never })
    }
  },
  component: AdminLogin,
})

function AdminLogin() {
  const navigate = useNavigate()
  const search = useSearch({ from: "/login" })
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const parsed = signInSchema.safeParse(form)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input.")
      return
    }

    setSubmitting(true)
    try {
      const res = await authClient.signIn.email({
        email: parsed.data.email,
        password: parsed.data.password,
      })
      if (res.error) {
        setError(res.error.message ?? "Sign-in failed.")
        return
      }
      navigate({ to: (search.redirect ?? "/admin") as never })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-muted/30 px-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <img src="/logo.svg" alt="NUSU" className="h-8 w-auto" />
          <div className="flex flex-col leading-none">
            <span className="text-[12px] font-bold uppercase tracking-[0.25em]">NUSU</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mt-1">
              Admin Console
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-8 sm:p-10">
          <h1 className="text-2xl font-bold uppercase tracking-tight mb-1">
            Sign in
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Use the credentials provided by your super admin.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="h-11"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
