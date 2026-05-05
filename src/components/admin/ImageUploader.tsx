import { useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Image01Icon, Cancel01Icon, CloudUploadIcon } from "@hugeicons/core-free-icons"
import { presignImageUploadFn } from "@/lib/server-fns/uploads"
import { Button } from "@/components/ui/button"
import { IMAGE_REQS, type ImageRequirementKey } from "@/lib/image-requirements"
import { toast } from "sonner"

type Props = {
  value: string
  onChange: (url: string) => void
  prefix: "sponsors" | "members" | "events" | "site"
  requirement?: ImageRequirementKey
  label?: string
}

export function ImageUploader({ value, onChange, prefix, requirement, label }: Props) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const reqs = requirement ? IMAGE_REQS[requirement] : null

  async function handleFile(file: File) {
    if (reqs) {
      if (file.size > reqs.maxFileSizeMB * 1024 * 1024) {
        toast.error(`File is larger than ${reqs.maxFileSizeMB}MB.`)
        return
      }
    }

    setUploading(true)
    try {
      const presign = await presignImageUploadFn({
        data: {
          filename: file.name,
          contentType: file.type as
            | "image/png"
            | "image/jpeg"
            | "image/webp"
            | "image/avif"
            | "image/svg+xml",
          size: file.size,
          prefix,
        },
      })

      const putRes = await fetch(presign.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      })

      if (!putRes.ok) throw new Error("Upload failed")

      onChange(presign.publicUrl)
      toast.success("Image uploaded.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </p>
      )}

      {value ? (
        <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted aspect-video">
          <img src={value} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 h-7 w-7 rounded-full"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 w-full rounded-lg border border-dashed border-border bg-muted/40 aspect-video">
          <HugeiconsIcon icon={Image01Icon} size={24} strokeWidth={1.5} className="text-muted-foreground" />
          <p className="text-xs text-muted-foreground">No image yet</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="gap-2"
        >
          <HugeiconsIcon icon={CloudUploadIcon} size={14} strokeWidth={2} />
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </Button>

        {reqs && (
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {reqs.label} · {reqs.aspectRatio} · recommended{" "}
            {reqs.recommendedWidth}×{reqs.recommendedHeight} · max {reqs.maxFileSizeMB}MB
          </p>
        )}
      </div>
    </div>
  )
}
