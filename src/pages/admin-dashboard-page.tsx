import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminApi } from "@/services/api"
import type { AdminDashboard, AdminOrder } from "@/services/api"
import {
  LayoutDashboard,
  ShoppingBag,
  IndianRupee,
  Users,
  Package,
  LogOut,
  CheckCircle2,
  Truck,
  Home,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react"

// ── Status ───────────────────────────────────────────────────────────────────

type OrderStatus = "pending" | "processing" | "shipped" | "delivered"

const STATUS_CFG: Record<OrderStatus, { label: string; color: string; bg: string; dot: string; icon: typeof Clock }> = {
  pending:     { label: "Order Placed",     color: "text-amber-600",   bg: "bg-amber-500/10",  dot: "bg-amber-500",  icon: Clock },
  processing:  { label: "Confirmed",        color: "text-blue-600",    bg: "bg-blue-500/10",   dot: "bg-blue-500",   icon: CheckCircle2 },
  shipped:     { label: "Out for Delivery", color: "text-violet-600",  bg: "bg-violet-500/10", dot: "bg-violet-500", icon: Truck },
  delivered:   { label: "Delivered",        color: "text-emerald-600", bg: "bg-emerald-500/10",dot: "bg-emerald-500",icon: Home },
}
const STATUS_KEYS: OrderStatus[] = ["pending", "processing", "shipped", "delivered"]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}
function getTimeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (d === 0) return "Today"
  if (d === 1) return "Yesterday"
  if (d < 7) return `${d}d ago`
  return formatDate(iso)
}
function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
}

// ── Main ─────────────────────────────────────────────────────────────────────

type Tab = "dashboard" | "orders"

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const [dash, setDash] = useState<AdminDashboard | null>(null)
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>("dashboard")
  const [filter, setFilter] = useState<OrderStatus | "all">("all")

  useEffect(() => {
    const t = localStorage.getItem("admin_token")
    if (!t) { navigate("/admin", { replace: true }); return }
    Promise.all([adminApi.getDashboard(), adminApi.getAllOrders()])
      .then(([d, o]) => { setDash(d.data); setOrders(o.data) })
      .catch(() => { localStorage.removeItem("admin_token"); navigate("/admin", { replace: true }) })
      .finally(() => setLoading(false))
  }, [navigate])

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter)
  const pendingCount = orders.filter((o) => o.status === "pending").length

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="animate-spin rounded-full h-7 w-7 border-2 border-white/30 border-t-white" />
    </div>
  )

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* ── Sidebar ── */}
      <aside className="w-[230px] fixed inset-y-0 left-0 z-20 bg-linear-to-b from-slate-900 to-slate-950 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <span className="text-[15px] font-bold text-white tracking-tight">Admin Panel</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          <NavItem
            icon={<LayoutDashboard className="w-[18px] h-[18px]" />}
            label="Dashboard"
            active={tab === "dashboard"}
            onClick={() => setTab("dashboard")}
          />
          <NavItem
            icon={<ShoppingBag className="w-[18px] h-[18px]" />}
            label="Orders"
            active={tab === "orders"}
            onClick={() => setTab("orders")}
            badge={pendingCount || undefined}
          />
        </nav>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-white/5">
          <button
            onClick={() => { localStorage.removeItem("admin_token"); navigate("/admin", { replace: true }) }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <main className="flex-1 ml-[230px]">
        {/* Gradient header strip */}
        <div className="h-40 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-purple-500/8 rounded-full blur-3xl" />
          <div className="max-w-6xl mx-auto px-6 pt-7">
            <h1 className="text-xl font-bold text-white">
              {tab === "dashboard" ? "Dashboard" : "Orders"}
            </h1>
            <p className="text-sm text-white/40 mt-1">
              {tab === "dashboard" ? "Overview of your store" : `${dash?.total_orders || 0} total orders`}
            </p>
          </div>
        </div>

        {/* Content area overlapping the header */}
        <div className="max-w-6xl mx-auto px-6 -mt-16 pb-10 relative z-10">
          {tab === "dashboard" ? (
            <DashboardView dash={dash} orders={orders} onViewAll={() => setTab("orders")} onViewOrder={(id) => navigate(`/admin/orders/${id}`)} />
          ) : (
            <OrdersView orders={filtered} filter={filter} onFilter={setFilter} counts={dash?.status_counts || {}} total={dash?.total_orders || 0} onView={(id) => navigate(`/admin/orders/${id}`)} />
          )}
        </div>
      </main>
    </div>
  )
}

// ── Nav Item ─────────────────────────────────────────────────────────────────

