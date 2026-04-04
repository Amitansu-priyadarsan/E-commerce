import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { ordersApi } from "@/services/api"
import paymentAnimation from "@/assets/Animation/Payment.json"

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)

  // Snapshot cart data on first render so clearCart() doesn't wipe it.
  // Read address directly from localStorage to avoid React state timing issues
  // (updateAddress writes to localStorage synchronously before setting state).
  const snapshotRef = useRef<{
    items: typeof items
    subtotal: number
    userId: string
    address: string | null
    city: string | null
    pincode: string | null
  } | null>(null)

  if (!snapshotRef.current && items.length > 0 && user) {
    // Always read the freshest user data from localStorage
    let freshUser = user
    try {
      const stored = localStorage.getItem("auth_user")
      if (stored) freshUser = JSON.parse(stored)
    } catch { /* fall back to context user */ }

    snapshotRef.current = {
      items: [...items],
      subtotal,
      userId: freshUser.user_id,
      address: freshUser.address,
      city: freshUser.city,
      pincode: freshUser.pincode,
    }
  }

  useEffect(() => {
    const snap = snapshotRef.current

    if (!snap) {
      // Only redirect if there's genuinely no session — not just a slow hydration
      const hasSession = !!localStorage.getItem("auth_token")
      if (!hasSession || items.length === 0) {
        navigate("/cart", { replace: true })
      }
      return
    }

    let cancelled = false

    const discount = snap.subtotal > 200 ? snap.subtotal * 0.1 : 0
    const delivery = snap.subtotal > 0 ? 8 : 0
    const total = snap.subtotal - discount + delivery

    // Show payment animation for 2s, then place order
    const timer = setTimeout(() => {
      if (cancelled) return
      ordersApi
        .create({
          user_id: snap.userId,
          items: snap.items.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity,
            selected_color: item.color,
            selected_size: item.size,
            price_at_purchase: item.price,
          })),
          subtotal: snap.subtotal,
          discount,
          delivery_fee: delivery,
          total,
          delivery_address: snap.address ?? undefined,
          delivery_city: snap.city ?? undefined,
          delivery_pincode: snap.pincode ?? undefined,
        })
        .then((res) => {
          if (cancelled) return
          clearCart()
          setDone(true)
          navigate(`/order-confirmation/${res.data.order_id}`, { replace: true })
        })
        .catch(() => {
          if (cancelled) return
          navigate("/cart", { replace: true })
        })
    }, 2000)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="w-48 h-48">
        <Lottie animationData={paymentAnimation} loop />
      </div>
      <p className="mt-4 text-base font-semibold text-zinc-800 tracking-wide">Placing your order…</p>
      <p className="mt-1 text-sm text-zinc-400">Please wait a moment.</p>
    </div>
  )
}
