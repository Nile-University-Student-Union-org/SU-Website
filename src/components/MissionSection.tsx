import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { committees } from "@/data/board"

export function MissionSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-10 lg:px-14">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — Mission copy */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.46em] text-muted-foreground uppercase mb-4">
              Who We Are
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight leading-[0.9] text-foreground mb-6">
              Six<br />Committees.<br />One Voice.
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-8 max-w-sm">
              NUSU is Nile University's elected student union. Six specialised committees, sixty members, coordinating everything from campus events to academic advocacy — on behalf of every student.
            </p>
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground hover:text-nusu-blue transition-colors"
            >
              Meet the Board
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={12}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Right — Committees grid */}
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

        {/* Stats strip */}
        <div className="border-t border-border mt-16 sm:mt-20 pt-10 flex flex-wrap gap-y-10">
          <div className="w-1/2 lg:w-1/4 flex flex-col gap-2 pr-4">
            <span className="text-4xl sm:text-5xl font-bold tabular-nums leading-none text-foreground">60+</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">Active Members</span>
          </div>
          <div className="w-1/2 lg:w-1/4 flex flex-col gap-2 pl-8 border-l border-border">
            <span className="text-4xl sm:text-5xl font-bold tabular-nums leading-none text-foreground">06</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">Committees</span>
          </div>
          <div className="w-1/2 lg:w-1/4 flex flex-col gap-2 lg:pl-8 lg:border-l lg:border-border">
            <span className="text-4xl sm:text-5xl font-bold tabular-nums leading-none text-foreground">25+</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">Events Per Year</span>
          </div>
          <div className="w-1/2 lg:w-1/4 flex flex-col gap-2 pl-8 border-l border-border">
            <span className="text-4xl sm:text-5xl font-bold tabular-nums leading-none text-foreground">01</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">Student Body</span>
          </div>
        </div>

      </div>
    </section>
  )
}
