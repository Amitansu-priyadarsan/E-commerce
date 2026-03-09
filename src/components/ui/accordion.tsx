import { useState } from "react"
import { cn } from "@/lib/utils"

type AccordionProps = {
  defaultValue?: string
  children: React.ReactNode
}

export function Accordion({ defaultValue, children }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | undefined>(defaultValue)

  return (
    <div className="space-y-2">
      {Array.isArray(children)
        ? children.map((child) =>
            child && typeof child === "object" && "props" in child
              ? {
                  ...child,
                  props: {
                    ...child.props,
                    openItem,
                    setOpenItem,
                  },
                }
              : child
          )
        : children}
    </div>
  )
}

type AccordionItemProps = {
  value: string
  children: React.ReactNode
  openItem?: string
  setOpenItem?: (value: string) => void
}

export function AccordionItem({
  value,
  children,
  openItem,
  setOpenItem,
}: AccordionItemProps) {
  const isOpen = openItem === value

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      {Array.isArray(children)
        ? children.map((child) =>
            child && typeof child === "object" && "props" in child
              ? {
                  ...child,
                  props: {
                    ...child.props,
                    isOpen,
                    onToggle: () =>
                      setOpenItem?.(isOpen ? "" : value),
                  },
                }
              : child
          )
        : children}
    </div>
  )
}

type AccordionTriggerProps = {
  children: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

export function AccordionTrigger({
  children,
  isOpen,
  onToggle,
}: AccordionTriggerProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700"
    >
      {children}
      <span
        className={cn(
          "text-lg leading-none transition-transform",
          isOpen ? "rotate-45" : ""
        )}
      >
        +
      </span>
    </button>
  )
}

type AccordionContentProps = {
  children: React.ReactNode
  isOpen?: boolean
}

export function AccordionContent({ children, isOpen }: AccordionContentProps) {
  if (!isOpen) return null
  return <div className="border-t border-zinc-200 px-4 py-3 text-sm">{children}</div>
}

