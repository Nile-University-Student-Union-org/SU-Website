import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin } from "better-auth/plugins/admin"
import { PrismaClient } from "../../prisma/generated/client"
import { ac, adminRole, superAdminRole, userRole } from "./auth-shared"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
export const prisma = new PrismaClient({ adapter })

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  emailAndPassword: { enabled: true },
  plugins: [
    admin({
      ac,
      roles: {
        "super-admin": superAdminRole,
        admin: adminRole,
        user: userRole,
      },
      adminRoles: ["super-admin", "admin"],
      defaultRole: "admin",
    }),
  ],
})

export type AuthSession = typeof auth.$Infer.Session
