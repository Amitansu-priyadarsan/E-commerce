import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type Review = {
  id: number
  name: string
  content: string
  rating: number
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah M.",
    content:
      "I’m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I’ve bought has exceeded my expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Alex K.",
    content:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
  },
  {
    id: 3,
    name: "James L.",
    content:
      "As someone who’s always on the lookout for unique fashion pieces, I’m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on‑point with the latest trends.",
    rating: 4,
  },
  {
    id: 4,
    name: "Mia R.",
    content:
      "The fit and comfort of their pieces are unmatched. I’ve recommended Shop.co to all my friends and they love it just as much as I do.",
    rating: 5,
  },
  {
    id: 5,
    name: "Daniel H.",
    content:
      "From the moment I placed my order to the unboxing experience, everything felt premium. This is my new go‑to store.",
    rating: 5,
  },
]

function getStars(rating: number) {
  return "★★★★★".slice(0, rating)
}

export function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const interval = window.setInterval(() => {
      if (!track) return
      const { scrollLeft, scrollWidth, clientWidth } = track
      const maxScroll = scrollWidth - clientWidth

      // If we're near the end, jump back to start
      if (scrollLeft + clientWidth >= maxScroll - 16) {
        track.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        track.scrollBy({ left: clientWidth * 0.7, behavior: "smooth" })
      }
    }, 4500)

    return () => window.clearInterval(interval)
  }, [])

  const handleScroll = (direction: "prev" | "next") => {
    const track = trackRef.current
    if (!track) return
    const { clientWidth } = track
    const offset = clientWidth * 0.7

    track.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    })
  }

  return (
    <section className="mt-16 space-y-6 overflow-x-hidden">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-black md:text-4xl">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            type="button"
            aria-label="Previous review"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-black/10 text-lg text-black hover:bg-black hover:text-white"
            onClick={() => handleScroll("prev")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            aria-label="Next review"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-black/10 text-lg text-black hover:bg-black hover:text-white"
            onClick={() => handleScroll("next")}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="flex w-96 shrink-0 flex-col justify-between rounded-[20px] border border-black/10 bg-white px-8 py-7 text-base text-black/80 snap-start"
            >
              <div className="mb-4 flex flex-col gap-3">
                <div className="text-base text-[#FDB241]">
                  {getStars(review.rating)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold leading-5 text-black">
                    {review.name}
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#01AB31]">
                    <span className="sr-only">Verified buyer</span>
                  </span>
                </div>
              </div>
              <p className="text-base leading-5 text-black/60">
                “{review.content}”
              </p>
            </Card>
          ))}
        </div>

        {/* Mobile arrows under track */}
        <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
          <Button
            type="button"
            aria-label="Previous review"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-black/10 text-base text-black hover:bg-black hover:text-white"
            onClick={() => handleScroll("prev")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            aria-label="Next review"
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-black/10 text-base text-black hover:bg-black hover:text-white"
            onClick={() => handleScroll("next")}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

