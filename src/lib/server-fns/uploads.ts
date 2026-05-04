import { createServerFn } from "@tanstack/react-start"
import { presignUploadSchema } from "@/lib/validators"
import { assertValidImageUpload, buildImageKey, createPresignedUploadUrl } from "@/lib/s3"
import { requireAdmin } from "@/lib/server-auth"

export const presignImageUploadFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => presignUploadSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    assertValidImageUpload({ contentType: data.contentType, size: data.size })
    const key = buildImageKey(data.prefix, data.filename)
    return createPresignedUploadUrl({
      key,
      contentType: data.contentType,
    })
  })
