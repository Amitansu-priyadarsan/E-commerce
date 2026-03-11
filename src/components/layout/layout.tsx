import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { AnnouncementBar } from "./announcement-bar"
import { Navbar } from "./navbar"
import { Footer } from "./footer"

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  return (
    <div className="min-h-screen bg-white text-black flex flex-col overflow-x-hidden">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        {isHome ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-6 sm:px-8">
            {children}
          </div>
        )}
      </main>
      <div className="relative border-t border-zinc-200 bg-white">
        <Footer />
      </div>
    </div>
  )
}

