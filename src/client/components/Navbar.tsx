"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserCircleIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { authClient } from "@client/auth-client"
import { Sun, Moon } from "lucide-react"
import { cn } from "@shared/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
]

export function Navbar() {
  const { location } = useRouterState()
  const { data: session } = authClient.useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 20
    }
    return false
  })
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof document !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark" ||
        localStorage.getItem("admin-theme") === "dark"
      )
    }
    return false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredRect, setHoveredRect] = useState<{
    left: number
    top: number
    width: number
    height: number
    opacity: number
  } | null>(null)
  const [clickedIndex, setClickedIndex] = useState<number | null>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const handleLinkMouseEnter = (index: number) => {
    const el = linkRefs.current[index]
    if (el) {
      setHoveredRect({
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
        opacity: 1,
      })
    }
  }

  const handleNavMouseLeave = () => {
    setHoveredRect((prev) => (prev ? { ...prev, opacity: 0 } : null))
  }

  const handleLinkClick = (index: number) => {
    setClickedIndex(index)
    setTimeout(() => {
      setClickedIndex(null)
    }, 450)
  }

  const isActiveRoute = (href: string) => {
    if (href === "/") return location.pathname === "/"
    return location.pathname.startsWith(href)
  }

  const [isSheenActive, setIsSheenActive] = useState(false)
  const [sheenKey, setSheenKey] = useState(0)
  const sheenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerSheen = () => {
    if (sheenTimerRef.current) clearTimeout(sheenTimerRef.current)
    setSheenKey((k) => k + 1)
    setIsSheenActive(true)
    sheenTimerRef.current = setTimeout(() => {
      setIsSheenActive(false)
    }, 700)
  }

  // Detect dark mode attribute on root element
  useEffect(() => {
    const checkDark = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => {
      observer.disconnect()
      if (sheenTimerRef.current) clearTimeout(sheenTimerRef.current)
    }
  }, [])

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark")
    const next = !isCurrentlyDark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    localStorage.setItem("admin-theme", next ? "dark" : "light")
    setIsDarkTheme(next)
    triggerSheen()
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Click outside and escape key listener for mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [mobileOpen])

  // Is the navbar currently positioned above a dark background?
  // 1) On the Homepage Hero (before scrolling past the deep navy banner)
  // 2) Or if the app is rendered in Dark Mode
  const isDark = (location.pathname === "/" && !isScrolled) || isDarkTheme

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-x-0 z-50 px-3.5 sm:px-6 pointer-events-none transition-all duration-300",
        isScrolled ? "top-2 sm:top-3.5" : "top-3 sm:top-5"
      )}
    >
      <header
        className={cn(
          "pointer-events-auto relative mx-auto w-full max-w-[820px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isDark
            ? cn(
                "liquid-glass-bar liquid-glass-bar-dark",
                isScrolled && "liquid-glass-bar-scrolled scale-[0.99]"
              )
            : cn(
                "liquid-glass-bar liquid-glass-bar-light",
                isScrolled && "liquid-glass-bar-scrolled scale-[0.99]"
              ),
          mobileOpen ? "rounded-3xl shadow-2xl" : "rounded-full"
        )}
      >
        {/* Specular Caustic Glass Refraction (Pure GPU 60/120fps Compositor Layer) */}
        {isSheenActive && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-20"
          >
            {/* High-fidelity optical caustic glass beam */}
            <div
              key={`sheen-${sheenKey}`}
              className="absolute inset-0 w-full h-full animate-specular-sweep pointer-events-none"
              style={{
                background:
                  "linear-gradient(108deg, transparent 0%, transparent 37%, rgba(255,255,255,0.03) 40%, rgba(229,168,35,0.12) 44%, rgba(255,255,255,0.82) 48.5%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.82) 51.5%, rgba(45,177,250,0.35) 56%, rgba(255,255,255,0.03) 60%, transparent 63%, transparent 100%)",
              }}
            />

            {/* Inner bevel rim highlight (pure opacity transition) */}
            <div
              key={`rim-${sheenKey}`}
              className="absolute inset-0 rounded-[inherit] animate-rim-flash pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 1px 1.5px 0 rgba(255,255,255,0.65), inset 0 -1px 1px 0 rgba(45,177,250,0.35)",
              }}
            />
          </div>
        )}
        {/* Main Bar Container */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 p-1.5 sm:p-2">
          {/* Brand */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 pl-3 pr-2 py-1 rounded-full transition-transform duration-200 active:scale-95 select-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center shrink-0 w-7 h-7">
              <img
                src="/logo.svg"
                alt="NUSU"
                className={cn(
                  "h-7 w-auto transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-rotate-2",
                  isDark && "brightness-0 invert"
                )}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={cn(
                  "font-extrabold text-[15px] sm:text-[16px] tracking-tight transition-colors duration-200",
                  isDark
                    ? "text-white group-hover:text-white/90"
                    : "text-nusu-navy group-hover:text-nusu-blue"
                )}
              >
                NUSU
              </span>
              <span
                className={cn(
                  "text-[8px] font-bold tracking-[0.24em] uppercase mt-0.5 transition-colors duration-200",
                  isDark ? "text-white" : "text-nusu-blue"
                )}
              >
                Student Union
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links: Stationary Liquid Glass with Fluid Sliding Hover Pill */}
          <nav
            onMouseLeave={handleNavMouseLeave}
            className={cn(
              "relative hidden md:flex items-center gap-1 p-1 rounded-full transition-colors duration-300 ml-auto",
              isDark
                ? "bg-white/[0.08] ring-1 ring-white/15"
                : "bg-nusu-navy/[0.04] ring-1 ring-nusu-navy/[0.06]"
            )}
            aria-label="Primary"
          >
            {/* Fluid Sliding Hover Pill */}
            {hoveredRect && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isDark
                    ? "bg-white/15 ring-1 ring-white/20 shadow-[0_2px_12px_rgba(255,255,255,0.08),inset_0_1px_1px_rgba(255,255,255,0.25)]"
                    : "bg-white/85 ring-1 ring-nusu-navy/10 shadow-[0_2px_8px_rgba(15,48,86,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)]"
                )}
                style={{
                  left: `${hoveredRect.left}px`,
                  top: `${hoveredRect.top}px`,
                  width: `${hoveredRect.width}px`,
                  height: `${hoveredRect.height}px`,
                  opacity: hoveredRect.opacity,
                  transform: hoveredRect.opacity === 0 ? "scale(0.95)" : "scale(1)",
                }}
              />
            )}

            {navLinks.map((link, index) => {
              const active = isActiveRoute(link.href)
              const isClicked = clickedIndex === index
              return (
                <Link
                  key={link.href}
                  ref={(el) => {
                    linkRefs.current[index] = el
                  }}
                  onMouseEnter={() => handleLinkMouseEnter(index)}
                  onClick={() => handleLinkClick(index)}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={link.href as any}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative min-h-[34px] px-4 flex items-center justify-center rounded-full text-[13.5px] font-semibold transition-colors duration-200 cursor-pointer select-none z-10",
                    isClicked && "animate-nav-click-burst",
                    active
                      ? isDark
                        ? "bg-white/20 text-white shadow-[0_2px_10px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)] ring-1 ring-white/30"
                        : "bg-white text-nusu-navy shadow-[0_2px_8px_rgba(15,48,86,0.08),inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/[0.05]"
                      : isDark
                        ? "text-white/75 hover:text-white"
                        : "text-nusu-navy/70 hover:text-nusu-navy"
                  )}
                >
                  {/* Click Ripple Effect */}
                  {isClicked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full animate-nav-click-ripple pointer-events-none ring-2 ring-nusu-sky/60"
                    />
                  )}
                  {/* Click Specular Glint */}
                  {isClicked && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-nav-click-glint" />
                    </span>
                  )}
                  <span className="relative z-10 cursor-pointer transform-gpu" style={{ transform: "translateZ(0)" }}>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Action Island: Theme Toggle + Portal CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
              className={cn(
                "group/theme relative size-8 sm:size-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 select-none",
                isDark
                  ? "bg-white/15 hover:bg-white/25 ring-1 ring-white/25 shadow-xs"
                  : "bg-nusu-navy/[0.05] hover:bg-nusu-navy/10 ring-1 ring-black/[0.06] shadow-2xs"
              )}
            >
              {isDarkTheme ? (
                <Sun
                  size={15}
                  strokeWidth={2.2}
                  className={cn(
                    "transition-transform duration-300 group-hover/theme:rotate-45 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.45)]",
                    isSheenActive && "animate-icon-pop"
                  )}
                />
              ) : (
                <Moon
                  size={15}
                  strokeWidth={2.2}
                  className={cn(
                    "transition-transform duration-300 group-hover/theme:-rotate-12",
                    isSheenActive && "animate-icon-pop",
                    isDark
                      ? "text-white group-hover/theme:text-nusu-sky drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
                      : "text-nusu-navy group-hover/theme:text-nusu-blue"
                  )}
                />
              )}
            </button>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              {session?.user ? (
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={"/admin" as any}
                  className={cn(
                    "group relative flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full font-semibold text-[13px] transition-colors duration-200 active:scale-[0.97] cursor-pointer select-none",
                    isDark
                      ? "bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/25 shadow-sm"
                      : "bg-white/90 hover:bg-white text-nusu-navy ring-1 ring-black/[0.06] shadow-xs"
                  )}
                >
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold uppercase shrink-0",
                      isDark ? "bg-white text-nusu-navy" : "bg-nusu-navy text-white"
                    )}
                  >
                    {session.user.name?.charAt(0) || "U"}
                  </span>
                  <span className="max-w-[85px] truncate">
                    {session.user.name?.split(" ")[0] || "Admin"}
                  </span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={13}
                    strokeWidth={2.2}
                    className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </Link>
              ) : (
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={"/login" as any}
                  className={cn(
                    "group relative flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 rounded-full font-semibold text-[13px] transition-colors duration-200 active:scale-[0.97] cursor-pointer select-none",
                    isDark
                      ? "bg-white hover:bg-white/95 text-nusu-navy shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                      : "bg-nusu-navy hover:bg-nusu-navy-light text-white shadow-[0_4px_14px_rgba(15,48,86,0.22)]"
                  )}
                >
                  <span className="cursor-pointer select-none">Login</span>
                  <span
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer",
                      isDark
                        ? "bg-nusu-navy/10 text-nusu-navy"
                        : "bg-white/15 text-white"
                    )}
                  >
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2.2} />
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden relative w-8.5 h-8.5 rounded-full flex items-center justify-center active:scale-90 transition-all duration-150 cursor-pointer",
                isDark
                  ? "bg-white/15 hover:bg-white/25 ring-1 ring-white/25 text-white"
                  : "bg-white/60 hover:bg-white/90 ring-1 ring-black/[0.06] text-nusu-navy"
              )}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-4 h-3 flex flex-col justify-between items-center relative pointer-events-none">
                <span
                  className={cn(
                    "w-4 h-0.5 rounded-full transition-all duration-200",
                    isDark ? "bg-white" : "bg-nusu-navy",
                    mobileOpen && "rotate-45 translate-y-[5px]"
                  )}
                />
                <span
                  className={cn(
                    "w-4 h-0.5 rounded-full transition-all duration-150",
                    isDark ? "bg-white" : "bg-nusu-navy",
                    mobileOpen && "opacity-0 scale-x-0"
                  )}
                />
                <span
                  className={cn(
                    "w-4 h-0.5 rounded-full transition-all duration-200",
                    isDark ? "bg-white" : "bg-nusu-navy",
                    mobileOpen && "-rotate-45 -translate-y-[5px]"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Expanded Menu Dropdown */}
        <div
          className={cn(
            "md:hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
            mobileOpen
              ? "max-h-80 opacity-100 px-3.5 pb-4 pt-1 pointer-events-auto"
              : "max-h-0 opacity-0 px-3.5 pb-0 pt-0 pointer-events-none"
          )}
        >
          <div
            className={cn(
              "h-px w-full mb-3",
              isDark ? "bg-white/15" : "bg-nusu-navy/10"
            )}
          />

          <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActiveRoute(link.href)
              return (
                <Link
                  key={link.href}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={link.href as any}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "min-h-[44px] px-4 flex items-center justify-between rounded-xl text-[14px] font-medium transition-all duration-200 active:scale-[0.98]",
                    active
                      ? isDark
                        ? "bg-white/20 text-white font-bold shadow-xs ring-1 ring-white/20"
                        : "bg-white/95 text-nusu-navy font-bold shadow-xs ring-1 ring-black/[0.05]"
                      : isDark
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-nusu-navy/75 hover:text-nusu-navy hover:bg-black/[0.04]"
                  )}
                >
                  <span>{link.label}</span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    strokeWidth={2}
                    className={cn(
                      "transition-transform duration-200",
                      active
                        ? isDark
                          ? "text-white translate-x-0.5"
                          : "text-nusu-navy translate-x-0.5"
                        : "opacity-35"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div
            className={cn(
              "mt-3 pt-3 border-t",
              isDark ? "border-white/15" : "border-nusu-navy/10"
            )}
          >
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={(session?.user ? "/admin" : "/login") as any}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "min-h-[44px] flex items-center justify-between w-full pl-5 pr-2 rounded-xl text-[13.5px] font-semibold transition-all duration-200 active:scale-[0.98] cursor-pointer select-none",
                isDark
                  ? "bg-white text-nusu-navy shadow-md hover:bg-white/95"
                  : "bg-nusu-navy text-white shadow-md hover:bg-nusu-navy-light"
              )}
            >
              <div className="flex items-center gap-2.5">
                <HugeiconsIcon icon={UserCircleIcon} size={16} strokeWidth={2} />
                <span>{session?.user ? "Admin Dashboard" : "Login"}</span>
              </div>
              <span
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center",
                  isDark ? "bg-nusu-navy/10 text-nusu-navy" : "bg-white/15 text-white"
                )}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2.2} />
              </span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}
