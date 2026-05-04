import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/")({ component: AdminHome })

const QUICK_LINKS = [
  { to: "/admin/sponsors", label: "Sponsors", description: "Add, edit, and reorder partners on the home page." },
  { to: "/admin/who-we-are", label: "Who We Are", description: "Edit the home page mission section, including the count word." },
  { to: "/admin/committees", label: "Committees", description: "Manage the six committees and their copy." },
  { to: "/admin/board", label: "Board members", description: "Manage portraits, CVs, and rich-text descriptions." },
  { to: "/admin/events", label: "Events", description: "Create, edit, and remove events shown on the calendar." },
  { to: "/admin/submissions", label: "Contact submissions", description: "Read messages submitted from the public contact form." },
  { to: "/admin/contact-info", label: "Contact info", description: "Edit email, phone, and office address." },
  { to: "/admin/office-hours", label: "Office hours", description: "Update the public office-hours block." },
  { to: "/admin/footer", label: "Footer", description: "Edit the footer description and copyright line." },
  { to: "/admin/social-links", label: "Social links", description: "Manage social and contact links shown in the footer." },
  { to: "/admin/about-cta", label: "About CTA", description: "Toggle visibility and edit the CTA on the about page." },
]

function AdminHome() {
  return (
    <div className="px-6 sm:px-10 py-10 max-w-6xl">
      <header className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2">
          Admin
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">
          Overview
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl">
          Pick a section to start editing. Changes go live on the public site immediately after you save.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUICK_LINKS.map((q) => (
          <Link
            key={q.to}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            to={q.to as any}
            className="block p-5 rounded-2xl border border-border bg-background hover:border-foreground/30 transition-colors"
          >
            <p className="text-sm font-semibold mb-1">{q.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {q.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
