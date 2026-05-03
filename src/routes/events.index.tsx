import { createFileRoute } from "@tanstack/react-router"
import { format } from "date-fns"
import { useRef, useMemo, useCallback, useState } from "react"
import { Navbar } from "@/components/Navbar"
import { events, type AppEvent } from "@/data/events"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { Location01Icon, Ticket01Icon } from "@hugeicons/core-free-icons"
import {
  CalendarProvider,
  CalendarDatePicker,
  CalendarMonthPicker,
  CalendarYearPicker,
  CalendarDatePagination,
  CalendarHeader,
  CalendarBody,
  useCalendarMonth,
  useCalendarYear,
  monthsForLocale,
} from "@/components/kibo-ui/calendar"

export const Route = createFileRoute("/events/")({ component: EventsPage })

const LEGEND = [
  { color: "#018BCE", label: "Fashion & Style" },
  { color: "#8B5CF6", label: "Music & Arts" },
  { color: "#10B981", label: "Tech & Business" },
  { color: "#F59E0B", label: "Design" },
  { color: "#EF4444", label: "Community" },
  { color: "#EC4899", label: "Market & Crafts" },
]

function CalendarTitle() {
  const [month] = useCalendarMonth()
  const [year] = useCalendarYear()
  return (
    <span className="text-sm font-semibold text-foreground tabular-nums">
      {monthsForLocale("en-US", "long")[month]} {year}
    </span>
  )
}

function EventCard({ event, onClick }: { event: AppEvent; onClick: () => void }) {
  return (
    <li
      className="flex gap-4 py-6 border-b border-border last:border-0 cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="w-1 rounded-full self-stretch shrink-0"
        style={{ backgroundColor: event.status.color }}
      />

      <div className="w-36 shrink-0 hidden sm:block">
        <div className="aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full shrink-0"
            style={{ backgroundColor: event.status.color }}
          />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {event.status.name}
          </span>
        </div>

        <h3 className="text-base font-bold uppercase tracking-tight text-foreground leading-tight group-hover:text-nusu-blue transition-colors">
          {event.name}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <HugeiconsIcon icon={Location01Icon} size={12} strokeWidth={2} className="shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {event.description}
        </p>

        <Separator className="my-0.5" />

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-1">
            {event.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[9px] font-medium uppercase tracking-[0.12em] px-1.5 py-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button size="sm" className="gap-1.5 shrink-0 h-7 text-xs hover:bg-nusu-blue hover:text-white">
            <HugeiconsIcon icon={Ticket01Icon} size={12} strokeWidth={2} />
            Register
          </Button>
        </div>
      </div>
    </li>
  )
}

function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null)
  const dateRefs = useRef<Record<string, HTMLElement | null>>({})

  const groupedEvents = useMemo(() => {
    const groups: Record<string, AppEvent[]> = {}
    for (const event of events) {
      const key = format(event.endAt, "yyyy-MM-dd")
      if (!groups[key]) groups[key] = []
      groups[key].push(event)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [])

  const handleDayClick = useCallback((date: Date) => {
    const key = format(date, "yyyy-MM-dd")
    const el = dateRefs.current[key]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

          {/* Page header */}
          <header className="flex flex-row items-end justify-between gap-6 border-b border-border pb-7 mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-foreground">
              All Events
            </h1>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground text-right max-w-56">
              This is a good thing that will happen
            </p>
          </header>

          {/* Split layout */}
          <div className="flex flex-col xl:flex-row gap-8 items-start">

            {/* Calendar — sticky on desktop */}
            <div className="w-full xl:sticky xl:top-24 xl:w-[520px] shrink-0">
              <div className="flex flex-wrap gap-3 mb-4">
                {LEGEND.map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-[11px] text-muted-foreground uppercase tracking-[0.12em]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <CalendarProvider
                locale="en-US"
                startDay={1}
                className="flex flex-col border border-border rounded-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background">
                  <CalendarTitle />
                  <div className="flex items-center gap-3">
                    <CalendarDatePicker>
                      <CalendarMonthPicker className="h-8 text-xs w-36" />
                      <CalendarYearPicker start={2024} end={2030} className="h-8 text-xs w-28" />
                    </CalendarDatePicker>
                    <div className="h-4 w-px bg-border" />
                    <CalendarDatePagination />
                  </div>
                </div>

                <CalendarHeader className="border-b border-border bg-muted/40" />

                <CalendarBody features={events} onDayClick={handleDayClick}>
                  {({ feature }) => (
                    <div
                      className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white leading-tight"
                      style={{ backgroundColor: feature.status.color }}
                    >
                      {feature.name}
                    </div>
                  )}
                </CalendarBody>
              </CalendarProvider>
            </div>

            {/* Events list */}
            <div className="flex-1 min-w-0">
              {groupedEvents.map(([dateKey, dayEvents]) => {
                const [y, m, d] = dateKey.split("-").map(Number)
                const dateObj = new Date(y, m - 1, d)
                return (
                  <section
                    key={dateKey}
                    ref={(el) => { dateRefs.current[dateKey] = el }}
                    className="mb-8 scroll-mt-28"
                  >
                    <div className="flex items-baseline gap-3 mb-1 pb-3 border-b border-border">
                      <span className="text-4xl font-bold tabular-nums leading-none text-foreground">
                        {format(dateObj, "d")}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {format(dateObj, "EEEE, MMM yyyy")}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground shrink-0">
                        {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <ul>
                      {dayEvents.map((event) => (
                        <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                      ))}
                    </ul>
                  </section>
                )
              })}
            </div>

          </div>
        </div>
      </main>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => { if (!open) setSelectedEvent(null) }}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0">
          {selectedEvent && (
            <>
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: selectedEvent.status.color }}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {selectedEvent.status.name}
                  </span>
                </div>

                <DialogTitle className="text-2xl font-bold uppercase tracking-tight leading-tight text-foreground">
                  {selectedEvent.name}
                </DialogTitle>

                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={2} className="shrink-0" />
                  <span>{selectedEvent.location}</span>
                </div>

                <DialogDescription className="text-sm leading-relaxed">
                  {selectedEvent.description}
                </DialogDescription>

                <Separator />

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvent.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] font-medium uppercase tracking-[0.15em]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="gap-1.5 hover:bg-nusu-blue hover:text-white">
                    <HugeiconsIcon icon={Ticket01Icon} size={14} strokeWidth={2} />
                    Register
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
