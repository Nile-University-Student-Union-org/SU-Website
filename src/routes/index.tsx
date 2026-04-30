import { createFileRoute } from "@tanstack/react-router"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { SponsorsSection } from "@/components/SponsorsSection"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <SponsorsSection />
    </main>
  )
}
