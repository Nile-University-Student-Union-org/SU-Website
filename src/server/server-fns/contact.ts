import { createServerFn } from "@tanstack/react-start"
import { contactSubmissionSchema } from "@shared/validators"
import { prisma } from "@server/auth"

export const submitContactFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    await prisma.contactSubmission.create({ data })
    return { success: true }
  })
