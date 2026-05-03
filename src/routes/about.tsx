import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  Linkedin01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { Navbar } from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { committees, board, type BoardMember, type Committee } from "@/data/board"

export const Route = createFileRoute("/about")({ component: AboutPage })


function MemberCard({
  member,
  committee,
  onClick,
  size = "default",
}: {
  member: BoardMember
  committee: Committee
  onClick: () => void
  size?: "default" | "featured"
}) {
  return (
    <button
      onClick={onClick}
      className="group relative text-left w-full"
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-muted ${
          size === "featured" ? "aspect-square sm:aspect-[4/5]" : "aspect-square sm:aspect-[3/4]"
        }`}
      >
        <img
          src={"/person.jpg"}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

        {/* Color accent strip */}
        <div
          className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-2"
          style={{ backgroundColor: committee.color }}
        />

        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ backgroundColor: committee.color }}
            />
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
              {member.role}
            </span>
          </div>
          <h3
            className={`font-bold uppercase tracking-tight text-white leading-tight ${
              size === "featured" ? "text-2xl" : "text-lg"
            }`}
          >
            {member.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/60 uppercase tracking-[0.15em]">
            <span>{member.major}</span>
            <span>·</span>
            <span>{member.year}</span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/0 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/95 transition-all duration-300">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={14}
            strokeWidth={2}
            className="text-foreground -rotate-45 group-hover:rotate-0 transition-transform"
          />
        </div>
      </div>
    </button>
  )
}

function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  const committeeMap = useMemo(
    () => Object.fromEntries(committees.map((c) => [c.id, c])),
    []
  )

  const executive = useMemo(
    () => board.filter((m) => m.committeeId === "executive"),
    []
  )

  const otherCommittees = useMemo(
    () => committees.filter((c) => c.id !== "executive"),
    []
  )

  const selectedCommittee =
    selectedMember && committeeMap[selectedMember.committeeId]

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-24">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-border pb-10">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-muted-foreground mb-6">
                Nile University Student Union
              </p>
              <h1 className="text-5xl sm:text-7xl lg:text-[8rem] font-bold uppercase tracking-tight leading-[0.9] text-foreground">
                About<br />The Union
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pl-10 lg:border-l lg:border-border">
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                Six committees, sixty members, one student body to answer to. NUSU is a small organisation that runs like a serious one — because that's what our community deserves.
              </p>
            </div>
          </div>
        </section>

        {/* ── Executive Board ───────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-28">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 border-b border-border pb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2">
                01 — Leadership
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-foreground">
                Executive Board
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Four officers elected by the student body. They set direction, sign the budget, and answer for everything that ships under the NUSU banner.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {executive.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                committee={committeeMap[member.committeeId]}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>

        {/* ── Committees ────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-24">
          {otherCommittees.map((committee, idx) => {
            const members = board.filter((m) => m.committeeId === committee.id)
            const indexLabel = String(idx + 2).padStart(2, "0")

            return (
              <section key={committee.id}>
                <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10 pb-6 border-b border-border">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: committee.color }}
                      />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        {indexLabel} — {committee.tagline}
                      </p>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-foreground">
                      {committee.name}
                    </h2>
                  </div>
                  <p className="lg:col-span-5 text-sm text-muted-foreground leading-relaxed lg:pt-2">
                    {committee.description}
                  </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                  {members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      committee={committee}
                      onClick={() => setSelectedMember(member)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-32">
          <div className="relative overflow-hidden rounded-3xl bg-foreground text-background p-10 sm:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] opacity-60 mb-4">
                  Recruitment opens every spring
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[0.95]">
                  Want a seat<br />at this table?
                </h2>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
                <p className="text-sm opacity-70 max-w-sm leading-relaxed lg:text-right">
                  Applications go out each March. Every committee runs its own intake — open positions are posted to our channels first.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-background/30 text-background hover:bg-background hover:text-foreground gap-2"
                >
                  Get In Touch
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Member CV Dialog ────────────────────────────────────────────── */}
      <Dialog
        open={!!selectedMember}
        onOpenChange={(open) => { if (!open) setSelectedMember(null) }}
      >
        <DialogContent className="sm:max-w-5xl p-0 gap-0 max-h-[90svh] overflow-y-auto md:overflow-hidden">
          {selectedMember && selectedCommittee && (
            <div className="flex flex-col md:flex-row md:h-[85vh] md:max-h-180 md:overflow-hidden">

              {/* Photo — fixed-height banner on mobile, sticky sidebar on desktop */}
              <div className="relative h-90 shrink-0 md:h-auto md:w-72 lg:w-80 bg-muted">
                <img
                  src="/person.jpg"
                  alt={selectedMember.name}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: selectedCommittee.color }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-linear-to-t from-black/85 via-black/50 to-transparent">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60 mb-1">
                    {selectedCommittee.name}
                  </p>
                  <p className="text-xs font-medium text-white/90 uppercase tracking-[0.12em]">
                    {selectedMember.major} · {selectedMember.year}
                  </p>
                </div>
              </div>

              {/* Content — scrolls independently on desktop */}
              <div className="flex-1 min-w-0 min-h-0 md:overflow-y-auto p-6 sm:p-8 lg:p-10 flex flex-col gap-6">

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: selectedCommittee.color }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {selectedMember.role}
                    </span>
                  </div>
                  <DialogTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[0.9] text-foreground">
                    {selectedMember.name}
                  </DialogTitle>
                </div>

                <DialogDescription className="text-sm text-foreground/80 leading-relaxed">
                  {selectedMember.bio}
                </DialogDescription>

                <Separator />

                <CVSection
                  label="Inside the Union"
                  count={selectedMember.inSu.length}
                  items={selectedMember.inSu}
                  accent={selectedCommittee.color}
                />

                <CVSection
                  label="Collaborations"
                  count={selectedMember.collaborations.length}
                  items={selectedMember.collaborations}
                  accent={selectedCommittee.color}
                />

                <CVSection
                  label="Deals & Achievements"
                  count={selectedMember.achievements.length}
                  items={selectedMember.achievements}
                  accent={selectedCommittee.color}
                />

                {(selectedMember.email || selectedMember.linkedin) && (
                  <>
                    <Separator />
                    <div className="flex flex-wrap gap-2 pb-2">
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                        >
                          <HugeiconsIcon icon={Mail01Icon} size={12} strokeWidth={2} />
                          {selectedMember.email}
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                        >
                          <HugeiconsIcon icon={Linkedin01Icon} size={12} strokeWidth={2} />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function CVSection({
  label,
  count,
  items,
  accent,
}: {
  label: string
  count: number
  items: string[]
  accent: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground">
          {label}
        </h4>
        <span className="text-[10px] tabular-nums text-muted-foreground">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
            <span
              className="mt-2 h-1 w-3 rounded-full shrink-0"
              style={{ backgroundColor: accent }}
            />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
