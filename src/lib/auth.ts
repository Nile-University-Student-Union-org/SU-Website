import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../../prisma/generated/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const client = new PrismaClient({ adapter })

export const auth = betterAuth({
  database: prismaAdapter(client, { provider: "postgresql" }),
  baseURL: "http://localhost:3000/",
  emailAndPassword: { enabled: true },
})
