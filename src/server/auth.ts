import "dotenv/config"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin } from "better-auth/plugins/admin"
import { prisma } from "./db"
import { ac, adminRole, superAdminRole, userRole } from "@shared/auth-shared"

export { prisma }

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
