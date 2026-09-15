import { Link } from "@tanstack/react-router"
import { format } from "date-fns"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Location01Icon } from "@hugeicons/core-free-icons"

type EventData = {
  id: string
  name: string
  startAt: Date | string
  endAt: Date | string
  location: string
  image: string
  status: { name: string; color: string }
}

function toDate(d: Date | string): Date {
  return d instanceof Date ? d : new Date(d)
}

function FeaturedEventCard({ event }: { event: EventData }) {
  const startAt = toDate(event.startAt)
  return (
    <Link
      to="/events"
      className="group lg:col-span-7 relative overflow-hidden rounded-2xl block bg-muted"
    >
      <div className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-130 relative">
        <img
          src={event.image}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div
          className="absolute inset-x-0 top-0 h-1.5 z-10"
          style={{ backgroundColor: event.status.color }}
        />

        <div className="absolute top-5 left-5 lg:top-6 lg:left-6 bg-background/95 backdrop-blur-sm rounded-2xl px-4 py-3 flex flex-col items-center min-w-16 shadow-lg">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {format(startAt, "MMM")}
          </span>
          <span className="text-3xl lg:text-4xl font-bold text-foreground tabular-nums leading-none mt-1">
            {format(startAt, "d")}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/95 via-black/55 to-transparent p-6 lg:p-10">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: event.status.color }}
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
              {event.status.name}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-[0.95] mb-4 max-w-3xl">
            {event.name}
          </h3>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white/75">
              <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={2} className="shrink-0" />
              <span className="truncate max-w-md">{event.location}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/90 group-hover:gap-2.5 transition-[gap]">
              View Details
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CompactEventCard({ event }: { event: EventData }) {
  const startAt = toDate(event.startAt)
  return (
    <Link
      to="/events"
      className="group flex-1 flex gap-4 p-4 lg:p-5 rounded-2xl border border-border bg-background hover:border-foreground transition-colors duration-300 min-h-0"
    >
      <div className="relative w-28 sm:w-36 shrink-0 rounded-xl overflow-hidden bg-muted self-stretch">
        <img
          src={event.image}
          alt={event.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: event.status.color }}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5 py-0.5">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold leading-none text-foreground tabular-nums">
            {format(startAt, "d")}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {format(startAt, "MMM yyyy")}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ backgroundColor: event.status.color }}
          />
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground truncate">
            {event.status.name}
          </span>
        </div>

        <h4 className="text-sm sm:text-base font-bold uppercase tracking-tight text-foreground leading-tight line-clamp-2 group-hover:text-nusu-blue transition-colors">
          {event.name}
        </h4>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto">
          <HugeiconsIcon icon={Location01Icon} size={11} strokeWidth={2} className="shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>
    </Link>
  )
}

export function UpcomingEventsSection({ events }: { events: EventData[] }) {
  if (events.length === 0) return null

  const [feature, ...rest] = events

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 border-t border-border">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14">

        <div className="mb-10 lg:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.46em] text-muted-foreground uppercase">
              What's next
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-foreground">
              Upcoming Events
            </h2>
          </div>

          <Link
            to="/events"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground hover:text-nusu-blue transition-colors self-start sm:self-end"
          >
            View All Events
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={12}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <FeaturedEventCard event={feature} />

          {rest.length > 0 && (
            <div className="lg:col-span-5 flex flex-col gap-5">
              {rest.map((event) => (
                <CompactEventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
