import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

export const s3Bucket = process.env.AWS_S3_BUCKET ?? ""
export const s3PublicBaseUrl = process.env.AWS_S3_PUBLIC_URL ?? ""

let _client: S3Client | null = null

export function getS3Client(): S3Client {
  if (_client) return _client
  if (!region || !accessKeyId || !secretAccessKey || !s3Bucket) {
    throw new Error(
      "S3 is not configured. Set AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET in .env."
    )
  }
  _client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  })
  return _client
}

export function publicUrlFor(key: string): string {
  if (s3PublicBaseUrl) return `${s3PublicBaseUrl.replace(/\/$/, "")}/${key}`
  return `https://${s3Bucket}.s3.${region}.amazonaws.com/${key}`
}

const ALLOWED_IMAGE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/svg+xml",
])
const MAX_IMAGE_BYTES = 8 * 1024 * 1024 // 8 MB

export function assertValidImageUpload(opts: {
  contentType: string
  size: number
}) {
  if (!ALLOWED_IMAGE_TYPES.has(opts.contentType)) {
    throw new Error(
      `Unsupported image type "${opts.contentType}". Use PNG, JPEG, WebP, AVIF, or SVG.`
    )
  }
  if (opts.size > MAX_IMAGE_BYTES) {
    throw new Error(`Image is too large (max ${MAX_IMAGE_BYTES / 1024 / 1024}MB).`)
  }
}

function randomId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
}

export function buildImageKey(prefix: string, filename: string): string {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80)
  return `${prefix.replace(/^\/|\/$/g, "")}/${randomId()}-${safe}`
}

/**
 * Issue a short-lived presigned PUT URL the browser can upload to directly.
 * Returns both the upload URL and the final public URL the DB should store.
 */
export async function createPresignedUploadUrl(opts: {
  key: string
  contentType: string
  expiresInSeconds?: number
}) {
  const client = getS3Client()
  const command = new PutObjectCommand({
    Bucket: s3Bucket,
    Key: opts.key,
    ContentType: opts.contentType,
  })
  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: opts.expiresInSeconds ?? 60 * 5,
  })
  return {
    uploadUrl,
    publicUrl: publicUrlFor(opts.key),
    key: opts.key,
  }
}
