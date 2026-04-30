"use client"

import { useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Menu01Icon,
  UserCircleIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Contact Us", href: "/contact" },
]

function NavLink({ label, href }: { label: string; href: string }) {
  const { location } = useRouterState()
  const isActive = location.pathname === href

  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={href as any}
      className="relative text-[11px] font-medium tracking-[0.12em] text-primary/55 hover:text-primary transition-colors duration-300 py-2.25"
    >
      {label}
      <span
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2 w-1.25 h-1.25 rounded-full bg-primary transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0"
        )}
      />
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    /* Outer positioning: adds horizontal gutters so pill floats with margins */
    <div className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 lg:px-10">
      <header className="mx-auto max-w-5xl rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_4px_28px_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-between md:grid md:grid-cols-3 h-14 lg:h-16 px-3 sm:px-4 lg:px-5">

          {/* Left — Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <img src="/logo.svg" alt="NUSU" className="h-7 lg:h-8 w-auto" />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-semibold text-primary text-[12px] tracking-[0.2em] uppercase">
                  NUSU
                </span>
                <span className="text-[7.5px] font-medium  tracking-[0.3em] uppercase mt-1">
                  Student Union
                </span>
              </div>
            </Link>
          </div>

          {/* Center — Nav links */}
          <div className="hidden md:flex items-center justify-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </div>

          {/* Right — User icon + mobile menu */}
          <div className="flex items-center justify-end gap-1">
            {/* Desktop user icon */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex rounded-full text-primary/45 hover:text-primary hover:bg-primary/5"
            >
              <HugeiconsIcon icon={UserCircleIcon} size={20} strokeWidth={1.5} />
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-full text-primary/55 hover:text-primary hover:bg-primary/5"
                  />
                }
              >
                <HugeiconsIcon icon={Menu01Icon} size={19} strokeWidth={1.5} />
              </SheetTrigger>

              <SheetContent side="right" className="w-80 p-0 bg-white">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full">
                  <div className="px-8 pt-10 pb-8">
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3"
                    >
                      <img src="/logo.svg" alt="NUSU" className="h-9 w-auto" />
                      <div className="flex flex-col leading-none">
                        <span className="font-semibold text-primary text-[13px] tracking-[0.2em] uppercase">
                          NUSU
                        </span>
                        <span className="text-[8.5px] font-medium text-primary/55 tracking-[0.36em] uppercase mt-1.5">
                          Student Union
                        </span>
                      </div>
                    </Link>
                  </div>

                  <Separator className="mx-8 w-auto" />

                  <nav className="flex flex-col px-8 py-4 flex-1">
                    {navLinks.map((link, i) => (
                      <div key={link.href}>
                        <Link
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          to={link.href as any}
                          onClick={() => setOpen(false)}
                          className="group flex items-center justify-between py-5"
                        >
                          <div className="flex items-baseline gap-5">
                            <span className="text-[10px] font-medium tracking-[0.32em] uppercase text-primary/30">
                              0{i + 1}
                            </span>
                            <span className="text-[15px] font-medium text-primary group-hover:text-nusu-blue transition-colors">
                              {link.label}
                            </span>
                          </div>
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={16}
                            strokeWidth={1.5}
                            className="text-primary/30 group-hover:text-nusu-blue transition-colors"
                          />
                        </Link>
                        {i < navLinks.length - 1 && (
                          <Separator className="opacity-60" />
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </header>
    </div>
  )
}
