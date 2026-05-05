import { createServerFn } from "@tanstack/react-start"
import { contactSubmissionSchema } from "@/lib/validators"
import { prisma } from "@/lib/auth"

export const submitContactFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    await prisma.contactSubmission.create({ data })
    return { success: true }
  })
