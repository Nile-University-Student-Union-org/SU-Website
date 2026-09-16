import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

export function CTASection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 border-t border-border">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-nusu-navy via-nusu-navy to-nusu-navy-dark text-white p-10 sm:p-14 lg:p-20 border border-nusu-blue/25 shadow-[0_25px_70px_-15px_rgba(15,48,86,0.4)]">

          {/* Subtle dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Ambient signature glow blobs */}
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-25 pointer-events-none blur-3xl bg-nusu-blue" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-15 pointer-events-none blur-2xl bg-nusu-blue-light" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">

            {/* Left — Headline */}
            <div className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-nusu-blue-light mb-6">
                Get Involved
              </p>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.9]">
                Ready to Make<br />Your Mark?
              </h2>
            </div>

            {/* Right — Body + buttons */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:items-end">
              <p className="text-sm sm:text-base opacity-75 leading-relaxed max-w-sm lg:text-right">
                Whether you want to attend events, join a committee, or just stay in the loop — there's a place for you at NUSU.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white text-nusu-navy text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-nusu-blue hover:text-white shadow-md transition-all duration-300 active:scale-95 shrink-0"
                >
                  Meet the Team
                  <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full border border-white/30 text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/70 transition-all duration-300 active:scale-95 shrink-0"
                >
                  Get in Touch
                  <HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
