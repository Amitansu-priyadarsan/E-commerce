import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type AccordionProps = {
  defaultValue?: string | string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  children: React.ReactNode
}

export function Accordion({ defaultValue, value, onValueChange, children }: AccordionProps) {
  const [internalOpenItems, setInternalOpenItems] = useState<Set<string>>(() => {
    if (value) return new Set(value)
    if (!defaultValue) return new Set()
    if (Array.isArray(defaultValue)) return new Set(defaultValue)
    return new Set([defaultValue])
  })

  // Sync internal state if controlled
  useEffect(() => {
    if (value) {
      setInternalOpenItems(new Set(value))
    }
  }, [value])

  const toggleItem = (itemValue: string) => {
    const next = new Set(internalOpenItems)
    if (next.has(itemValue)) {
      next.delete(itemValue)
    } else {
      next.add(itemValue)
    }

    if (!value) {
      setInternalOpenItems(next)
    }
    onValueChange?.(Array.from(next))
  }

  return (
    <div className="space-y-2">
      {Array.isArray(children)
        ? children.map((child) =>
          child && typeof child === "object" && "props" in child
            ? {
              ...child,
              props: {
                ...child.props,
                openItems: internalOpenItems,
                toggleItem,
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
  openItems?: Set<string>
  toggleItem?: (value: string) => void
}

export function AccordionItem({
  value,
  children,
  openItems,
  toggleItem,
}: AccordionItemProps) {
  const isOpen = openItems?.has(value) ?? false

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors">
      {Array.isArray(children)
        ? children.map((child) =>
          child && typeof child === "object" && "props" in child
            ? {
              ...child,
              props: {
                ...child.props,
                isOpen,
                onToggle: () => toggleItem?.(value),
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
      className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-800"
    >
      <span className="flex items-center gap-2">{children}</span>
      <span
        className={cn(
          "text-lg leading-none transition-transform duration-300",
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
  return <div className="border-t border-zinc-100 px-4 py-4 text-sm animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>
}
