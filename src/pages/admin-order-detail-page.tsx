import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { adminApi } from "@/services/api"
import type { AdminOrder } from "@/services/api"
import {
  ArrowLeft,
  CheckCircle2,
  Truck,
  Home,
  Clock,
  ChevronDown,
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  CreditCard,
} from "lucide-react"

// ── Status ───────────────────────────────────────────────────────────────────

type OrderStatus = "pending" | "processing" | "shipped" | "delivered"

const STATUS_CFG: Record<OrderStatus, { label: string; color: string; bg: string; border: string; icon: typeof Clock }> = {
  pending:     { label: "Order Placed",     color: "text-amber-600",   bg: "bg-amber-500/10",  border: "border-amber-500/20", icon: Clock },
  processing:  { label: "Confirmed",        color: "text-blue-600",    bg: "bg-blue-500/10",   border: "border-blue-500/20",  icon: CheckCircle2 },
  shipped:     { label: "Out for Delivery", color: "text-violet-600",  bg: "bg-violet-500/10", border: "border-violet-500/20",icon: Truck },
  delivered:   { label: "Delivered",        color: "text-emerald-600", bg: "bg-emerald-500/10",border: "border-emerald-500/20",icon: Home },
}
const STATUS_KEYS: OrderStatus[] = ["pending", "processing", "shipped", "delivered"]

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
}
function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
}

// ── Main ─────────────────────────────────────────────────────────────────────

export function AdminOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<AdminOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem("admin_token")
    if (!t) { navigate("/admin", { replace: true }); return }
    if (!orderId) return
    adminApi.getOrder(orderId)
      .then((r) => setOrder(r.data))
      .catch(() => navigate("/admin/dashboard", { replace: true }))
      .finally(() => setLoading(false))
  }, [orderId, navigate])

  async function changeStatus(s: string) {
    if (!order) return
    setUpdating(true)
    try {
      await adminApi.updateOrderStatus(order.id, s)
      setOrder((p) => p ? { ...p, status: s as OrderStatus } : null)
    } catch { /* */ } finally { setUpdating(false) }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="animate-spin rounded-full h-7 w-7 border-2 border-white/30 border-t-white" />
    </div>
  )

  if (!order) return null

  const cfg = STATUS_CFG[order.status as OrderStatus] || STATUS_CFG.pending
  const StatusIcon = cfg.icon
  const curIdx = STATUS_KEYS.indexOf(order.status as OrderStatus)
  const itemCount = order.order_items?.reduce((s, i) => s + i.quantity, 0) || 0

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Dark header with gradient ── */}
      <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/8 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Back bar */}
          <div className="h-14 flex items-center">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </button>
          </div>

          {/* Order header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-8">
            <div>
              <p className="text-xs text-white/30 font-mono mb-1">#{order.id}</p>
              <h1 className="text-2xl font-bold text-white">Order #{order.id.slice(0, 8)}</h1>
              <p className="text-sm text-white/40 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {fmtDate(order.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-3 pb-0.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                {cfg.label}
              </span>
              <div className="relative">
                <select
                  value={order.status}
                  onChange={(e) => changeStatus(e.target.value)}
                  disabled={updating}
                  className="appearance-none bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-xl px-4 py-2 pr-9 text-xs font-medium cursor-pointer hover:bg-white/15 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  {STATUS_KEYS.map((s) => (
                    <option key={s} value={s} className="text-slate-900">{STATUS_CFG[s].label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 -mt-4 pb-10 relative z-10">

        {/* Status Tracker */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-6 mb-5 shadow-sm">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-[8%] right-[8%] h-[3px] bg-slate-100 rounded-full" />
            <div
              className="absolute top-[18px] left-[8%] h-[3px] bg-slate-900 rounded-full transition-all duration-500"
              style={{ width: `${(curIdx / 3) * 84}%` }}
            />
            {STATUS_KEYS.map((s, i) => {
              const c = STATUS_CFG[s]; const Icon = c.icon
              const done = i <= curIdx; const active = i === curIdx
              return (
                <div key={s} className="flex flex-col items-center gap-2.5 z-10 flex-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    done ? "bg-slate-900 shadow-lg shadow-slate-900/20" : "bg-white border-2 border-slate-200"
                  }`}>
                    <Icon className={`w-4 h-4 ${done ? "text-white" : "text-slate-300"}`} />
                  </div>
                  <span className={`text-[11px] text-center leading-tight font-medium ${
                    active ? "text-slate-900" : done ? "text-slate-500" : "text-slate-300"
                  }`}>
                    {c.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Two columns */}
        <div className="grid gap-5 lg:grid-cols-[1fr_340px]">

          {/* Left — Items */}
          <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Items</h2>
              <span className="text-[11px] text-slate-400 ml-auto">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
            </div>
            <div className="divide-y divide-slate-100/60">
              {order.order_items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                    {item.products?.image_url && (
                      <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.products?.name || "Product"}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {item.selected_color && (
                        <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">{item.selected_color}</span>
                      )}
                      {item.selected_size && (
                        <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">{item.selected_size}</span>
                      )}
                      <span className="text-[11px] text-slate-400">x{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-slate-900">{fmtCurrency(item.price_at_purchase * item.quantity)}</p>
                    {item.quantity > 1 && <p className="text-[10px] text-slate-400 mt-0.5">{fmtCurrency(item.price_at_purchase)} each</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Customer */}
            <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h2 className="text-sm font-semibold text-slate-900">Customer</h2>
              </div>
              <div className="p-5 space-y-4">
                <Detail icon={<User className="w-3.5 h-3.5" />} label="Name" value={order.users?.full_name || "—"} />
                <Detail icon={<Mail className="w-3.5 h-3.5" />} label="Email" value={order.users?.email || "—"} />
                {order.users?.phone_number && (
                  <Detail icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={order.users.phone_number} />
                )}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                  <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h2 className="text-sm font-semibold text-slate-900">Payment</h2>
              </div>
              <div className="p-5 space-y-3">
                <Row label="Subtotal" value={fmtCurrency(order.subtotal)} />
                {order.discount > 0 && <Row label="Discount" value={`-${fmtCurrency(order.discount)}`} valueClass="text-emerald-600" />}
                <Row label="Delivery" value={fmtCurrency(order.delivery_fee)} />
                <div className="border-t border-slate-100 pt-3 mt-1">
                  <Row label="Total" value={fmtCurrency(order.total)} bold />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 text-slate-400">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-slate-400 font-medium">{label}</p>
        <p className="text-[13px] font-medium text-slate-900 truncate">{value}</p>
      </div>
    </div>
  )
}

function Row({ label, value, valueClass = "", bold = false }: {
  label: string; value: string; valueClass?: string; bold?: boolean
}) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? "font-bold text-slate-900" : "text-slate-400"}`}>{label}</span>
      <span className={`text-sm ${bold ? "font-bold text-slate-900" : "font-medium text-slate-700"} ${valueClass}`}>{value}</span>
    </div>
  )
}
