"use client"

import { useState, useEffect, useRef } from "react"
import { useRouterState } from "@tanstack/react-router"
import { cn } from "@shared/utils"

export function RouteProgress({ children }: { children: React.ReactNode }) {
  const { location } = useRouterState()
  const [animating, setAnimating] = useState(false)
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname
      setAnimating(true)
      window.scrollTo({ top: 0, behavior: "instant" })
      const timer = setTimeout(() => {
        setAnimating(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  return (
    <>
      {/* Top Luminous Route Progress Indicator Bar */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed top-0 inset-x-0 z-[9999] h-[2.5px] pointer-events-none transition-opacity duration-300 overflow-hidden",
          animating ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "h-full w-full bg-gradient-to-r from-nusu-blue via-nusu-sky to-nusu-gold shadow-[0_0_10px_rgba(45,177,250,0.8)]",
            animating && "animate-route-progress"
          )}
        />
      </div>

      {/* Page Content */}
      <div className="w-full">
        {children}
      </div>
    </>
  )
}