function NavItem({ icon, label, active, onClick, badge }: {
  icon: React.ReactNode; label: string; active: boolean; onClick: () => void; badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
        active ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full bg-amber-500 text-white">
          {badge}
        </span>
      )}
    </button>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function DashboardView({ dash, orders, onViewAll, onViewOrder }: {
  dash: AdminDashboard | null; orders: AdminOrder[]; onViewAll: () => void; onViewOrder: (id: string) => void
}) {
  if (!dash) return null
  return (
    <div className="space-y-5">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={<ShoppingBag className="w-5 h-5" />} label="Orders" value={dash.total_orders.toString()} accent="from-blue-500 to-blue-600" />
        <Stat icon={<IndianRupee className="w-5 h-5" />} label="Revenue" value={formatCurrency(dash.total_revenue)} accent="from-emerald-500 to-emerald-600" />
        <Stat icon={<Users className="w-5 h-5" />} label="Customers" value={dash.total_users.toString()} accent="from-violet-500 to-violet-600" />
        <Stat icon={<Package className="w-5 h-5" />} label="Products" value={dash.total_products.toString()} accent="from-amber-500 to-amber-600" />
      </div>

      {/* Status Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATUS_KEYS.map((s) => {
          const c = STATUS_CFG[s]
          const Icon = c.icon
          const count = dash.status_counts[s] || 0
          return (
            <div key={s} className="bg-white rounded-xl border border-slate-200/60 p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${c.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{count}</p>
                <p className={`text-[11px] font-medium ${c.color}`}>{c.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden">
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-900">Recent Orders</h3>
          </div>
          <button onClick={onViewAll} className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="divide-y divide-slate-100/80">
          {orders.slice(0, 6).map((order) => {
            const c = STATUS_CFG[order.status as OrderStatus] || STATUS_CFG.pending
            const Icon = c.icon
            return (
              <button key={order.id} onClick={() => onViewOrder(order.id)} className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/60 transition-colors text-left group">
                <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${c.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{order.users?.full_name || "Guest"}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{getTimeAgo(order.created_at)} · {order.order_items?.length || 0} items</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-slate-900">{formatCurrency(order.total)}</p>
                  <p className={`text-[10px] font-medium ${c.color}`}>{c.label}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors shrink-0" />
              </button>
            )
          })}
          {orders.length === 0 && <div className="py-12 text-center text-sm text-slate-400">No orders yet</div>}
        </div>
      </div>
    </div>
  )
}

// ── Orders View ──────────────────────────────────────────────────────────────

function OrdersView({ orders, filter, onFilter, counts, total, onView }: {
  orders: AdminOrder[]; filter: OrderStatus | "all"; onFilter: (s: OrderStatus | "all") => void
  counts: Record<string, number>; total: number; onView: (id: string) => void
}) {
  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Pill label="All" count={total} active={filter === "all"} onClick={() => onFilter("all")} />
        {STATUS_KEYS.map((s) => (
          <Pill key={s} label={STATUS_CFG[s].label} count={counts[s] || 0} active={filter === s} onClick={() => onFilter(s)} />
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-2">
        {orders.map((order) => {
          const c = STATUS_CFG[order.status as OrderStatus] || STATUS_CFG.pending
          const Icon = c.icon
          const qty = order.order_items?.reduce((s, i) => s + i.quantity, 0) || 0
          return (
            <button key={order.id} onClick={() => onView(order.id)} className="w-full bg-white rounded-xl border border-slate-200/60 p-4 hover:shadow-md hover:border-slate-300/60 transition-all text-left group">
              <div className="flex items-center gap-4">
                {/* Thumbnails */}
                <div className="flex -space-x-2 shrink-0">
                  {order.order_items?.slice(0, 3).map((item, i) => (
                    <div key={item.id} className="w-11 h-11 rounded-lg bg-slate-100 border-2 border-white overflow-hidden" style={{ zIndex: 3 - i }}>
                      {item.products?.image_url && <img src={item.products.image_url} alt="" className="w-full h-full object-cover" />}
                    </div>
                  ))}
                  {(order.order_items?.length || 0) > 3 && (
                    <div className="w-11 h-11 rounded-lg bg-slate-100 border-2 border-white flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-400">+{order.order_items.length - 3}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-slate-900">{order.users?.full_name || "Guest"}</span>
                    <span className="text-[10px] text-slate-400 font-mono">#{order.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {order.users?.email} · {qty} item{qty !== 1 ? "s" : ""} · {getTimeAgo(order.created_at)}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(order.total)}</p>
                    <span className={`inline-flex items-center gap-1 mt-1 text-[10px] font-semibold ${c.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                      {c.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </div>
            </button>
          )
        })}
        {orders.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200/60 py-16 flex flex-col items-center">
            <Package className="w-10 h-10 text-slate-200 mb-3" />
            <p className="text-sm text-slate-400">No orders found</p>
            {filter !== "all" && <button onClick={() => onFilter("all")} className="mt-2 text-xs font-semibold text-slate-600 hover:underline">Clear filter</button>}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Stat Card ────────────────────────────────────────────────────────────────

function Stat({ icon, label, value, accent }: {
  icon: React.ReactNode; label: string; value: string; accent: string
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 p-5 relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${accent} opacity-5 rounded-bl-[40px]`} />
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br ${accent} text-white mb-3 shadow-lg shadow-slate-900/5`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{label}</p>
    </div>
  )
}

// ── Pill ─────────────────────────────────────────────────────────────────────

function Pill({ label, count, active, onClick }: {
  label: string; count: number; active: boolean; onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
        active
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10"
          : "bg-white border border-slate-200/80 text-slate-500 hover:border-slate-300 hover:text-slate-700"
      }`}
    >
      {label}
      <span className={active ? "text-white/40" : "text-slate-300"}>{count}</span>
    </button>
  )
}
