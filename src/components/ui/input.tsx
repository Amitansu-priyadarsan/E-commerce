import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

export type InputProps = InputPrimitive.Props & {
  prefixIcon?: React.ReactNode
}

export function Input({ className, prefixIcon, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm transition focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/5",
        className
      )}
    >
      {prefixIcon && <span className="text-zinc-500">{prefixIcon}</span>}
      <InputPrimitive
        className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-zinc-400"
        {...props}
      />
    </div>
  )
}

