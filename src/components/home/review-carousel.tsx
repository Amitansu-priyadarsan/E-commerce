import { Card } from "@/components/ui/card"

type Review = {
  id: number
  name: string
  content: string
  rating: number
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Jordan M.",
    content:
      "The quality and fit are insane. Everything feels heavy without being bulky.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aya K.",
    content:
      "Exactly the kind of monochrome pieces I\'ve been looking for. So easy to style.",
    rating: 5,
  },
  {
    id: 3,
    name: "Luis R.",
    content:
      "Shipping was fast and the packaging felt premium. I\'m already on my second order.",
    rating: 4,
  },
]

export function ReviewCarousel() {
  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-xl font-black uppercase tracking-[0.25em]">
        What people are saying
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="rounded-3xl bg-white p-5 text-sm text-zinc-700"
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {review.name}
            </div>
            <p className="text-sm text-zinc-700">{review.content}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

