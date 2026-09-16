import { createFileRoute, Link, redirect, useNavigate, useSearch } from "@tanstack/react-router"
import { useState } from "react"
import { z } from "zod"
import { authClient } from "@client/auth-client"
import { signInSchema } from "@shared/validators"
import { getAdminSessionFn } from "@server/server-fns/session"
import {
  getFooterFn,
  getContactInfoFn,
  getSocialLinksFn,
} from "@server/server-fns/public"
import { Navbar } from "@client/components/Navbar"
import { SiteFooter } from "@client/components/SiteFooter"
import { Button } from "@client/components/ui/button"
import { Input } from "@client/components/ui/input"
import { Label } from "@client/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

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
  loader: async () => {
    const [footer, contactInfo, socialLinks] = await Promise.all([
      getFooterFn(),
      getContactInfoFn(),
      getSocialLinksFn(),
    ])
    return { footer, contactInfo, socialLinks }
  },
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
  const { footer, contactInfo, socialLinks } = Route.useLoaderData()
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
    <>
      <Navbar />

      <main className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center pt-32 pb-24 px-6 bg-gradient-to-b from-nusu-navy/[0.04] via-background to-nusu-blue/[0.04] overflow-hidden animate-page-enter">
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-radial from-nusu-blue/12 via-nusu-navy/5 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-nusu-blue transition-colors group px-3 py-1.5 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm shadow-xs cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={13} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
              Back to NUSU
            </Link>
          </div>

          <div className="flex items-center gap-3.5 mb-8 justify-center">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-nusu-navy via-nusu-navy to-nusu-navy-dark p-2 border border-nusu-blue/30 shadow-md shadow-nusu-navy/20 flex items-center justify-center">
              <img src="/logo.svg" alt="NUSU" className="h-6 w-auto brightness-0 invert" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-bold uppercase tracking-[0.25em] text-nusu-navy dark:text-white">
                NUSU
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-nusu-blue mt-1">
                Admin Console
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-nusu-blue/20 bg-background/95 backdrop-blur-xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(15,48,86,0.12)]">
            <h1 className="text-2xl font-bold uppercase tracking-tight text-nusu-navy dark:text-white mb-1">
              Sign in
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Use the credentials provided by your super admin.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-nusu-navy dark:text-nusu-blue">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="h-11 focus-visible:border-nusu-blue focus-visible:ring-nusu-blue/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-[10px] font-semibold uppercase tracking-[0.25em] text-nusu-navy dark:text-nusu-blue">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="h-11 focus-visible:border-nusu-blue focus-visible:ring-nusu-blue/30"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="h-11 bg-primary hover:bg-nusu-blue dark:bg-nusu-blue dark:hover:bg-nusu-sky text-white font-semibold shadow-lg shadow-primary/25 dark:shadow-nusu-blue/30 transition-all duration-200 mt-2 cursor-pointer"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter
        footer={footer}
        contactInfo={contactInfo}
        socialLinks={socialLinks}
      />
    </>
  )
}
