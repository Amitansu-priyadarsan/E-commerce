import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterCta() {
  return (
    <section className="-translate-y-1/2 rounded-3xl bg-black px-6 py-8 text-white shadow-xl lg:px-10 lg:py-10">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-[0.25em]">
            Stay in the loop
          </h2>
          <p className="mt-2 max-w-md text-sm text-zinc-300">
            Get early access to new drops, exclusive discounts, and style tips
            straight to your inbox.
          </p>
        </div>
        <form
          className="flex w-full flex-col gap-3 md:w-80"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/5 text-sm text-white placeholder:text-zinc-400"
          />
          <Button
            type="submit"
            className="w-full rounded-full bg-white text-xs font-semibold uppercase tracking-[0.18em] text-black hover:bg-zinc-200"
          >
            Join Newsletter
          </Button>
        </form>
      </div>
    </section>
  )
}

