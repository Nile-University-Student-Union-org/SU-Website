import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Linkedin01Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5">
              <img src="/logo.svg" alt="NUSU" className="h-8 w-auto brightness-0 invert" />
              <div className="flex flex-col leading-none">
                <span className="font-semibold text-[12px] tracking-[0.2em] uppercase opacity-90">
                  NUSU
                </span>
                <span className="text-[8px] font-medium opacity-40 tracking-[0.36em] uppercase mt-1">
                  Student Union
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-55 leading-relaxed max-w-xs">
              Nile University Student Union — representing every student, running every year. Six committees. One voice.
            </p>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-3">
            <p className="text-[9px] font-semibold uppercase tracking-[0.45em] opacity-35 mb-5">
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={link.href as any}
                  className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.45em] opacity-35 mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@nusu.edu"
                className="flex items-center gap-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.75} className="shrink-0" />
                hello@nusu.edu
              </a>
              <div className="flex items-start gap-3 text-sm opacity-60">
                <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={1.75} className="shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Student Centre, Nile University<br />
                  Sheikh Zayed, Giza
                </span>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <HugeiconsIcon icon={Linkedin01Icon} size={14} strokeWidth={1.75} className="shrink-0" />
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] opacity-30 tracking-wide">
            © {new Date().getFullYear()} Nile University Student Union. All rights reserved.
          </p>
          <p className="text-[11px] opacity-30 tracking-wide">
            Office hours: Sun – Thu · 10:00 – 16:00
          </p>
        </div>

      </div>
    </footer>
  )
}
