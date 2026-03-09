import { cn } from "@/lib/utils"

type TabsProps = {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div className="space-y-4">
      {Array.isArray(children)
        ? children.map((child) =>
            child && typeof child === "object" && "props" in child
              ? {
                  ...child,
                  props: {
                    ...child.props,
                    activeValue: value,
                    onValueChange,
                  },
                }
              : child
          )
        : children}
    </div>
  )
}

type TabsListProps = {
  children: React.ReactNode
}

export function TabsList({ children }: TabsListProps) {
  return (
    <div className="inline-flex gap-2 rounded-full bg-[#F0F0F0] p-1.5">
      {children}
    </div>
  )
}

type TabsTriggerProps = {
  value: string
  activeValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function TabsTrigger({
  value,
  activeValue,
  onValueChange,
  children,
}: TabsTriggerProps) {
  const isActive = value === activeValue
  return (
    <button
      type="button"
      onClick={() => onValueChange?.(value)}
      className={cn(
        "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
        isActive
          ? "bg-black text-white"
          : "bg-white text-zinc-600 hover:bg-zinc-100"
      )}
    >
      {children}
    </button>
  )
}

type TabsContentProps = {
  value: string
  activeValue?: string
  children: React.ReactNode
}

export function TabsContent({ value, activeValue, children }: TabsContentProps) {
  if (value !== activeValue) return null
  return <div>{children}</div>
}

