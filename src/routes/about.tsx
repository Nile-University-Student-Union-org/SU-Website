import { createFileRoute, Link } from "@tanstack/react-router"
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
import {
  getAboutHeroFn,
  getAboutCTAFn,
  getCommitteesFn,
} from "@/lib/server-fns/public"

type Member = {
  id: string
  name: string
  role: string
  committeeId: string
  major: string
  year: string
  image: string
  bio: string
  cvDescription: string
  inSu: string[]
  collaborations: string[]
  achievements: string[]
  email: string | null
  linkedin: string | null
  order: number
}

type Committee = {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  color: string
  members: Member[]
}

export const Route = createFileRoute("/about")({
  loader: async () => {
    const [aboutHero, aboutCTA, committees] = await Promise.all([
      getAboutHeroFn(),
      getAboutCTAFn(),
      getCommitteesFn(),
    ])
    return { aboutHero, aboutCTA, committees: committees as Committee[] }
  },
  component: AboutPage,
})

function MemberCard({
  member,
  committee,
  onClick,
  size = "default",
}: {
  member: Member
  committee: Committee
  onClick: () => void
  size?: "default" | "featured"
}) {
  return (
    <button onClick={onClick} className="group relative w-full text-left">
      <div
        className={`relative overflow-hidden rounded-2xl bg-muted ${
          size === "featured"
            ? "aspect-square sm:aspect-[4/5]"
            : "aspect-square sm:aspect-[3/4]"
        }`}
      >
        <img
          src={member.image || "/person.jpg"}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

        <div
          className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-2"
          style={{ backgroundColor: committee.color }}
        />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="mb-2 flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: committee.color }}
            />
            <span className="text-[9px] font-semibold tracking-[0.25em] text-white/70 uppercase sm:text-[10px]">
              {member.role}
            </span>
          </div>
          <h3
            className={`leading-tight font-bold tracking-tight text-white uppercase ${
              size === "featured" ? "text-2xl" : "text-lg"
            }`}
          >
            {member.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/60 uppercase sm:text-[11px]">
            <span>{member.major}</span>
            <span>·</span>
            <span>{member.year}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/0 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:bg-white/95 group-hover:opacity-100">
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={14}
            strokeWidth={2}
            className="-rotate-45 text-foreground transition-transform group-hover:rotate-0"
          />
        </div>
      </div>
    </button>
  )
}

function AboutPage() {
  const { aboutHero, aboutCTA, committees } = Route.useLoaderData()
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const committeeMap = useMemo(
    () => Object.fromEntries(committees.map((c) => [c.id, c])),
    [committees]
  )

  const executiveCommittee = useMemo(
    () => committees.find((c) => c.slug === "executive"),
    [committees]
  )

  const otherCommittees = useMemo(
    () => committees.filter((c) => c.slug !== "executive"),
    [committees]
  )

  const selectedCommittee =
    selectedMember && committeeMap[selectedMember.committeeId]

  const heroEyebrow = aboutHero?.eyebrow ?? "Nile University Student Union"
  const heroTitle = aboutHero?.title ?? "About\nThe Union"
  const heroDescription =
    aboutHero?.description ??
    "Six committees, sixty members, one student body to answer to. NUSU is a small organisation that runs like a serious one — because that's what our community deserves."

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-36 pb-24">
        <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 items-end gap-8 border-b border-border pb-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="mb-6 text-[11px] font-semibold tracking-[0.4em] text-muted-foreground uppercase">
                {heroEyebrow}
              </p>
              <h1 className="text-5xl leading-[0.9] font-bold tracking-tight text-foreground uppercase sm:text-7xl lg:text-[8rem]">
                {heroTitle.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < heroTitle.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>

        {executiveCommittee && executiveCommittee.members.length > 0 && (
          <section className="mx-auto mb-28 max-w-7xl px-4 sm:px-6 lg:px-10">
            <header className="mb-10 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                  01 — Leadership
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
                  {executiveCommittee.name}
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted-foreground">
                {executiveCommittee.description}
              </p>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {executiveCommittee.members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  committee={executiveCommittee}
                  onClick={() => setSelectedMember(member)}
                />
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-10">
          {otherCommittees.map((committee, idx) => {
            const indexLabel = String(idx + 2).padStart(2, "0")

            return (
              <section key={committee.id}>
                <header className="mb-10 grid grid-cols-1 gap-6 border-b border-border pb-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: committee.color }}
                      />
                      <p className="text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
                        {indexLabel} — {committee.tagline}
                      </p>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
                      {committee.name}
                    </h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-5 lg:pt-2">
                    {committee.description}
                  </p>
                </header>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                  {committee.members.map((member) => (
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

        {aboutCTA?.enabled !== false && (
          <section className="mx-auto mt-32 max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl bg-foreground p-10 text-background sm:p-16">
              <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase opacity-60">
                    {aboutCTA?.eyebrow ?? "Recruitment opens every spring"}
                  </p>
                  <h2 className="text-4xl leading-[0.95] font-bold tracking-tight uppercase sm:text-5xl lg:text-6xl">
                    {(aboutCTA?.title ?? "Want a seat\nat this table?")
                      .split("\n")
                      .map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                  </h2>
                </div>
                <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
                  <p className="max-w-sm text-sm leading-relaxed opacity-70 lg:text-right">
                    {aboutCTA?.description ??
                      "Applications go out each March. Every committee runs its own intake — open positions are posted to our channels first."}
                  </p>
                  <Link
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    to={(aboutCTA?.buttonLink ?? "/contact") as any}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
                    >
                      {aboutCTA?.buttonText ?? "Get In Touch"}
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={14}
                        strokeWidth={2}
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Dialog
        open={!!selectedMember}
        onOpenChange={(open) => {
          if (!open) setSelectedMember(null)
        }}
      >
        <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto p-0 sm:max-w-5xl md:overflow-hidden">
          {selectedMember && selectedCommittee && (
            <div className="flex flex-col md:h-[85vh] md:max-h-180 md:flex-row md:overflow-hidden">
              <div className="relative h-90 shrink-0 bg-muted md:h-auto md:w-72 lg:w-80">
                <img
                  src={selectedMember.image || "/person.jpg"}
                  alt={selectedMember.name}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: selectedCommittee.color }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/50 to-transparent p-5">
                  <p className="mb-1 text-[9px] font-semibold tracking-[0.3em] text-white/60 uppercase">
                    {selectedCommittee.name}
                  </p>
                  <p className="text-xs font-medium tracking-[0.12em] text-white/90 uppercase">
                    {selectedMember.major} · {selectedMember.year}
                  </p>
                </div>
              </div>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 p-6 sm:p-8 md:overflow-y-auto lg:p-10">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: selectedCommittee.color }}
                    />
                    <span className="text-[10px] font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                      {selectedMember.role}
                    </span>
                  </div>
                  <DialogTitle className="text-3xl leading-[0.9] font-bold tracking-tight text-foreground uppercase sm:text-4xl lg:text-5xl">
                    {selectedMember.name}
                  </DialogTitle>
                </div>

                <DialogDescription className="text-sm leading-relaxed text-foreground/80">
                  {selectedMember.bio}
                </DialogDescription>

                {selectedMember.cvDescription && (
                  <>
                    <Separator />
                    <div
                      className="prose prose-sm max-w-none text-sm leading-relaxed text-foreground/80"
                      dangerouslySetInnerHTML={{
                        __html: selectedMember.cvDescription,
                      }}
                    />
                  </>
                )}

                {selectedMember.inSu.length > 0 && (
                  <>
                    <Separator />
                    <CVSection
                      label="Inside the Union"
                      count={selectedMember.inSu.length}
                      items={selectedMember.inSu}
                      accent={selectedCommittee.color}
                    />
                  </>
                )}

                {selectedMember.collaborations.length > 0 && (
                  <CVSection
                    label="Collaborations"
                    count={selectedMember.collaborations.length}
                    items={selectedMember.collaborations}
                    accent={selectedCommittee.color}
                  />
                )}

                {selectedMember.achievements.length > 0 && (
                  <CVSection
                    label="Deals & Achievements"
                    count={selectedMember.achievements.length}
                    items={selectedMember.achievements}
                    accent={selectedCommittee.color}
                  />
                )}

                {(selectedMember.email || selectedMember.linkedin) && (
                  <>
                    <Separator />
                    <div className="flex flex-wrap gap-2 pb-2">
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
                        >
                          <HugeiconsIcon
                            icon={Mail01Icon}
                            size={12}
                            strokeWidth={2}
                          />
                          {selectedMember.email}
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
                        >
                          <HugeiconsIcon
                            icon={Linkedin01Icon}
                            size={12}
                            strokeWidth={2}
                          />
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
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-[10px] font-semibold tracking-[0.3em] text-foreground uppercase">
          {label}
        </h4>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-foreground/80"
          >
            <span
              className="mt-2 h-1 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
