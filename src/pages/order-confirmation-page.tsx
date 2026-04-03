import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import Lottie from "lottie-react"
import { ordersApi } from "@/services/api"
import type { ApiOrder } from "@/services/api"
import { ArrowLeft, CheckCircle2, Package, Truck, Home, Copy, ShoppingBag } from "lucide-react"
import orderConfirmedAnimation from "@/assets/Animation/Order-Confirmed.json"

const STATUS_STEPS: { key: ApiOrder["status"]; label: string; icon: typeof CheckCircle2 }[] = [
  { key: "pending",          label: "Order Placed",      icon: CheckCircle2 },
  { key: "confirmed",        label: "Order Confirmed",   icon: Package },
  { key: "out_for_delivery", label: "Out for Delivery",  icon: Truck },
  { key: "delivered",        label: "Delivered",          icon: Home },
]

const STATUS_INDEX: Record<ApiOrder["status"], number> = {
  pending: 0,
  confirmed: 1,
  out_for_delivery: 2,
  delivered: 3,
}

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
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-2 border-[#AE2534] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!order) return null

  const currentStep = STATUS_INDEX[order.status] ?? 0

  return (
    <div className="min-h-screen bg-zinc-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ─── Left Column ─── */}
          <div className="space-y-5">

            {/* Lottie + Status Card */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 flex flex-col items-center text-center">
              <div className="w-40 h-40">
                <Lottie animationData={orderConfirmedAnimation} loop={false} />
              </div>

              <h1 className="text-lg font-bold text-zinc-900 mt-2">Order Waiting for Confirmation</h1>
              <p className="text-sm text-zinc-400 mt-1 max-w-xs">
                We've received your order and will confirm shortly.
              </p>

              {/* Status Tracker */}
              <div className="w-full mt-8">
                <div className="flex items-start justify-between relative">
                  {/* Background line */}
                  <div className="absolute top-5 left-[12%] right-[12%] h-0.5 bg-zinc-100" />
                  {/* Progress line */}
                  <div
                    className="absolute top-5 left-[12%] h-0.5 bg-[#AE2534] transition-all duration-700"
                    style={{ width: `${(currentStep / 3) * 76}%` }}
                  />

                  {STATUS_STEPS.map((step, idx) => {
                    const Icon = step.icon
                    const done = idx <= currentStep
                    const active = idx === currentStep
                    return (
                      <div key={step.key} className="flex flex-col items-center gap-2 z-10 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                          done ? "bg-[#AE2534] border-[#AE2534]" : "bg-white border-zinc-200"
                        }`}>
                          <Icon className={`w-4 h-4 ${done ? "text-white" : "text-zinc-300"}`} />
                        </div>
                        <span className={`text-[10px] text-center leading-tight font-medium ${
                          active ? "text-[#AE2534]" : done ? "text-zinc-700" : "text-zinc-300"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Info Row */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#AE2534]" />
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Order ID</p>
                  <button onClick={copyOrderId} className="flex items-center gap-1 text-xs font-mono text-zinc-700 hover:text-[#AE2534] transition-colors">
                    #{order.id.slice(0, 8)}…
                    <Copy className="w-3 h-3" />
                    {copied && <span className="text-green-600 text-[10px] font-sans ml-1">Copied!</span>}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Placed on</p>
                <p className="text-xs font-medium text-zinc-700">{formatDate(order.created_at)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 uppercase tracking-wide">Total</p>
                <p className="text-xs font-bold text-zinc-900">₹{order.total.toLocaleString()}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="flex-1 h-11 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:border-[#AE2534] hover:text-[#AE2534] transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="flex-1 h-11 rounded-xl bg-[#AE2534] text-sm font-semibold text-white hover:bg-[#8e1e2a] transition-colors"
              >
                View My Orders
              </button>
            </div>
          </div>

          {/* ─── Right Column ─── */}
          <div className="space-y-5">

            {/* Items */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="w-4 h-4 text-zinc-500" />
                <h2 className="text-sm font-semibold text-zinc-800">Items</h2>
              </div>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
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
                        {item.quantity} x {item.products?.name ?? item.product_id}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {[
                          item.selected_color && `Color: ${item.selected_color}`,
                          item.selected_size && `Size: ${item.selected_size}`,
                        ].filter(Boolean).join(", ")}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-zinc-800 shrink-0">
                      ₹{(item.price_at_purchase * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
              <div className="space-y-2.5">
                <Row label="Subtotal" value={`₹${order.subtotal.toLocaleString()}`} />
                {order.discount > 0 && (
                  <Row label="Discount" value={`-₹${order.discount.toLocaleString()}`} valueClass="text-green-600" />
                )}
                <Row label="Delivery Fee" value={`₹${order.delivery_fee.toLocaleString()}`} />
                <div className="border-t border-zinc-100 pt-3 mt-3">
                  <Row label="Total" value={`₹${order.total.toLocaleString()}`} bold />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function Row({
  label, value, valueClass = "", bold = false,
}: { label: string; value: string; valueClass?: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? "font-bold text-zinc-900" : "text-zinc-500"}`}>{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-zinc-900" : "text-zinc-800"} ${valueClass}`}>{value}</span>
    </div>
  )
}
