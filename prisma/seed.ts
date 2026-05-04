import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { auth } from "../src/lib/auth"
import { PrismaClient } from "./generated/client"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function ensureSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL
  const password = process.env.SUPER_ADMIN_PASSWORD
  const name = process.env.SUPER_ADMIN_NAME ?? "Super Admin"

  if (!email || !password) {
    console.warn(
      "[seed] SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing — skipping super-admin seed."
    )
    return
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    if (existing.role !== "super-admin") {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: "super-admin" },
      })
      console.log(`[seed] Promoted ${email} to super-admin.`)
    } else {
      console.log(`[seed] Super admin ${email} already exists.`)
    }
    return
  }

  // Use Better Auth's signUp so the password is hashed correctly and the
  // matching Account row is created. Then promote the role.
  const result = await auth.api.signUpEmail({
    body: { email, password, name },
  })

  if (!result?.user?.id) {
    throw new Error("[seed] Failed to create super admin user.")
  }

  await prisma.user.update({
    where: { id: result.user.id },
    data: { role: "super-admin", emailVerified: true },
  })

  console.log(`[seed] Created super admin ${email}.`)
}

async function ensureSingletons() {
  // Singletons that the public site reads from — create defaults if missing
  // so the site renders even before anything is edited.
  await prisma.whoWeAre.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      description:
        "NUSU is Nile University's elected student union. Six specialised committees, sixty members, coordinating everything from campus events to academic advocacy — on behalf of every student.",
    },
  })

  await prisma.aboutHero.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      description:
        "Six committees, sixty members, one student body to answer to. NUSU is a small organisation that runs like a serious one — because that's what our community deserves.",
    },
  })

  await prisma.aboutCTA.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  })

  await prisma.footer.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  })

  await prisma.contactInfo.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  })

  await prisma.officeHours.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  })
}

async function main() {
  await prisma.$connect()
  await ensureSingletons()
  await ensureSuperAdmin()
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
