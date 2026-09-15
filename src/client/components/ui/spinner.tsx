import { cn } from "@shared/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

function Spinner({ className, strokeWidth, ...props }: React.ComponentProps<"svg">) {
  const numericStroke = typeof strokeWidth === "number" ? strokeWidth : 2
  return (
    <HugeiconsIcon icon={Loading03Icon} strokeWidth={numericStroke} role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
