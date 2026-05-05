import type { ReactNode } from "react"

export function AdminShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="px-6 sm:px-10 py-10 max-w-6xl">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight">{title}</h1>
          {description && (
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </header>

      {children}
    </div>
  )
}

export function AdminFieldRow({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6 py-5 border-b border-border last:border-0">
      <div className="lg:col-span-1">
        <label
          htmlFor={htmlFor}
          className="text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground"
        >
          {label}
        </label>
        {hint && <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{hint}</p>}
      </div>
      <div className="lg:col-span-2">{children}</div>
    </div>
  )
}
