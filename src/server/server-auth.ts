import { getRequest } from "@tanstack/react-start/server"
import { auth } from "./auth"

export async function getServerSession() {
  const request = getRequest()
  if (!request) return null
  return auth.api.getSession({ headers: request.headers })
}

export async function requireSession() {
  const session = await getServerSession()
  if (!session) throw new Error("UNAUTHENTICATED")
  return session
}

export async function requireAdmin() {
  const session = await requireSession()
  const role = (session.user as { role?: string }).role ?? ""
  if (!["admin", "super-admin"].includes(role)) throw new Error("FORBIDDEN")
  return session
}

export async function requireSuperAdmin() {
  const session = await requireSession()
  const role = (session.user as { role?: string }).role ?? ""
  if (role !== "super-admin") throw new Error("FORBIDDEN")
  return session
}
