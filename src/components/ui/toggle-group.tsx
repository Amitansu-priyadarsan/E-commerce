import { cn } from "@/lib/utils"

type ToggleGroupProps = {
  type?: "single" | "multiple"
  value?: string
  values?: string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children: React.ReactNode
}

export function ToggleGroup({
  type = "single",
  value,
  values,
  onValueChange,
  className,
  children,
}: ToggleGroupProps) {
  const handleItemClick = (val: string) => {
    if (!onValueChange) return

    if (type === "single") {
      onValueChange(val)
    } else {
      const current = values ?? []
      const exists = current.includes(val)
      onValueChange(
        exists ? current.filter((v) => v !== val) : [...current, val]
      )
    }
  }

  return (
    <div
      className={cn(
        "inline-flex flex-wrap gap-2 rounded-3xl bg-[#F0F0F0] p-1.5",
        className
      )}
    >
      {Array.isArray(children)
        ? children.map((child) =>
            child && typeof child === "object" && "props" in child
              ? {
                  ...child,
                  props: {
                    ...child.props,
                    isActive:
                      type === "single"
                        ? child.props.value === value
                        : (values ?? []).includes(child.props.value),
                    onClick: () => handleItemClick(child.props.value),
                  },
                }
              : child
          )
        : children}
    </div>
  )
}

type ToggleGroupItemProps = {
  value: string
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function ToggleGroupItem({
  children,
  isActive,
  onClick,
  className,
}: ToggleGroupItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-w-10 rounded-full px-3 py-1 text-xs font-medium transition",
        isActive
          ? "bg-black text-white"
          : "bg-white text-zinc-700 hover:bg-zinc-100",
        className
      )}
    >
      {children}
    </button>
  )
}

