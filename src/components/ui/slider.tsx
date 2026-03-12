

type PriceSliderProps = {
  min: number
  max: number
  values: [number, number]
  onChange?: (values: [number, number]) => void
}

export function PriceSlider({ min, max, values, onChange }: PriceSliderProps) {
  const [minValue, maxValue] = values

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Math.min(Number(e.target.value), maxValue - 100)
    onChange?.([nextValue, maxValue])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Math.max(Number(e.target.value), minValue + 100)
    onChange?.([minValue, nextValue])
  }

  const progressLeft = ((minValue - min) / (max - min)) * 100
  const progressRight = 100 - ((maxValue - min) / (max - min)) * 100

  return (
    <div className="relative pt-6 pb-2">
      <style>{`
        .range-slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #181111;
          cursor: grab;
          pointer-events: all;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.1s ease;
        }
        .range-slider-thumb::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }
        .range-slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #181111;
          cursor: grab;
          pointer-events: all;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Track */}
      <div className="relative h-1.5 w-full rounded-full bg-zinc-100 uppercase tracking-widest text-[10px] font-bold">
        {/* Active Range Highlight */}
        <div
          className="absolute h-full rounded-full bg-zinc-900"
          style={{ left: `${progressLeft}%`, right: `${progressRight}%` }}
        />

        {/* Hidden Range Inputs */}
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={minValue}
          onChange={handleMinChange}
          className="range-slider-thumb pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent outline-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={maxValue}
          onChange={handleMaxChange}
          className="range-slider-thumb pointer-events-none absolute inset-0 h-1.5 w-full appearance-none bg-transparent outline-none"
        />
      </div>

      {/* Modern Price Labels */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Min Price</span>
          <span className="text-sm font-semibold text-zinc-900 border-b border-zinc-200 pb-0.5">₹{minValue.toLocaleString()}</span>
        </div>
        <div className="h-4 w-px bg-zinc-200" />
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Max Price</span>
          <span className="text-sm font-semibold text-zinc-900 border-b border-zinc-200 pb-0.5">₹{maxValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
