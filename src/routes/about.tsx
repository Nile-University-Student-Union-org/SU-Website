import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@client/components/Navbar"
import { SiteFooter } from "@client/components/SiteFooter"
import {
  getAboutHeroFn,
  getFooterFn,
  getContactInfoFn,
  getSocialLinksFn,
} from "@server/server-fns/public"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Nile University Student Union" },
      {
        name: "description",
        content:
          "Learn about Nile University Student Union — what we do and the team representing you.",
      },
      { property: "og:title", content: "About — Nile University Student Union" },
      {
        property: "og:description",
        content:
          "Learn about Nile University Student Union — what we do and the team representing you.",
      },
    ],
  }),
  loader: async () => {
    const [aboutHero, footer, contactInfo, socialLinks] = await Promise.all([
      getAboutHeroFn(),
      getFooterFn(),
      getContactInfoFn(),
      getSocialLinksFn(),
    ])
    return {
      aboutHero,
      footer,
      contactInfo,
      socialLinks,
    }
  },
  component: AboutPage,
})

const TEAM_MEMBERS = [
  { id: "1", name: "Member Name", role: "President" },
  { id: "2", name: "Member Name", role: "Vice President" },
  { id: "3", name: "Member Name", role: "Secretary" },
  { id: "4", name: "Member Name", role: "Treasurer" },
  { id: "5", name: "Member Name", role: "Academic Affairs" },
  { id: "6", name: "Member Name", role: "Student Services" },
  { id: "7", name: "Member Name", role: "Campus Events" },
  { id: "8", name: "Member Name", role: "Student Clubs" },
  { id: "9", name: "Member Name", role: "Logistics" },
  { id: "10", name: "Member Name", role: "Media & PR" },
  { id: "11", name: "Member Name", role: "Photography & Video" },
  { id: "12", name: "Member Name", role: "Graphic Design" },
  { id: "13", name: "Member Name", role: "Sports" },
  { id: "14", name: "Member Name", role: "Community Outreach" },
  { id: "15", name: "Member Name", role: "Tech & Systems" },
  { id: "16", name: "Member Name", role: "Freshman Representative" },
]

function AboutPage() {
  const { aboutHero, footer, contactInfo, socialLinks } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden selection:bg-nusu-blue/20 selection:text-nusu-navy dark:selection:text-nusu-blue-light">
      {/* Subtle ambient lighting orb */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[360px] rounded-full bg-gradient-to-b from-nusu-blue/10 via-nusu-blue-light/5 to-transparent blur-3xl opacity-50 dark:opacity-20 animate-ambient-glow"
        aria-hidden="true"
      />

      <Navbar />

      <main className="animate-page-enter flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-28 relative z-10">
        {/* Section: About the Student Union */}
        <section className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-neutral-950 dark:text-white leading-[1.1]">
            About the{" "}
            <span className="font-serif italic font-normal text-nusu-blue dark:text-nusu-blue-light pr-1 inline-block">
              Student Union
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            {aboutHero?.description ||
              "We are the elected student union at Nile University. Run entirely by students, we organize campus events, support student clubs, and represent student concerns to university administration."}
          </p>
        </section>

        {/* Section: Meet the Team */}
        <section className="mt-20 sm:mt-24">
          <div className="mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-neutral-950 dark:text-white">
              Meet the{" "}
              <span className="font-serif italic font-normal text-nusu-blue dark:text-nusu-blue-light pr-1 inline-block">
                Team
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
              The students serving in the union this year.
            </p>
          </div>

          {/* 16 Generic Placeholder Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                style={{ animationDelay: `${index * 35}ms` }}
                className="animate-card-reveal group select-none p-1 rounded-3xl bg-neutral-100/70 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-nusu-blue/40 dark:hover:border-nusu-blue-light/30 hover:shadow-xl hover:shadow-black/[0.03] dark:hover:shadow-black/40 cursor-default"
              >
                <div className="relative rounded-[calc(1.5rem-2px)] py-9 sm:py-11 px-5 sm:px-6 min-h-[300px] sm:min-h-[340px] bg-white dark:bg-[#061322]/90 flex flex-col items-center justify-center text-center h-full overflow-hidden transition-colors duration-300">
                  {/* Soft Radial Ambient Sheen on Hover */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,rgba(1,139,206,0.08),transparent_70%)]"
                    aria-hidden="true"
                  />

                  {/* Avatar */}
                  <div className="mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-b from-neutral-200 to-transparent dark:from-white/15 dark:to-transparent transition-all duration-500 group-hover:from-nusu-blue/80 dark:group-hover:from-nusu-blue-light/80">
                      <div className="w-full h-full rounded-full bg-neutral-100 dark:bg-neutral-800/90 flex items-center justify-center overflow-hidden border border-white/60 dark:border-white/5">
                        <svg
                          className="w-12 h-12 sm:w-14 sm:h-14 text-neutral-400 dark:text-neutral-500 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Name & Role */}
                  <div className="w-full">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-nusu-blue dark:group-hover:text-nusu-blue-light">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 font-normal">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter footer={footer} contactInfo={contactInfo} socialLinks={socialLinks} />
    </div>
  )
}
