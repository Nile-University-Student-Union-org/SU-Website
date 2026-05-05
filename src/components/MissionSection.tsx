import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

type WhoWeAreData = {
  eyebrow: string
  countWord: string
  titleSuffix: string
  description: string
  ctaLabel: string
  ctaLink: string
} | null

type CommitteeData = {
  id: string
  name: string
  tagline: string
  color: string
}

type StatData = {
  id: string
  value: string
  label: string
}

export function MissionSection({
  whoWeAre,
  committees,
  stats,
}: {
  whoWeAre: WhoWeAreData
  committees: CommitteeData[]
  stats: StatData[]
}) {
  const eyebrow = whoWeAre?.eyebrow ?? "Who We Are"
  const countWord = whoWeAre?.countWord ?? "Six"
  const titleSuffix = whoWeAre?.titleSuffix ?? "Committees.\nOne Voice."
  const description =
    whoWeAre?.description ??
    "NUSU is Nile University's elected student union. Six specialised committees, sixty members, coordinating everything from campus events to academic advocacy — on behalf of every student."
  const ctaLabel = whoWeAre?.ctaLabel ?? "Meet the Board"
  const ctaLink = whoWeAre?.ctaLink ?? "/about"
  const titleLines = titleSuffix.split("\n")

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.46em] text-muted-foreground uppercase mb-4">
              {eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight leading-[0.9] text-foreground mb-6">
              {countWord}
              {titleLines.map((line, i) => (
                <span key={i}>
                  <br />
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-8 max-w-sm">
              {description}
            </p>
            <Link
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              to={ctaLink as any}
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground hover:text-nusu-blue transition-colors"
            >
              {ctaLabel}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={12}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {committees.map((committee) => (
                <div
                  key={committee.id}
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-foreground/20 bg-background hover:bg-muted/40 transition-all duration-200"
                >
                  <div
                    className="h-9 w-9 rounded-xl shrink-0 flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${committee.color}18` }}
                  >
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: committee.color }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground mb-1.5">
                      {committee.name}
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {committee.tagline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {stats.length > 0 && (
          <div className="border-t border-border mt-16 sm:mt-20 pt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-10">
            {stats.map((stat, i) => (
              <div
                key={stat.id}
                className={`flex flex-col gap-2 ${
                  i === 0 ? "pr-4" : "pl-8 border-l border-border"
                }`}
              >
                <span className="text-4xl sm:text-5xl font-bold tabular-nums leading-none text-foreground">
                  {stat.value}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
