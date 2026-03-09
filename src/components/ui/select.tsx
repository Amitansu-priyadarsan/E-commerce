import { cn } from "@/lib/utils"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, ...props }: SelectProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs">
      <select
        className={cn(
          "bg-transparent text-xs font-medium text-zinc-700 outline-none",
          className
        )}
        {...props}
      />
    </div>
  )
}

