import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary select-none">
      {/* Background photo — mobile */}
      <div
        className="absolute inset-0 bg-cover bg-top animate-hero-bg md:hidden"
        style={{
          backgroundImage: "url('/student-group.png')",
        }}
      />
      {/* Background photo — desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-hero-bg hidden md:block"
        style={{
          backgroundImage: "url('/student-group.png')",
        }}
      />

      {/* Blue color wash — multiply blend visibly tints the photo */}
      <div className="absolute inset-0 white opacity-55 mix-blend-multiply" />
      {/* Radial vignette — darkens edges, keeps center open */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 60% 45%, transparent 25%, rgba(255, 255, 255, 0.72) 100%)" }}
      />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Hand — absolute left, large, sits below content layer */}
      <div className="absolute left-0 bottom-0 z-10 h-[78vh] sm:h-[85vh] pointer-events-none select-none hidden lg:block animate-hero-hand">
        <img
          src="/hand.png"
          alt=""
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Main container — above the hand layer */}
      <div className="relative z-20 min-h-screen mx-auto max-w-360 px-6 sm:px-10 lg:px-14 flex flex-col pt-20 lg:pt-24">

        {/* Hero text image — vertically centered in remaining space */}
        <div className="flex-1 flex items-center justify-center animate-hero-title">
          <img
            src="/hero-text.png"
            alt="UNION — Keep the Students Powered Up"
            className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
          />
        </div>

        {/* Buttons — bottom right */}
        <div className="flex justify-end items-center gap-3 sm:gap-5 pb-12 sm:pb-16 animate-hero-buttons">
          <Link
            to="/about"
            className="h-12 sm:h-14 px-6 sm:px-8 rounded-4xl inline-flex items-center justify-center gap-2 bg-nusu-blue hover:bg-nusu-sky text-white font-semibold shadow-lg shadow-nusu-blue/30 dark:bg-nusu-blue dark:hover:bg-nusu-sky dark:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none"
          >
            Explore Union
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
          </Link>

          <Link
            to="/events"
            className="liquid-glass-btn h-12 sm:h-14 px-6 sm:px-8 rounded-4xl inline-flex items-center justify-center gap-2 border-2 border-white/40 bg-white/10 hover:bg-white/20 hover:border-white text-white font-semibold shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1.5px_1.5px_rgba(255,255,255,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer select-none"
          >
            View Events
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.75} />
          </Link>
        </div>

        {/* Animated Scroll Explorer Indicator */}
        <div
          className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none"
          style={{ animation: "fade-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.85s both" }}
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/50">
            Scroll
          </span>
          <div className="w-4.5 h-7.5 rounded-full border border-white/25 flex justify-center pt-1.5 backdrop-blur-xs shadow-xs">
            <div className="w-1 h-2 rounded-full bg-nusu-sky animate-bounce-dot shadow-[0_0_6px_rgba(45,177,250,0.9)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
