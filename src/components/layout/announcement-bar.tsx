import { X } from "lucide-react"
import { useState } from "react"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div
      className="relative flex w-full items-center justify-center px-12 py-2 md:px-16 md:py-1.5"
      style={{
        minHeight: '40px',
        background: 'rgba(246.50, 12.32, 12.32, 0.02)',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div
        className="text-center w-full text-sm sm:text-lg md:text-2xl leading-snug md:leading-normal"
        style={{
          color: '#AE2534',
          fontFamily: '"Joan", serif',
          fontWeight: 400,
          wordWrap: 'break-word'
        }}
      >
        "Welcome to Bahurani – Elegance in Every Thread! Happy Shopping!" 😊
      </div>
      <button
        type="button"
        aria-label="Close announcement"
        onClick={() => setIsVisible(false)}
        className="absolute right-4 flex h-6 w-6 items-center justify-center rounded-sm transition hover:opacity-75"
        style={{ color: '#AE2534' }}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

