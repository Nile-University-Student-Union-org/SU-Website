import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Background photo — mobile */}
      <div
        className="absolute inset-0 bg-cover bg-top scale-105 md:hidden"
        style={{
          backgroundImage: "url('/student-group.png')",
          animation: "fade-in 1.4s ease-out both",
        }}
      />
      {/* Background photo — desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 hidden md:block"
        style={{
          backgroundImage: "url('/student-group.png')",
          animation: "fade-in 1.4s ease-out both",
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
      <div
        className="absolute left-0 bottom-0 z-10 h-[78vh] sm:h-[85vh] pointer-events-none select-none hidden lg:block"
        style={{ animation: "fade-in 1.6s ease-out 0.1s both" }}
      >
        <img
          src="/hand.png"
          alt=""
          className="h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Main container — above the hand layer */}
      <div className="relative z-20 min-h-screen mx-auto max-w-360 px-6 sm:px-10 lg:px-14 flex flex-col pt-20 lg:pt-24">

        {/* Hero text image — vertically centered in remaining space */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{ animation: "fade-in-up 1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both" }}
        >
          <img
            src="/hero-text.png"
            alt="UNION — Keep the Students Powered Up"
            className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
          />
        </div>

        {/* Buttons — bottom right */}
        <div className="flex justify-end items-center gap-3 sm:gap-5 pb-12 sm:pb-16">
          <Button
            size="lg"
            className="h-12 sm:h-14 px-6 sm:px-8 hover:bg-nusu-blue"
          >
            Explore Union
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-12 sm:h-14 px-6 sm:px-8"
          >
            View Events
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={1.75} />
          </Button>
        </div>
      </div>
    </section>
  )
}
