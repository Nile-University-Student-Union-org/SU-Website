import { createServerFn } from "@tanstack/react-start"
import { prisma } from "@/lib/auth"

export const getSponsorsPublicFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.sponsor.findMany({ orderBy: { order: "asc" } }),
)

export const getWhoWeAreFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.whoWeAre.findUnique({ where: { id: "default" } }),
)

export const getStatsFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.stat.findMany({ orderBy: { order: "asc" } }),
)

export const getAboutHeroFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.aboutHero.findUnique({ where: { id: "default" } }),
)

export const getAboutCTAFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.aboutCTA.findUnique({ where: { id: "default" } }),
)

export const getCommitteesFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.committee.findMany({
    orderBy: { order: "asc" },
    include: { members: { orderBy: { order: "asc" } } },
  }),
)

export const getEventsFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.event.findMany({
    orderBy: { startAt: "asc" },
    include: { status: true },
  }),
)

export const getUpcomingEventsFn = createServerFn({ method: "GET" }).handler(async () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcoming = await prisma.event.findMany({
    where: { endAt: { gte: today } },
    orderBy: { startAt: "asc" },
    take: 3,
    include: { status: true },
  })
  if (upcoming.length > 0) return upcoming
  return prisma.event.findMany({
    orderBy: { startAt: "desc" },
    take: 3,
    include: { status: true },
  })
})

export const getEventStatusesFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.eventStatus.findMany({ orderBy: { order: "asc" } }),
)

export const getFooterFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.footer.findUnique({ where: { id: "default" } }),
)

export const getContactInfoFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.contactInfo.findUnique({ where: { id: "default" } }),
)

export const getOfficeHoursFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.officeHours.findUnique({ where: { id: "default" } }),
)

export const getSocialLinksFn = createServerFn({ method: "GET" }).handler(() =>
  prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
)
