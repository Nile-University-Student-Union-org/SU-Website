import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { SponsorsSection } from "@/components/SponsorsSection"
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection"
import { MissionSection } from "@/components/MissionSection"
import { CTASection } from "@/components/CTASection"
import { SiteFooter } from "@/components/SiteFooter"
import {
  getSponsorsPublicFn,
  getWhoWeAreFn,
  getStatsFn,
  getCommitteesFn,
  getUpcomingEventsFn,
  getFooterFn,
  getContactInfoFn,
  getSocialLinksFn,
} from "@/lib/server-fns/public"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NUSU — Nile University Student Union" },
      {
        name: "description",
        content:
          "The official website of Nile University Student Union. Six committees, sixty members — representing every student.",
      },
      { property: "og:title", content: "NUSU — Nile University Student Union" },
      {
        property: "og:description",
        content:
          "The official website of Nile University Student Union. Six committees, sixty members — representing every student.",
      },
    ],
  }),
  loader: async () => {
    const [
      sponsors,
      whoWeAre,
      stats,
      committees,
      upcomingEvents,
      footer,
      contactInfo,
      socialLinks,
    ] = await Promise.all([
      getSponsorsPublicFn(),
      getWhoWeAreFn(),
      getStatsFn(),
      getCommitteesFn(),
      getUpcomingEventsFn(),
      getFooterFn(),
      getContactInfoFn(),
      getSocialLinksFn(),
    ])
    return {
      sponsors,
      whoWeAre,
      stats,
      committees,
      upcomingEvents,
      footer,
      contactInfo,
      socialLinks,
    }
  },
  component: Home,
})

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Nile University Student Union",
  alternateName: "NUSU",
  description:
    "The official student union of Nile University",
  logo: "/logo.svg",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Nile University",
  },
}

function Home() {
  const data = Route.useLoaderData()
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      <main>
        <Navbar />
        <HeroSection />
        <SponsorsSection sponsors={data.sponsors} />
        <UpcomingEventsSection events={data.upcomingEvents} />
        <MissionSection
          whoWeAre={data.whoWeAre}
          committees={data.committees}
          stats={data.stats}
        />
        <CTASection />
      </main>
      <SiteFooter
        footer={data.footer}
        contactInfo={data.contactInfo}
        socialLinks={data.socialLinks}
      />
    </>
  )
}
