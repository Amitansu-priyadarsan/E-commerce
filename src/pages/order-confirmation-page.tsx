import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import { ordersApi } from "@/services/api"
import type { ApiOrder } from "@/services/api"
import { CheckCircle2, Package, Truck, Home, Copy, ArrowLeft } from "lucide-react"
import orderConfirmedAnimation from "@/assets/Animation/Order-Confirmed.json"

// ── Status Steps ─────────────────────────────────────────────────────────────

const STATUS_STEPS: { key: ApiOrder["status"]; label: string; icon: typeof CheckCircle2 }[] = [
  { key: "pending",    label: "Order Placed",     icon: CheckCircle2 },
  { key: "processing", label: "Confirmed",         icon: Package },
  { key: "shipped",    label: "Out for Delivery",  icon: Truck },
  { key: "delivered",  label: "Delivered",          icon: Home },
]

const STATUS_INDEX: Record<ApiOrder["status"], number> = {
  pending: 0, processing: 1, shipped: 2, delivered: 3,
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<ApiOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!orderId) return
    ordersApi
      .getOrder(orderId)
      .then((res) => setOrder(res.data))
      .catch(() => navigate("/", { replace: true }))
      .finally(() => setLoading(false))
  }, [orderId, navigate])

  function copyOrderId() {
    if (!orderId) return
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="w-8 h-8 border-2 border-[#AE2534] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!order) return null

  const currentStep = STATUS_INDEX[order.status] ?? 0

  return (
    <div className="min-h-screen bg-zinc-50">

      {/* ── Hero Section ── */}
      <div className="relative bg-white overflow-hidden">
        {/* Subtle background circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#AE2534]/4 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-8">
          {/* Back link */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>

          {/* Lottie — big, centered */}
          <div className="flex justify-center -mb-4">
            <div className="w-56 h-56 sm:w-72 sm:h-72">
              <Lottie animationData={orderConfirmedAnimation} loop={false} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Order Received!
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-sm mx-auto">
              Thank you! We've got your order and will confirm it shortly.
            </p>
          </div>

          {/* Order meta chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-4 py-2 text-xs text-zinc-500">
              {formatDate(order.created_at)}
            </div>
            <div className="flex items-center gap-2 bg-[#AE2534]/5 border border-[#AE2534]/15 rounded-full px-4 py-2 text-xs font-semibold text-[#AE2534]">
              ₹{order.total.toLocaleString("en-IN")}
            </div>
          </div>

          {/* Status Tracker */}
          <div className="relative flex items-start justify-between px-4">
            {/* Track lines */}
            <div className="absolute top-5 left-[15%] right-[15%] h-0.5 bg-zinc-100 rounded-full" />
            <div
              className="absolute top-5 left-[15%] h-0.5 bg-[#AE2534] rounded-full transition-all duration-700"
              style={{ width: `${(currentStep / 3) * 70}%` }}
            />

            {STATUS_STEPS.map((step, idx) => {
              const Icon = step.icon
              const done = idx <= currentStep
              const active = idx === currentStep
              return (
                <div key={step.key} className="flex flex-col items-center gap-2.5 z-10 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    done
                      ? "bg-[#AE2534] shadow-lg shadow-[#AE2534]/25"
                      : "bg-white border-2 border-zinc-200"
                  }`}>
                    <Icon className={`w-4 h-4 ${done ? "text-white" : "text-zinc-300"}`} />
                  </div>
                  <span className={`text-[11px] sm:text-xs text-center leading-tight font-medium ${
                    active ? "text-[#AE2534]" : done ? "text-zinc-600" : "text-zinc-300"
                  }`}>
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Order Details ── */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Items */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-50 flex items-center gap-2">
            <Package className="w-4 h-4 text-zinc-400" />
            <h2 className="text-sm font-semibold text-zinc-800">
              Your Items
            </h2>
            <span className="ml-auto text-xs text-zinc-400">
              {order.order_items.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <div className="divide-y divide-zinc-50">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="w-13 h-13 rounded-xl bg-zinc-100 overflow-hidden shrink-0 w-[52px] h-[52px]">
                  {item.products?.image_url && (
                    <img
                      src={item.products.image_url}
                      alt={item.products.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-800 truncate">
                    {item.products?.name ?? "Product"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.selected_color && (
                      <span className="text-[11px] text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-md">{item.selected_color}</span>
                    )}
                    {item.selected_size && (
                      <span className="text-[11px] text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded-md">{item.selected_size}</span>
                    )}
                    <span className="text-[11px] text-zinc-400">×{item.quantity}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-zinc-800 shrink-0">
                  ₹{(item.price_at_purchase * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
          <div className="space-y-2.5">
            <SummaryRow label="Subtotal" value={`₹${order.subtotal.toLocaleString("en-IN")}`} />
            {order.discount > 0 && (
              <SummaryRow label="Discount" value={`-₹${order.discount.toLocaleString("en-IN")}`} valueClass="text-green-600" />
            )}
            <SummaryRow label="Delivery Fee" value={order.delivery_fee === 0 ? "Free" : `₹${order.delivery_fee.toLocaleString("en-IN")}`} valueClass={order.delivery_fee === 0 ? "text-green-600" : ""} />
            <div className="border-t border-zinc-100 pt-3 mt-1">
              <SummaryRow label="Total Paid" value={`₹${order.total.toLocaleString("en-IN")}`} bold />
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 h-12 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-600 hover:border-[#AE2534]/40 hover:text-[#AE2534] transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 h-12 rounded-xl bg-[#AE2534] text-sm font-semibold text-white hover:bg-[#8e1e2a] transition-colors shadow-md shadow-[#AE2534]/20"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, valueClass = "", bold = false }: {
  label: string; value: string; valueClass?: string; bold?: boolean
}) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? "font-bold text-zinc-900" : "text-zinc-500"}`}>{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-zinc-900" : "text-zinc-700"} ${valueClass}`}>{value}</span>
    </div>
  )
}
