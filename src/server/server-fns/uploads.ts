import { createServerFn } from "@tanstack/react-start"
import { presignUploadSchema } from "@shared/validators"
import { assertValidImageUpload, buildImageKey, createPresignedUploadUrl } from "@server/s3"
import { requireAdmin } from "@server/server-auth"

export const presignImageUploadFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => presignUploadSchema.parse(data))
  .handler(async ({ data }) => {
    await requireAdmin()
    assertValidImageUpload({ contentType: data.contentType, size: data.size })
    const key = buildImageKey(data.prefix, data.filename)
    return createPresignedUploadUrl({
      key,
      contentType: data.contentType,
    })
  })
