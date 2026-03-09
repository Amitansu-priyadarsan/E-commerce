import { Link } from "react-router-dom"
import { X } from "lucide-react"
import { useState } from "react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative flex w-full items-center justify-center bg-black px-4 py-2 text-xs text-white">
      <p className="flex flex-wrap items-center gap-1 text-[14px] leading-none">
        <span className="font-normal">Sign up and get 20% off to your first order.</span>
        <Link
          to="/signup"
          className="font-medium underline underline-offset-4 hover:opacity-80"
        >
          Sign Up Now
        </Link>
      </p>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setIsVisible(false)}
        className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-sm text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

