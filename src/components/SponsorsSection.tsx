import { useRef, useState, useEffect, useCallback } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

type Sponsor = {
  id: string
  name: string
  label: string
  year: string
  imageUrl: string
  websiteUrl: string | null
}

const SCROLL_AMOUNT = 284

export function SponsorsSection({ sponsors }: { sponsors: Sponsor[] }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const sync = useCallback(() => {
    const el = rowRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    sync()
    el.addEventListener("scroll", sync, { passive: true })
    return () => el.removeEventListener("scroll", sync)
  }, [sync])

  const scroll = (dir: "left" | "right") => {
    rowRef.current?.scrollBy({
      left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    })
  }

  if (sponsors.length === 0) return null

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.46em] text-muted-foreground uppercase">
              Powered by
            </p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              Our Sponsors
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full border-border text-foreground disabled:opacity-30"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full border-border text-foreground disabled:opacity-30"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
            </Button>
          </div>
        </div>

        <div
          ref={rowRef}
          className="flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="w-64 shrink-0 overflow-hidden rounded-2xl border border-border"
            >
              <div className="flex h-36 flex-col justify-between bg-primary px-5 py-7 text-primary-foreground">
                <div className="flex justify-end">
                  {sponsor.year && (
                    <span className="text-lg font-bold">{sponsor.year}</span>
                  )}
                </div>
                <p className="text-2xl font-bold leading-tight tracking-wide uppercase">
                  {sponsor.label || sponsor.name}
                </p>
              </div>

              <div className="flex h-44 items-center justify-center rounded-2xl bg-card">
                {sponsor.websiteUrl ? (
                  <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
                    <img
                      src={sponsor.imageUrl}
                      alt={sponsor.name}
                      className="h-full w-full object-cover"
                    />
                  </a>
                ) : (
                  <img
                    src={sponsor.imageUrl}
                    alt={sponsor.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
