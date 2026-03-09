

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
    <div className="inline-flex h-14 w-32 items-center justify-between rounded-full bg-[#F0F0F0] px-3">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center text-xl font-medium text-zinc-900 focus:outline-none disabled:opacity-50"
        onClick={dec}
        disabled={value <= min}
      >
        -
      </button>
      <span className="font-satoshi text-base font-medium text-zinc-900">
        {value}
      </span>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center text-xl font-medium text-zinc-900 focus:outline-none disabled:opacity-50"
        onClick={inc}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  )
}

