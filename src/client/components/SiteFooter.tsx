import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Linkedin01Icon,
  Location01Icon,
  Call02Icon,
  InstagramIcon,
  TwitterIcon,
  Facebook01Icon,
  YoutubeIcon,
  TiktokIcon,
  Globe02Icon,
} from "@hugeicons/core-free-icons"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  mail: Mail01Icon,
  email: Mail01Icon,
  phone: Call02Icon,
  location: Location01Icon,
  linkedin: Linkedin01Icon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  x: TwitterIcon,
  facebook: Facebook01Icon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
}

function getIcon(name: string) {
  return ICON_MAP[name.toLowerCase()] ?? Globe02Icon
}

type FooterData = { description: string; copyrightSuffix: string } | null
type ContactInfoData = {
  email: string
  phone: string
  address: string
  mapUrl: string | null
} | null
type SocialLinkData = { id: string; label: string; href: string; icon: string }

export function SiteFooter({
  footer,
  contactInfo,
  socialLinks = [],
}: {
  footer?: FooterData
  contactInfo?: ContactInfoData
  socialLinks?: SocialLinkData[]
}) {
  const description =
    footer?.description ??
    "Nile University Student Union — representing every student, running every year. Six committees. One voice."
  const copyrightSuffix =
    footer?.copyrightSuffix ?? "Nile University Student Union. All rights reserved."

  const contact = contactInfo ?? {
    email: "su@nu.edu.eg",
    phone: "",
    address: "Nile University Campus, Juhayna Square, Sheikh Zayed City, Egypt",
    mapUrl: null,
  }

  return (
    <footer className="bg-nusu-navy dark:bg-[#030712] text-white border-t border-nusu-blue/15 transition-colors duration-300">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">

          <div className="sm:col-span-2 lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
                <img src="/logo.svg" alt="NUSU" className="h-7 w-auto brightness-0 invert" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-[13px] tracking-[0.2em] uppercase text-white group-hover:text-nusu-sky transition-colors">
                  NUSU
                </span>
                <span className="text-[8px] font-bold text-white/90 tracking-[0.32em] uppercase mt-1">
                  Student Union
                </span>
              </div>
            </Link>
            <p className="text-sm opacity-65 leading-relaxed max-w-xs">
              {description}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-nusu-sky mb-5">
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={link.href as any}
                  className="text-sm opacity-70 hover:opacity-100 hover:text-nusu-sky transition-all cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-nusu-sky mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-4">
              {contact && (
                <>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 hover:text-nusu-sky transition-all cursor-pointer"
                  >
                    <HugeiconsIcon icon={Mail01Icon} size={14} strokeWidth={1.75} className="shrink-0 text-nusu-sky" />
                    {contact.email}
                  </a>
                  <div className="flex items-start gap-3 text-sm opacity-70">
                    <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={1.75} className="shrink-0 mt-0.5 text-nusu-sky" />
                    <span className="leading-relaxed">{contact.address}</span>
                  </div>
                </>
              )}
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 hover:text-nusu-sky transition-all cursor-pointer"
                >
                  <HugeiconsIcon icon={getIcon(link.icon)} size={14} strokeWidth={1.75} className="shrink-0 text-nusu-sky" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] opacity-30 tracking-wide">
            © {new Date().getFullYear()} {copyrightSuffix}
          </p>
        </div>

      </div>
    </footer>
  )
}
