import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"
import { ShoppingCart, X } from "lucide-react"

type Toast = {
  id: number
  message: string
  type: "cart" | "info" | "error"
}

type ToastContextValue = {
  showToast: (message: string, type?: Toast["type"]) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let _nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast["type"] = "cart") => {
    const id = ++_nextId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  function dismiss(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container — bottom-right on desktop, bottom-center on mobile */}
      <div className="fixed top-5 right-4 sm:right-6 z-200 flex flex-col gap-2 items-end pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg bg-zinc-900 text-white text-sm font-medium min-w-[220px] max-w-[320px] animate-slide-up"
          >
            {toast.type === "cart" && (
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#AE2534] shrink-0">
                <ShoppingCart className="w-3.5 h-3.5 text-white" />
              </span>
            )}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => dismiss(toast.id)}
              className="shrink-0 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within a ToastProvider")
  return ctx
}
