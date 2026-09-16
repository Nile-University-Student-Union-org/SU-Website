"use client"

import { useState, useEffect, useRef } from "react"

export function ThemeBeamOverlay() {
  const [isActive, setIsActive] = useState(false)
  const [beamKey, setBeamKey] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevDarkRef = useRef<boolean | null>(null)

  const triggerBeam = (targetDark: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsDark(targetDark)
    setBeamKey((k) => k + 1)
    setIsActive(true)
    timerRef.current = setTimeout(() => {
      setIsActive(false)
    }, 900)
  }

  useEffect(() => {
    if (typeof document === "undefined") return

    // Record initial state without firing beam
    const initialDark = document.documentElement.classList.contains("dark")
    prevDarkRef.current = initialDark
    setIsDark(initialDark)

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains("dark")
      if (prevDarkRef.current !== null && currentDark !== prevDarkRef.current) {
        prevDarkRef.current = currentDark
        triggerBeam(currentDark)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const handleCustomTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark?: boolean }>
      const targetDark =
        customEvent.detail?.isDark ?? document.documentElement.classList.contains("dark")
      triggerBeam(targetDark)
    }

    window.addEventListener("nusu:theme-beam", handleCustomTrigger)

    return () => {
      observer.disconnect()
      window.removeEventListener("nusu:theme-beam", handleCustomTrigger)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (!isActive) return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] overflow-hidden select-none"
    >
      {/* ── Stratum 1: Subsurface Volumetric Bloom (Deep Atmospheric Aura) ── */}
      <div
        key={`beam-bloom-${beamKey}`}
        className="absolute -top-[20vh] -left-[40vw] w-[180vw] h-[140vh] animate-screen-beam-bloom pointer-events-none blur-3xl opacity-80 dark:opacity-60"
        style={{
          background: isDark
            ? "linear-gradient(108deg, transparent 0%, transparent 28%, rgba(15,48,86,0.25) 38%, rgba(1,139,206,0.35) 46%, rgba(45,177,250,0.45) 50%, rgba(1,139,206,0.3) 54%, rgba(229,168,35,0.08) 60%, transparent 70%, transparent 100%)"
            : "linear-gradient(108deg, transparent 0%, transparent 28%, rgba(229,168,35,0.2) 38%, rgba(245,197,85,0.4) 46%, rgba(255,255,255,0.6) 50%, rgba(45,177,250,0.35) 54%, rgba(1,139,206,0.15) 60%, transparent 70%, transparent 100%)",
        }}
      />

      {/* ── Stratum 2: Volumetric Caustic Sheen Wave (Medium Glass Body) ── */}
      <div
        key={`beam-sheen-${beamKey}`}
        className="absolute -top-[20vh] -left-[40vw] w-[180vw] h-[140vh] animate-screen-beam-sheen pointer-events-none blur-xl opacity-90"
        style={{
          background: isDark
            ? "linear-gradient(108deg, transparent 0%, transparent 42%, rgba(45,177,250,0.15) 45.5%, rgba(45,177,250,0.6) 48.5%, rgba(255,255,255,0.85) 50%, rgba(45,177,250,0.6) 51.5%, rgba(1,139,206,0.25) 54.5%, transparent 58%, transparent 100%)"
            : "linear-gradient(108deg, transparent 0%, transparent 42%, rgba(229,168,35,0.2) 45.5%, rgba(229,168,35,0.65) 48.5%, rgba(255,255,255,0.9) 50%, rgba(45,177,250,0.45) 51.5%, rgba(1,139,206,0.18) 54.5%, transparent 58%, transparent 100%)",
        }}
      />

      {/* ── Stratum 3: Razor-Sharp Specular Laser Crest (100% GPU Compositor Core) ── */}
      <div
        key={`beam-core-${beamKey}`}
        className="absolute -top-[20vh] -left-[40vw] w-[180vw] h-[140vh] animate-screen-beam-sweep pointer-events-none"
        style={{
          background: isDark
            ? "linear-gradient(108deg, transparent 0%, transparent 47.8%, rgba(1,139,206,0.25) 48.6%, rgba(45,177,250,0.85) 49.3%, rgba(255,255,255,0.98) 49.85%, #ffffff 50%, rgba(255,255,255,0.98) 50.15%, rgba(45,177,250,0.85) 50.7%, rgba(229,168,35,0.3) 51.4%, transparent 52.2%, transparent 100%)"
            : "linear-gradient(108deg, transparent 0%, transparent 47.8%, rgba(229,168,35,0.35) 48.6%, rgba(229,168,35,0.9) 49.3%, rgba(255,255,255,0.98) 49.85%, #ffffff 50%, rgba(255,255,255,0.98) 50.15%, rgba(45,177,250,0.8) 50.7%, rgba(1,139,206,0.25) 51.4%, transparent 52.2%, transparent 100%)",
        }}
      />

      {/* ── Stratum 4: Ghost Refraction Filament (Dual-Pane Architectural Glass Echo) ── */}
      <div
        key={`beam-ghost-${beamKey}`}
        className="absolute -top-[20vh] -left-[40vw] w-[180vw] h-[140vh] animate-screen-beam-sweep pointer-events-none opacity-40"
        style={{
          background: isDark
            ? "linear-gradient(108deg, transparent 0%, transparent 51.1%, rgba(45,177,250,0.3) 51.3%, rgba(255,255,255,0.4) 51.5%, rgba(45,177,250,0.3) 51.7%, transparent 52%, transparent 100%)"
            : "linear-gradient(108deg, transparent 0%, transparent 51.1%, rgba(229,168,35,0.3) 51.3%, rgba(255,255,255,0.45) 51.5%, rgba(45,177,250,0.25) 51.7%, transparent 52%, transparent 100%)",
        }}
      />


      {/* ── Stratum 6: Atmospheric Ambient Lighting Flash & Vignette Ripple ── */}
      <div
        key={`beam-flash-${beamKey}`}
        className="absolute inset-0 w-full h-full animate-screen-flash pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 85% 55% at 50% 25%, rgba(45,177,250,0.12) 0%, rgba(1,139,206,0.04) 50%, transparent 75%)"
            : "radial-gradient(ellipse 85% 55% at 50% 25%, rgba(255,255,255,0.28) 0%, rgba(229,168,35,0.08) 50%, transparent 75%)",
        }}
      />
    </div>
  )
}
