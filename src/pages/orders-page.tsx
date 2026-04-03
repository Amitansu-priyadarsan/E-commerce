import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { ordersApi } from "@/services/api"
import type { ApiOrder } from "@/services/api"
import { Package, ChevronRight } from "lucide-react"

const STATUS_LABEL: Record<ApiOrder["status"], string> = {
  pending: "Order Placed",
  confirmed: "Confirmed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
}

const STATUS_COLOR: Record<ApiOrder["status"], string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  out_for_delivery: "bg-purple-50 text-purple-700",
  delivered: "bg-green-50 text-green-700",
}

export function OrdersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<ApiOrder[]>([])
  const [loading, setLoading] = useState(true)

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

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold uppercase tracking-[0.18em] text-center mb-8 text-zinc-900">
          My Orders
        </h1>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#AE2534] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-10 flex flex-col items-center text-center">
            <Package className="w-12 h-12 text-zinc-300 mb-3" />
            <p className="text-sm text-zinc-500">You haven't placed any orders yet.</p>
            <Link
              to="/"
              className="mt-4 px-6 py-2.5 rounded-full bg-[#AE2534] text-sm font-semibold text-white hover:bg-[#8e1e2a] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const itemCount = order.order_items.reduce((s, i) => s + i.quantity, 0)
              const firstItem = order.order_items[0]
              return (
                <Link
                  key={order.id}
                  to={`/order-confirmation/${order.id}`}
                  className="block bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 hover:border-[#AE2534]/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Preview image */}
                    <div className="w-14 h-14 rounded-xl bg-zinc-100 overflow-hidden shrink-0">
                      {firstItem?.products?.image_url && (
                        <img
                          src={firstItem.products.image_url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${STATUS_COLOR[order.status]}`}>
                          {STATUS_LABEL[order.status]}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-800 truncate">
                        {firstItem?.products?.name ?? "Order"}
                        {order.order_items.length > 1 && ` +${order.order_items.length - 1} more`}
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {formatDate(order.created_at)} · {itemCount} item{itemCount !== 1 && "s"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold text-zinc-900">₹{order.total.toLocaleString()}</span>
                      <ChevronRight className="w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
