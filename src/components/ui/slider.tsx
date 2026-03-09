import { cn } from "@/lib/utils"

type PriceSliderProps = {
  min: number
  max: number
  values: [number, number]
  onChange?: (values: [number, number]) => void
}

export function PriceSlider({ min, max, values, onChange }: PriceSliderProps) {
  const [minValue, maxValue] = values

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), maxValue)
    onChange?.([next, maxValue])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), minValue)
    onChange?.([minValue, next])
  }

  const progressLeft = ((minValue - min) / (max - min)) * 100
  const progressRight = 100 - ((maxValue - min) / (max - min)) * 100

  return (
    <div className="space-y-2">
      <div className="relative h-1.5 rounded-full bg-zinc-200">
        <div
          className={cn(
            "absolute inset-y-0 rounded-full bg-black",
            "transition-all"
          )}
          style={{ left: `${progressLeft}%`, right: `${progressRight}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className="pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-600">
        <span>${minValue}</span>
        <span>${maxValue}</span>
      </div>
    </div>
  )
}

