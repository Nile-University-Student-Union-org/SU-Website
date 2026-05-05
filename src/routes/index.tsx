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

function Home() {
  const data = Route.useLoaderData()
  return (
    <>
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
