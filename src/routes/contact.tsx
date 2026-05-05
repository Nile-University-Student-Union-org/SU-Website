import { createFileRoute } from "@tanstack/react-router"
import { useState, type FormEvent } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Call02Icon,
  Location01Icon,
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { contactSubmissionSchema } from "@/lib/validators"
import { submitContactFn } from "@/lib/server-fns/contact"
import { getContactInfoFn, getOfficeHoursFn } from "@/lib/server-fns/public"

export const Route = createFileRoute("/contact")({
  loader: async () => {
    const [contactInfo, officeHours] = await Promise.all([
      getContactInfoFn(),
      getOfficeHoursFn(),
    ])
    return { contactInfo, officeHours }
  },
  component: ContactPage,
})

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={htmlFor}
        className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  )
}

function ContactPage() {
  const { contactInfo, officeHours } = Route.useLoaderData()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    content: "",
  })

  const handleChange = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const parsed = contactSubmissionSchema.safeParse(form)
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form fields.")
      return
    }

    setSubmitting(true)
    try {
      await submitContactFn({ data: parsed.data })
      setSubmitted(true)
      setForm({ name: "", phone: "", email: "", subject: "", content: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const contactDetails = [
    contactInfo && {
      icon: Mail01Icon,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    contactInfo && {
      icon: Call02Icon,
      label: "Phone",
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`,
    },
    contactInfo && {
      icon: Location01Icon,
      label: "Office",
      value: contactInfo.address,
      href: contactInfo.mapUrl ?? undefined,
    },
  ].filter((d): d is NonNullable<typeof d> => Boolean(d))

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-border pb-10">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-6">
                Talk to NUSU
              </p>
              <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-bold uppercase tracking-tight leading-[0.9] text-foreground">
                Get in<br />Touch
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pl-10 lg:border-l lg:border-border">
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                Sponsorship, partnerships, complaints, ideas — every message lands in the same inbox, and we read all of them. Expect a reply within two working days.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            <aside className="lg:col-span-4 flex flex-col gap-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground mb-4">
                  Quick channels
                </p>
                <ul className="flex flex-col gap-1">
                  {contactDetails.map(({ icon, label, value, href }) => {
                    const Inner = (
                      <div className="flex items-start gap-4 py-4 border-b border-border group">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-1">
                            {label}
                          </p>
                          <p className="text-sm font-medium text-foreground break-words">
                            {value}
                          </p>
                        </div>
                      </div>
                    )
                    return (
                      <li key={label}>
                        {href ? (
                          <a href={href} className="block">
                            {Inner}
                          </a>
                        ) : (
                          Inner
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              {officeHours && (
                <div className="rounded-2xl bg-muted/60 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    Office hours
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {officeHours.dayRange}<br />
                    {officeHours.hours}
                  </p>
                  {officeHours.note && (
                    <p className="text-xs text-muted-foreground mt-2">{officeHours.note}</p>
                  )}
                </div>
              )}
            </aside>

            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 lg:p-10">

                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                    <div className="h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={28} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground">
                      Message Sent
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Thanks for reaching out. We'll get back to you within two working days.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <header className="flex flex-col gap-1 mb-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        Send us a message
                      </p>
                      <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
                        We'd love to hear from you
                      </h2>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Name" htmlFor="name">
                        <Input
                          id="name"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange("name")}
                          placeholder="Your full name"
                          className="h-11"
                        />
                      </FormField>

                      <FormField label="Phone Number" htmlFor="phone">
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={form.phone}
                          onChange={handleChange("phone")}
                          placeholder="+20 ..."
                          className="h-11"
                        />
                      </FormField>

                      <FormField label="Email" htmlFor="email">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange("email")}
                          placeholder="you@example.com"
                          className="h-11"
                        />
                      </FormField>

                      <FormField label="Subject" htmlFor="subject">
                        <Input
                          id="subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange("subject")}
                          placeholder="What's it about?"
                          className="h-11"
                        />
                      </FormField>
                    </div>

                    <FormField label="Message" htmlFor="content">
                      <Textarea
                        id="content"
                        name="content"
                        required
                        value={form.content}
                        onChange={handleChange("content")}
                        placeholder="Tell us a bit more — the more context, the faster we can route this to the right person."
                        rows={6}
                        className="min-h-36"
                      />
                    </FormField>

                    {error && (
                      <p className="text-sm text-red-600" role="alert">
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                      <p className="text-xs text-muted-foreground">
                        By submitting, you agree to be contacted by NUSU about your enquiry.
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="gap-2 hover:bg-nusu-blue shrink-0"
                      >
                        {submitting ? "Sending…" : "Send Message"}
                        <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} />
                      </Button>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}
