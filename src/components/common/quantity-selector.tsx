import { Button } from "@/components/ui/button"

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="inline-flex items-center rounded-full bg-[#F0F0F0] p-1">
      <Button
        type="button"
        size="icon-xs"
        variant="ghost"
        className="rounded-full"
        onClick={dec}
        disabled={value <= min}
      >
        -
      </Button>
      <span className="w-8 text-center text-xs font-semibold text-zinc-900">
        {value}
      </span>
      <Button
        type="button"
        size="icon-xs"
        variant="ghost"
        className="rounded-full"
        onClick={inc}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  )
}

