import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterCta() {
  return (
    <section className="-translate-y-1/2 rounded-3xl bg-black px-4 py-6 text-white shadow-xl sm:px-6 lg:px-10 lg:py-9">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl md:max-w-[551px]">
          <h2 className="font-integral text-2xl font-bold leading-snug md:text-4xl md:leading-10">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </h2>
        </div>
        <form
          className="flex w-full flex-col gap-3.5 md:w-[380px]"
          onSubmit={(e) => e.preventDefault()}
        >
         <div className="flex w-full items-center rounded-[62px] bg-white px-4 py-3">
  <Input
    type="email"
    placeholder="Enter your email address"
    className="flex-1 min-w-0 h-auto border-none bg-transparent p-0 text-base font-normal text-black placeholder:text-black/40 focus-visible:ring-0 focus-visible:ring-offset-0"
  />
</div>
          <Button
            type="submit"
            className="w-full rounded-[62px] bg-white px-4 py-3 text-base font-medium text-black hover:bg-zinc-200"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  )
}

