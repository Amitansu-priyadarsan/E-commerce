import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

type ReviewCardProps = {
  name: string
  rating: number
  content: string
  date?: string
  verified?: boolean
  showMenu?: boolean
  className?: string
}

function getStars(rating: number) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const totalStars = 5

  return Array.from({ length: totalStars }, (_, i) => {
    if (i < fullStars) return "★"
    if (i === fullStars && halfStar) return "★"
    return "☆"
  }).join("")
}

export function ReviewCard({
  name,
  rating,
  content,
  date,
  verified = false,
  showMenu = false,
  className = "",
}: ReviewCardProps) {
  return (
    <Card
      className={`flex shrink-0 flex-col justify-between rounded-[20px] border border-black/10 bg-white px-8 py-7 text-base text-black/80 shadow-none ${className}`}
    >
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-xl tracking-widest text-[#FDB241]">
            {getStars(rating)}
          </div>
          {showMenu && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black"
            >
              <span className="sr-only">More options</span>
              <span className="text-xl leading-none">...</span>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold leading-5 text-black">
            {name}
          </span>
          {verified && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#01AB31]">
              <Check className="h-3 w-3 text-white" strokeWidth={3} />
            </span>
          )}
        </div>
      </div>
      <p className="text-base leading-6 text-black/60">
        &ldquo;{content}&rdquo;
      </p>
      {date && (
        <p className="mt-6 text-sm font-medium text-black/60">
          Posted on {date}
        </p>
      )}
    </Card>
  )
}

