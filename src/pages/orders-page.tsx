import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { ordersApi } from "@/services/api"
import type { ApiOrder } from "@/services/api"
import {
  Package,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  Truck,
  Home,
  Clock,
  ArrowLeft,
} from "lucide-react"

// ── Status Config ────────────────────────────────────────────────────────────

type OrderStatus = ApiOrder["status"]

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string; dot: string; icon: typeof Clock }
> = {
  pending:    { label: "Order Placed",     color: "text-amber-700",  bg: "bg-amber-50",  dot: "bg-amber-500",  icon: Clock },
  processing: { label: "Confirmed",        color: "text-blue-700",   bg: "bg-blue-50",   dot: "bg-blue-500",   icon: CheckCircle2 },
  shipped:    { label: "Out for Delivery", color: "text-purple-700", bg: "bg-purple-50", dot: "bg-purple-500", icon: Truck },
  delivered:  { label: "Delivered",        color: "text-green-700",  bg: "bg-green-50",  dot: "bg-green-500",  icon: Home },
}

const STATUS_KEYS: OrderStatus[] = ["pending", "processing", "shipped", "delivered"]

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? "s" : ""} ago`
  return formatDate(iso)
}

// ── Main Component ───────────────────────────────────────────────────────────

export function OrdersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<ApiOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<OrderStatus | "all">("all")

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true })
      return
    }
    ordersApi
      .getUserOrders(user.user_id)
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [user, navigate])

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {})

  const filtered = activeFilter === "all" ? orders : orders.filter((o) => o.status === activeFilter)

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-zinc-900">My Orders</h1>
            {!loading && orders.length > 0 && (
              <p className="text-xs text-zinc-400 mt-0.5">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        {!loading && orders.length > 0 && (
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
            <FilterPill
              label="All"
              count={orders.length}
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            />
            {STATUS_KEYS.map((s) => (
              <FilterPill
                key={s}
                label={STATUS_CONFIG[s].label}
                count={statusCounts[s] || 0}
                active={activeFilter === s}
                onClick={() => setActiveFilter(s)}
              />
            ))}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#AE2534] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-10 flex flex-col items-center text-center">
            <Package className="w-10 h-10 text-zinc-200 mb-3" />
            <p className="text-sm text-zinc-500">No orders with this status</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-3 text-xs font-semibold text-[#AE2534] hover:underline"
            >
              View all orders
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Order Card ───────────────────────────────────────────────────────────────

function OrderCard({ order }: { order: ApiOrder }) {
  const itemCount = order.order_items.reduce((s, i) => s + i.quantity, 0)
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
  const currentIdx = STATUS_KEYS.indexOf(order.status)
  const Icon = cfg.icon

  return (
    <Link
      to={`/order-confirmation/${order.id}`}
      className="block bg-white rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md hover:border-zinc-200 transition-all duration-200 overflow-hidden group"
    >
      {/* Top section */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center`}>
              <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
            </div>
            <div>
              <span className={`text-xs font-semibold ${cfg.color}`}>
                {cfg.label}
              </span>
              <p className="text-[10px] text-zinc-400">{getTimeAgo(order.created_at)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-zinc-900">
              ₹{order.total.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-zinc-400 font-mono">#{order.id.slice(0, 8)}</p>
          </div>
        </div>

        {/* Item previews */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {order.order_items.slice(0, 3).map((item, i) => (
              <div
                key={item.id}
                className="w-11 h-11 rounded-xl bg-zinc-100 border-2 border-white overflow-hidden shrink-0"
                style={{ zIndex: 3 - i }}
              >
                {item.products?.image_url && (
                  <img
                    src={item.products.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
            {order.order_items.length > 3 && (
              <div className="w-11 h-11 rounded-xl bg-zinc-100 border-2 border-white flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-zinc-500">
                  +{order.order_items.length - 3}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-800 truncate">
              {order.order_items[0]?.products?.name ?? "Order"}
              {order.order_items.length > 1 && (
                <span className="text-zinc-400 font-normal"> +{order.order_items.length - 1} more</span>
              )}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {itemCount} item{itemCount !== 1 ? "s" : ""} · {formatDate(order.created_at)}
            </p>
          </div>

          <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#AE2534] transition-colors shrink-0" />
        </div>
      </div>

      {/* Mini status tracker */}
      <div className="px-4 pb-3 pt-1">
        <div className="flex items-center gap-1">
          {STATUS_KEYS.map((s, idx) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                idx <= currentIdx ? "bg-[#AE2534]" : "bg-zinc-100"
              }`}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}

// ── Filter Pill ──────────────────────────────────────────────────────────────

function FilterPill({ label, count, active, onClick }: {
  label: string; count: number; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
        active
          ? "bg-[#AE2534] text-white shadow-sm"
          : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300"
      }`}
    >
      {label}
      <span className={`${active ? "text-white/70" : "text-zinc-400"}`}>{count}</span>
    </button>
  )
}

// ── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-12 flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-zinc-50 flex items-center justify-center mb-5">
        <ShoppingBag className="w-8 h-8 text-zinc-300" />
      </div>
      <h2 className="text-lg font-bold text-zinc-900 mb-1">No orders yet</h2>
      <p className="text-sm text-zinc-400 max-w-xs mb-6">
        Looks like you haven't placed any orders. Start exploring our collection!
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-full bg-[#AE2534] text-sm font-semibold text-white hover:bg-[#8e1e2a] transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  )
}
