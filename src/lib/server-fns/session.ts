import { createServerFn } from "@tanstack/react-start"
import { getServerSession } from "@/lib/server-auth"

export type AdminSessionInfo = {
  user: {
    id: string
    email: string
    name: string
    role: string
    image: string | null
  }
} | null

export const getAdminSessionFn = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminSessionInfo> => {
    const session = await getServerSession()
    if (!session) return null
    const user = session.user as {
      id: string
      email: string
      name: string
      image?: string | null
      role?: string | null
    }
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role ?? "",
        image: user.image ?? null,
      },
    }
  }
)
