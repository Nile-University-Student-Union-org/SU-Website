import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { SponsorsSection } from "@/components/SponsorsSection"
import { UpcomingEventsSection } from "@/components/UpcomingEventsSection"
import { MissionSection } from "@/components/MissionSection"
import { CTASection } from "@/components/CTASection"
import { SiteFooter } from "@/components/SiteFooter"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
        <SponsorsSection />
        <UpcomingEventsSection />
        <MissionSection />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  )
}
