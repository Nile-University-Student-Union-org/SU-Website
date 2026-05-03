import type { Feature } from "@/components/kibo-ui/calendar"

export type AppEvent = Feature & {
  dayName: string
  dateNum: string
  monthLabel: string
  location: string
  description: string
  tags: string[]
  image: string
}

const IMG = "https://picsum.photos/400/250"

const STATUS = {
  fashion:   { id: "fashion",   name: "Fashion & Style",   color: "#018BCE" },
  music:     { id: "music",     name: "Music & Arts",      color: "#8B5CF6" },
  tech:      { id: "tech",      name: "Tech & Business",   color: "#10B981" },
  design:    { id: "design",    name: "Design",            color: "#F59E0B" },
  community: { id: "community", name: "Community",         color: "#EF4444" },
  market:    { id: "market",    name: "Market & Crafts",   color: "#EC4899" },
}

export const events: AppEvent[] = [
  // ── April 2026 ─────────────────────────────────────────────────────────────
  {
    id: "1",
    name: "Annual Fashion & Apparel Expo",
    startAt: new Date(2026, 3, 15),
    endAt:   new Date(2026, 3, 15),
    status:  STATUS.fashion,
    dayName: "Wed", dateNum: "15", monthLabel: "Apr 2026",
    location: "Las Vegas Convention Center, Hall C",
    description:
      "A landmark gathering for designers, retailers, and trendsetters showcasing the next season of ready-to-wear collections, accessories, and emerging streetwear labels under one roof. Runway previews, panel discussions with creative directors, and exclusive early-access product drops from over 200 brands.",
    tags: ["Apparel & Clothing", "Fashion", "Beauty"],
    image: IMG,
  },
  {
    id: "2",
    name: "Founders & Functions Summit",
    startAt: new Date(2026, 3, 23),
    endAt:   new Date(2026, 3, 23),
    status:  STATUS.tech,
    dayName: "Thu", dateNum: "23", monthLabel: "Apr 2026",
    location: "Moscone West, San Francisco",
    description:
      "A two-day summit for early-stage founders, operators, and product leaders. Workshops, fireside chats, and a startup demo floor with 80+ exhibitors. Keynotes from partners at Sequoia, a16z, and Y Combinator. Networking dinners hosted each evening for registered delegates.",
    tags: ["Startups", "Tech", "Networking"],
    image: IMG,
  },
  // ── May 2026 ────────────────────────────────────────────────────────────────
  {
    id: "3",
    name: "Sound Lab — Live Music Showcase",
    startAt: new Date(2026, 4, 8),
    endAt:   new Date(2026, 4, 8),
    status:  STATUS.music,
    dayName: "Fri", dateNum: "08", monthLabel: "May 2026",
    location: "Brooklyn Steel, 319 Frost St, NY",
    description:
      "An intimate evening featuring six independent artists across indie, electronic, and neo-soul. Curated by local labels and supported by community radio partners. Doors open at 7 PM with a pre-show DJ set. Limited standing tickets available; no re-entry after 9 PM.",
    tags: ["Music", "Live Performance", "Nightlife"],
    image: IMG,
  },
  {
    id: "4",
    name: "Winter Design Conference 2026",
    startAt: new Date(2026, 4, 17),
    endAt:   new Date(2026, 4, 17),
    status:  STATUS.design,
    dayName: "Sun", dateNum: "17", monthLabel: "May 2026",
    location: "Barbican Centre, London",
    description:
      "The leading European gathering for product, brand, and editorial designers. Three stages, twenty-eight talks, and a curated portfolio review for emerging practitioners. Workshop sessions are capped at 30 attendees — register early. After-party at Tate Modern sponsored by Adobe.",
    tags: ["Design", "Conference", "Editorial"],
    image: IMG,
  },
  {
    id: "5",
    name: "Holiday Artisan Market",
    startAt: new Date(2026, 4, 25),
    endAt:   new Date(2026, 4, 25),
    status:  STATUS.market,
    dayName: "Mon", dateNum: "25", monthLabel: "May 2026",
    location: "Pier 17 Rooftop, New York",
    description:
      "More than 120 independent makers, ceramicists, and small-batch food producers. Live carolers, mulled wine, and a rooftop view of the harbor. Free entry with RSVP. Vendor applications are still open through May 10th.",
    tags: ["Market", "Crafts", "Food & Drink"],
    image: IMG,
  },
  // ── June 2026 ───────────────────────────────────────────────────────────────
  {
    id: "6",
    name: "Year-End Reflections — Speaker Series",
    startAt: new Date(2026, 5, 6),
    endAt:   new Date(2026, 5, 6),
    status:  STATUS.community,
    dayName: "Sat", dateNum: "06", monthLabel: "Jun 2026",
    location: "The Wing, Chicago",
    description:
      "Six leaders from creative, civic, and scientific fields share what they learned over the past year. A conversational evening designed to reflect and recharge. Tickets include a printed programme and a light reception following the talks.",
    tags: ["Speakers", "Community", "Education"],
    image: IMG,
  },
  {
    id: "7",
    name: "Sound Lab — Summer Edition",
    startAt: new Date(2026, 5, 14),
    endAt:   new Date(2026, 5, 14),
    status:  STATUS.music,
    dayName: "Sun", dateNum: "14", monthLabel: "Jun 2026",
    location: "Avant Gardner, Brooklyn",
    description:
      "The summer return of Sound Lab — this time outdoors. Eight acts across two stages, spanning ambient, experimental hip-hop, and live jazz fusion. Gates open at 5 PM; headliner at 10 PM.",
    tags: ["Music", "Outdoor", "Live Performance"],
    image: IMG,
  },
  {
    id: "8",
    name: "Startup Pitch Day — Summer Cohort",
    startAt: new Date(2026, 5, 27),
    endAt:   new Date(2026, 5, 27),
    status:  STATUS.tech,
    dayName: "Sat", dateNum: "27", monthLabel: "Jun 2026",
    location: "Galvanize NYC, 303 Spring St",
    description:
      "Twenty teams from the summer accelerator cohort present their products to a panel of investors and operators. Open to the public — register to watch the pitches live or join the demo hour afterward.",
    tags: ["Startups", "Pitch", "Tech"],
    image: IMG,
  },
]
