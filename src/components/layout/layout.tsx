import { ReactNode } from "react"
import { AnnouncementBar } from "./announcement-bar"
import { Navbar } from "./navbar"
import { NewsletterCta } from "./newsletter-cta"
import { Footer } from "./footer"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 lg:px-0">{children}</div>
      </main>
      <div className="relative border-t border-zinc-200 bg-[#F0F0F0]">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-0">
          <NewsletterCta />
        </div>
        <Footer />
      </div>
    </div>
  )
}

