import { User } from "lucide-react"
import { GoogleLogo } from "@/components/icons/google-logo"
import { StarFilled } from "@/components/icons/star-filled"
import { StarUnfilled } from "@/components/icons/star-unfilled"
import { GoogleGIcon } from "@/components/icons/google-g-icon"

type Review = {
  id: number
  name: string
  content: string
  rating: number
  date: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Swati Singh",
    date: "2023-07-16",
    content: "I have shopped a lot recently this store.\ni think its quit decent.",
    rating: 4,
  },
  {
    id: 2,
    name: "Manisha Shrivastava",
    date: "2023-07-16",
    content: "I have shopped a lot recently this store.\ni think its quit decent.",
    rating: 5,
  },
  {
    id: 3,
    name: "Swati Singh",
    date: "2023-07-16",
    content: "I have shopped a lot recently this store.\ni think its quit decent.",
    rating: 4,
  },
  {
    id: 4,
    name: "Manisha Shrivastava",
    date: "2023-07-16",
    content: "I have shopped a lot recently this store.\ni think its quit decent.",
    rating: 5,
  },
  {
    id: 5,
    name: "Swati Singh",
    date: "2023-07-16",
    content: "I have shopped a lot recently this store.\ni think its quit decent.",
    rating: 4,
  },
]

function GoogleReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative w-[340px] shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] mb-4 h-full">
      <div className="rounded-[12px] border border-gray-200 bg-white p-6 relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-white overflow-hidden shrink-0">
              <User size={30} className="text-black mt-2" fill="black" />
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-serif text-black leading-tight">
                {review.name}
              </span>
              <span className="text-[14px] text-gray-400 font-serif mt-1">
                {review.date}
              </span>
            </div>
          </div>
          <GoogleGIcon className="w-6 h-6 shrink-0 mt-1" />
        </div>

        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            i < review.rating ? (
              <StarFilled key={i} className="w-[18px] h-[18px]" />
            ) : (
              <StarUnfilled key={i} className="w-[18px] h-[18px]" />
            )
          ))}
        </div>

        <p className="text-[15px] leading-relaxed text-black font-serif whitespace-pre-wrap">
          {review.content}
        </p>
      </div>

      {/* Speech bubble tail */}
      <div className="absolute -bottom-2 right-8 w-6 h-6 bg-white border-b border-r border-gray-200 transform rotate-45 z-0"></div>
    </div>
  )
}

export function ReviewCarousel() {
  return (
    <section className="mt-8 overflow-x-hidden bg-white mb-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
        <GoogleLogo className="w-[160px] h-auto" />

        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            i < 4 ? <StarFilled key={i} className="w-8 h-8" /> : <StarUnfilled key={i} className="w-8 h-8" />
          ))}
        </div>

        <p className="text-gray-600 text-[15px]">
          Based on <span className="font-semibold text-black">454</span> reviews.
        </p>
      </div>

      <div className="relative">
        <div className="no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-6 px-4 md:px-8 max-w-[1440px] mx-auto">
          {reviews.map((review, i) => (
            <div key={`${review.id}-${i}`} className="snap-center pt-2">
              <GoogleReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

