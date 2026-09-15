/**
 * Recommended image specs surfaced in admin upload UIs so editors know what
 * resolution / aspect ratio produces good output for each placement.
 *
 * `minWidth` / `minHeight` are enforced on the client; `recommendedWidth` /
 * `recommendedHeight` are shown as guidance.
 */
export type ImageRequirement = {
  label: string
  description: string
  aspectRatio: string
  minWidth: number
  minHeight: number
  recommendedWidth: number
  recommendedHeight: number
  maxFileSizeMB: number
  formats: string[]
}

export const IMAGE_REQS = {
  sponsor: {
    label: "Sponsor logo",
    description:
      "Logo placed on a square card. Use a transparent PNG or SVG so it sits cleanly on light backgrounds.",
    aspectRatio: "1:1 (square)",
    minWidth: 400,
    minHeight: 400,
    recommendedWidth: 800,
    recommendedHeight: 800,
    maxFileSizeMB: 4,
    formats: ["PNG (transparent preferred)", "SVG", "WebP"],
  },
  boardMember: {
    label: "Board member portrait",
    description:
      "Vertical portrait photo. Used in card grids and the CV dialog header.",
    aspectRatio: "3:4 (portrait)",
    minWidth: 600,
    minHeight: 800,
    recommendedWidth: 1200,
    recommendedHeight: 1600,
    maxFileSizeMB: 6,
    formats: ["JPEG", "WebP", "PNG"],
  },
  event: {
    label: "Event cover image",
    description:
      "Featured image for the events list and dialog. Shown at wide aspect ratios — content should sit comfortably with safe margins.",
    aspectRatio: "16:9",
    minWidth: 1280,
    minHeight: 720,
    recommendedWidth: 1920,
    recommendedHeight: 1080,
    maxFileSizeMB: 6,
    formats: ["JPEG", "WebP", "PNG"],
  },
} as const satisfies Record<string, ImageRequirement>

export type ImageRequirementKey = keyof typeof IMAGE_REQS
