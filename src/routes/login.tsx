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
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react"

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
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const parsed = signInSchema.safeParse(form)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please verify your email and password.")
      return
    }

    setSubmitting(true)
    try {
      const res = await authClient.signIn.email({
        email: parsed.data.email,
        password: parsed.data.password,
      })
      if (res.error) {
        setError(res.error.message ?? "Invalid email or password.")
        return
      }
      navigate({ to: (search.redirect ?? "/admin") as never })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#030712] text-neutral-900 dark:text-neutral-100 selection:bg-nusu-blue/20 selection:text-nusu-navy dark:selection:text-nusu-blue-light transition-colors duration-300">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center pt-32 sm:pt-40 pb-20 px-4 sm:px-6 overflow-hidden animate-page-enter">
        {/* Dynamic ambient color fields to drive authentic glass refraction & blur */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* Vibrant top-center Nile Royal Blue & Sky Blue orb */}
          <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[560px] sm:w-[720px] h-[360px] sm:h-[440px] rounded-full bg-gradient-to-tr from-nusu-blue/35 via-nusu-sky/25 to-transparent blur-[85px] dark:from-nusu-blue/30 dark:via-nusu-sky/18 opacity-80 dark:opacity-40 animate-ambient-glow" />

          {/* Deep Nile Navy counter-glow at bottom-right */}
          <div className="absolute bottom-8 right-1/4 w-[380px] sm:w-[480px] h-[300px] sm:h-[380px] rounded-full bg-gradient-to-bl from-nusu-navy/30 via-nusu-blue/15 to-transparent blur-[80px] dark:from-nusu-blue-light/15 dark:via-transparent opacity-60 dark:opacity-30" />
        </div>

        <div className="relative z-10 w-full max-w-[440px]">
          {/* Frosted Back Link */}
          <div className="flex justify-center mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-nusu-navy dark:hover:text-white transition-colors px-3.5 py-1.5 rounded-full liquid-glass-input cursor-pointer group"
            >
              <ArrowLeft
                size={13}
                className="transition-transform duration-200 group-hover:-translate-x-0.5 text-neutral-400 dark:text-neutral-500 group-hover:text-nusu-blue dark:group-hover:text-nusu-sky"
              />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Liquid Frosted Glass Card */}
          <div className="liquid-glass-card rounded-3xl p-8 sm:p-10 relative transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="h-11 w-11 rounded-2xl bg-nusu-navy dark:bg-white/10 flex items-center justify-center p-2.5 shadow-xs border border-white/40 dark:border-white/10">
                <img src="/logo.svg" alt="NUSU" className="h-6 w-auto brightness-0 invert" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-nusu-navy dark:text-white">
                  NUSU
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Student Union
                </span>
              </div>
            </div>

            <div className="mb-7">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.025em] text-neutral-950 dark:text-white">
                Sign in to{" "}
                <span className="font-serif italic font-normal text-nusu-blue dark:text-nusu-sky inline-block">
                  Portal
                </span>
              </h1>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                Enter your student union credentials to access the admin portal.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                    <Mail size={16} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="officer@nu.edu.eg"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl liquid-glass-input text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-nusu-blue/25 dark:focus:ring-nusu-sky/20 focus:border-nusu-blue dark:focus:border-nusu-sky text-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-xs font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                    <Lock size={16} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl liquid-glass-input text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-nusu-blue/25 dark:focus:ring-nusu-sky/20 focus:border-nusu-blue dark:focus:border-nusu-sky text-sm transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/[0.08] dark:bg-red-500/[0.12] border border-red-500/20 text-red-700 dark:text-red-300 text-xs leading-relaxed"
                  role="alert"
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 h-11 rounded-xl bg-gradient-to-r from-nusu-navy via-nusu-navy-light to-nusu-blue dark:from-nusu-blue dark:to-nusu-sky text-white font-medium text-sm hover:brightness-105 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-nusu-navy/15 dark:shadow-nusu-blue/20 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Signing in…</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <SiteFooter
        footer={footer}
        contactInfo={contactInfo}
        socialLinks={socialLinks}
      />
    </div>
  )
}

