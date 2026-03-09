import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variant === "default" &&
          "border-transparent bg-zinc-900 text-white",
        variant === "outline" &&
          "border-zinc-200 bg-white text-zinc-900",
        className
      )}
      {...props}
    />
  )
}

