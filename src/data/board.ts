export type Committee = {
  id: string
  name: string
  tagline: string
  description: string
  color: string
}

export type BoardMember = {
  id: string
  name: string
  role: string
  committeeId: string
  major: string
  year: string
  image: string
  bio: string
  inSu: string[]
  collaborations: string[]
  achievements: string[]
  email?: string
  linkedin?: string
}

const portrait = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/750`

export const committees: Committee[] = [
  {
    id: "executive",
    name: "Executive Board",
    tagline: "Direction & Leadership",
    description:
      "Sets the union's annual agenda, represents NUSU to the administration, and oversees every committee's strategy and budget.",
    color: "#018BCE",
  },
  {
    id: "academic",
    name: "Academic Affairs",
    tagline: "Standards & Student Voice",
    description:
      "Liaison between students and faculty — runs the tutor network, advocates on grading and curriculum, and organises study weeks.",
    color: "#10B981",
  },
  {
    id: "events",
    name: "Events & Programming",
    tagline: "What's Next on Campus",
    description:
      "Concepts, books, and runs everything from orientation week to the year-end gala. Owns the calendar and the floor plan.",
    color: "#F59E0B",
  },
  {
    id: "pr",
    name: "Public Relations",
    tagline: "Partnerships & Sponsorships",
    description:
      "Brings in sponsors, runs alumni outreach, and lands the deals that fund our programmes — from coffee partners to corporate workshops.",
    color: "#EC4899",
  },
  {
    id: "media",
    name: "Media & Design",
    tagline: "How We Look & Sound",
    description:
      "The studio behind every poster, reel, and brand system. Runs photography on the ground and the social channels off it.",
    color: "#8B5CF6",
  },
  {
    id: "sports",
    name: "Sports & Wellness",
    tagline: "Move, Compete, Recover",
    description:
      "Inter-faculty tournaments, intramurals, fitness initiatives, and the wellness programming that keeps the campus active.",
    color: "#EF4444",
  },
]

export const board: BoardMember[] = [
  // ── Executive Board ────────────────────────────────────────────────────────
  {
    id: "exec-1",
    name: "Youssef Mansour",
    role: "President",
    committeeId: "executive",
    major: "Business Administration",
    year: "Senior",
    image: portrait("youssef"),
    bio:
      "Two years on the union, one year leading it. Youssef ran the Events arm before being elected, and now keeps the boards aligned on a single annual roadmap.",
    inSu: [
      "Drafted the 2025–26 strategic roadmap adopted unanimously by the senate",
      "Led Events committee for the 2024–25 cycle, delivering 22 campus-wide programmes",
      "Restructured the budget review process — committees now own quarterly defences",
    ],
    collaborations: [
      "NU Office of Student Affairs",
      "Cairo Founders Network",
      "Misr Insurance — annual sponsorship",
    ],
    achievements: [
      "Closed a 3-year EGP 1.4M sponsorship deal with Misr Insurance",
      "Secured a permanent SU office in the new student centre",
      "Launched the cross-faculty mentorship programme (140 pairs in year one)",
    ],
    email: "president@nusu.edu",
    linkedin: "https://linkedin.com/in/example",
  },
  {
    id: "exec-2",
    name: "Salma El-Khatib",
    role: "Vice President",
    committeeId: "executive",
    major: "Mechanical Engineering",
    year: "Senior",
    image: portrait("salma"),
    bio:
      "Operations brain of the executive. Salma turns ideas into delivery plans — every committee head reports timeline and risk to her weekly.",
    inSu: [
      "Built the union's first project tracker — every initiative is now visible end-to-end",
      "Chair of the inter-committee weekly delivery sync",
      "Led the constitution amendment drive (passed Spring 2025)",
    ],
    collaborations: [
      "Faculty of Engineering Council",
      "Notion for Education programme",
      "Local logistics partner — IBIS Events",
    ],
    achievements: [
      "Cut average event sign-off time from 14 days to 4",
      "Secured Notion's free education tier for the entire union",
      "Recovered EGP 220K of unused budget through quarterly reviews",
    ],
  },
  {
    id: "exec-3",
    name: "Omar Hany",
    role: "Secretary General",
    committeeId: "executive",
    major: "Political Science",
    year: "Junior",
    image: portrait("omar"),
    bio:
      "Keeper of the minutes, the constitution, and institutional memory. Owns the union's documentation standard and onboards every new committee head.",
    inSu: [
      "Authored the new committee-handover playbook (used across all 6 boards)",
      "Maintains the public meeting archive on the SU website",
      "Designed the elections framework adopted in Spring 2025",
    ],
    collaborations: [
      "NU Legal & Governance Office",
      "AUC Student Union — knowledge exchange",
    ],
    achievements: [
      "Ran the 2025 elections with 71% voter turnout — a campus record",
      "Digitised 6 years of union archives for public access",
    ],
  },
  {
    id: "exec-4",
    name: "Nour Abdelaziz",
    role: "Treasurer",
    committeeId: "executive",
    major: "Finance",
    year: "Senior",
    image: portrait("nour"),
    bio:
      "Owns the books. Nour built the union's first proper finance dashboard and has been the quiet reason every committee actually knows what they spent.",
    inSu: [
      "Built the live budget dashboard adopted by all 6 committees",
      "Sets quarterly spend caps and runs reconciliation cycles",
      "Trains incoming finance leads each summer",
    ],
    collaborations: [
      "NU Finance Office",
      "CIB — student banking partnership",
    ],
    achievements: [
      "Secured EGP 50K seed grant from the alumni endowment",
      "Negotiated CIB partnership: free student accounts + sponsored debit cards",
    ],
  },

  // ── Academic Affairs ───────────────────────────────────────────────────────
  {
    id: "academic-1",
    name: "Karim Rashid",
    role: "Head of Academic Affairs",
    committeeId: "academic",
    major: "Computer Science",
    year: "Senior",
    image: portrait("karim"),
    bio:
      "Translator between the dean's office and the student body. Karim runs the academic feedback loop and the campus-wide tutor network.",
    inSu: [
      "Rebuilt the tutor-matching platform — 480 active pairings this term",
      "Chairs the monthly faculty–student academic forum",
      "Runs the pre-finals 'study weeks' programme",
    ],
    collaborations: [
      "Office of the Provost",
      "Coursera for Campus",
      "IEEE NU Student Branch",
    ],
    achievements: [
      "Landed a Coursera for Campus deal — 1,200 free seats for NU students",
      "Pushed through the new make-up exam policy after a 2-year campaign",
    ],
  },
  {
    id: "academic-2",
    name: "Layla Saeed",
    role: "Curriculum Liaison",
    committeeId: "academic",
    major: "Biotechnology",
    year: "Junior",
    image: portrait("layla"),
    bio:
      "Sits on the curriculum review committee as the student voice. Layla translates classroom frustration into actionable policy memos.",
    inSu: [
      "Authored the 2025 student curriculum review white paper",
      "Runs end-of-semester course feedback drives",
    ],
    collaborations: [
      "NU Curriculum Review Committee",
      "Faculty of Pharmacy student council",
    ],
    achievements: [
      "Got two redundant required courses converted to electives",
      "Reached 78% participation on the latest course feedback survey",
    ],
  },
  {
    id: "academic-3",
    name: "Adham Fawzy",
    role: "Tutoring Coordinator",
    committeeId: "academic",
    major: "Mathematics",
    year: "Sophomore",
    image: portrait("adham"),
    bio:
      "Runs the day-to-day of the tutor network — onboarding, scheduling, and the quality bar that makes it actually work.",
    inSu: [
      "Onboards and trains every tutor each term",
      "Owns the weekly drop-in sessions in the library annex",
    ],
    collaborations: [
      "NU Library Services",
      "Math Department Senior Tutors",
    ],
    achievements: [
      "Grew the tutor pool from 60 to 140 in one year",
      "Hit 4.6/5 average satisfaction across 1,100+ sessions",
    ],
  },

  // ── Events & Programming ───────────────────────────────────────────────────
  {
    id: "events-1",
    name: "Hana Selim",
    role: "Head of Events",
    committeeId: "events",
    major: "Marketing",
    year: "Senior",
    image: portrait("hana"),
    bio:
      "If it has a stage, a guest list, or a run-of-show, Hana has touched it. Built the events team's playbook from scratch.",
    inSu: [
      "Owns the campus calendar and the venue booking pipeline",
      "Created the standard event brief template (now used union-wide)",
      "Led orientation week 2025 — 1,800 freshmen attended",
    ],
    collaborations: [
      "Vodafone Egypt — annual title sponsor",
      "El Sawy Culturewheel",
      "Facilities Management",
    ],
    achievements: [
      "Closed Vodafone's title sponsorship of orientation (EGP 600K + activations)",
      "Delivered the first NU TEDx student edition",
    ],
  },
  {
    id: "events-2",
    name: "Mazen Tarek",
    role: "Logistics Lead",
    committeeId: "events",
    major: "Industrial Engineering",
    year: "Junior",
    image: portrait("mazen"),
    bio:
      "Runs the floor. Mazen is who you call when the AV is down, the catering is late, or the security gate hasn't been briefed.",
    inSu: [
      "Standardised the day-of-event run-of-show document",
      "Owns the supplier roster and post-event close-outs",
    ],
    collaborations: [
      "NU Facilities & Security",
      "Plug.tech — AV partner",
    ],
    achievements: [
      "Negotiated a 30% discount on AV rentals through a 1-year supplier deal",
      "Zero major day-of incidents across 17 events this year",
    ],
  },
  {
    id: "events-3",
    name: "Farah Ezz",
    role: "Marketing Coordinator",
    committeeId: "events",
    major: "Communications",
    year: "Sophomore",
    image: portrait("farah"),
    bio:
      "Owns reach. Farah times the campaigns, writes the copy, and tracks why some events fill and others don't.",
    inSu: [
      "Runs the multi-channel campaign calendar",
      "Authors event copy and email blasts",
    ],
    collaborations: [
      "Media & Design committee",
      "NU Comms Office",
    ],
    achievements: [
      "Tripled average event RSVP rate quarter-over-quarter",
      "Built the campaign template library now used by all committees",
    ],
  },

  // ── Public Relations ───────────────────────────────────────────────────────
  {
    id: "pr-1",
    name: "Yara Sami",
    role: "Head of Public Relations",
    committeeId: "pr",
    major: "Mass Communication",
    year: "Senior",
    image: portrait("yara"),
    bio:
      "The union's chief deal-maker. Yara opens the doors that get sponsorships signed and partners committed.",
    inSu: [
      "Wrote the union's first sponsorship deck and tier system",
      "Runs the partner pipeline — 24 active conversations at any time",
    ],
    collaborations: [
      "Misr Insurance, CIB, Vodafone, Coursera",
      "NU Alumni Office",
    ],
    achievements: [
      "Drove EGP 2.1M in total sponsorship value across 2024–25",
      "Locked in 4 multi-year partnerships",
    ],
  },
  {
    id: "pr-2",
    name: "Karim Hossam",
    role: "Partnerships Officer",
    committeeId: "pr",
    major: "Economics",
    year: "Junior",
    image: portrait("karimh"),
    bio:
      "Closes the deals Yara opens. Karim owns proposal-to-signature for every partner the union brings on.",
    inSu: [
      "Owns the contracts pipeline and renewal calendar",
      "Runs partner check-in cadence and renewal reviews",
    ],
    collaborations: [
      "NU Legal Office",
      "All active sponsors",
    ],
    achievements: [
      "Closed 9 of 11 inbound partner conversations in Spring 2025",
      "Built the standard sponsorship MOU now used union-wide",
    ],
  },
  {
    id: "pr-3",
    name: "Dina Mostafa",
    role: "Outreach Officer",
    committeeId: "pr",
    major: "International Relations",
    year: "Sophomore",
    image: portrait("dina"),
    bio:
      "Owns the inbound. Dina handles every cold email, every campus visit request, every alumni who wants to give back.",
    inSu: [
      "Manages the public NUSU inbox and partner intake",
      "Runs the alumni guest-speaker programme",
    ],
    collaborations: [
      "NU Alumni Network",
      "Visiting university delegations",
    ],
    achievements: [
      "Hosted 18 alumni speakers across the academic year",
      "Built the alumni-speaker repository used by every committee",
    ],
  },

  // ── Media & Design ─────────────────────────────────────────────────────────
  {
    id: "media-1",
    name: "Mohamed Adel",
    role: "Creative Director",
    committeeId: "media",
    major: "Graphic Design",
    year: "Senior",
    image: portrait("mohamed"),
    bio:
      "The union's visual lead. Owns the brand system, the poster library, and the standard every committee designs against.",
    inSu: [
      "Authored the 2025 NUSU brand guide and component library",
      "Runs the weekly design review for all committees",
    ],
    collaborations: [
      "Adobe Education programme",
      "NU School of Design",
    ],
    achievements: [
      "Closed Adobe's free Creative Cloud licences for the design team",
      "Cut average poster turnaround from 6 days to under 48 hours",
    ],
  },
  {
    id: "media-2",
    name: "Jana Wagdi",
    role: "Photography Lead",
    committeeId: "media",
    major: "Fine Arts",
    year: "Junior",
    image: portrait("jana"),
    bio:
      "Behind the camera at every union event. Built the photo archive that every alumni post links back to.",
    inSu: [
      "Owns the event photography roster and edit pipeline",
      "Maintains the public photo archive (4,000+ images)",
    ],
    collaborations: [
      "NU Comms Office",
      "Local print houses for editorial drops",
    ],
    achievements: [
      "Shot 38 events in 2024–25, 24-hour delivery on every one",
      "Launched the 'Year in Photos' editorial — 12K views",
    ],
  },
  {
    id: "media-3",
    name: "Tamer Ali",
    role: "Social Media Lead",
    committeeId: "media",
    major: "Digital Media",
    year: "Sophomore",
    image: portrait("tamer"),
    bio:
      "Runs the channels. Tamer schedules every post, replies to every DM, and watches the analytics so the team doesn't have to.",
    inSu: [
      "Owns Instagram, TikTok, and LinkedIn channels",
      "Runs the weekly content stand-up with the design team",
    ],
    collaborations: [
      "Meta for Education programme",
      "Student creator partnerships",
    ],
    achievements: [
      "Grew Instagram from 4.2K to 11K followers in one year",
      "Top-performing reel hit 380K views (orientation 2025)",
    ],
  },

  // ── Sports & Wellness ──────────────────────────────────────────────────────
  {
    id: "sports-1",
    name: "Bassem Walid",
    role: "Head of Sports",
    committeeId: "sports",
    major: "Sports Management",
    year: "Senior",
    image: portrait("bassem"),
    bio:
      "Captain of the sports arm. Bassem owns the inter-faculty league and the relationship with every team captain on campus.",
    inSu: [
      "Runs the inter-faculty league across 6 sports",
      "Chairs the monthly captains' council",
    ],
    collaborations: [
      "NU Athletics Department",
      "Decathlon Egypt",
    ],
    achievements: [
      "Closed Decathlon as kit sponsor — uniforms for 8 teams",
      "Grew league participation from 320 to 540 students in one year",
    ],
  },
  {
    id: "sports-2",
    name: "Mariam Khaled",
    role: "Wellness Coordinator",
    committeeId: "sports",
    major: "Public Health",
    year: "Junior",
    image: portrait("mariam"),
    bio:
      "Owns the half of sports that isn't competitive — yoga, mental health weeks, fitness drop-ins, and the campus wellness calendar.",
    inSu: [
      "Runs the weekly campus yoga and HIIT drop-ins",
      "Owns Mental Health Awareness week",
    ],
    collaborations: [
      "NU Counseling Centre",
      "GoldsGym Cairo (partner gym)",
    ],
    achievements: [
      "Delivered the first NU Mental Health Awareness week (1,200 attendees)",
      "Negotiated student rates at GoldsGym for all NU students",
    ],
  },
  {
    id: "sports-3",
    name: "Amr Saeed",
    role: "Tournaments Officer",
    committeeId: "sports",
    major: "Business Information Systems",
    year: "Sophomore",
    image: portrait("amr"),
    bio:
      "Owns brackets, schedules, and the live scoreboard. Amr is why every match starts on time and the standings update before you leave the court.",
    inSu: [
      "Runs the league scheduling and live scoreboard",
      "Owns referee assignments and match-day operations",
    ],
    collaborations: [
      "NU Athletics referees pool",
      "Local match officials association",
    ],
    achievements: [
      "Built the live scoreboard now used in every league fixture",
      "Hit 100% match start-on-time across 84 fixtures this year",
    ],
  },
]
