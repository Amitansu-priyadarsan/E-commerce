import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
})

// Attach the auth token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Types ────────────────────────────────────────────────────────────────────

export type ApiProduct = {
  id: string
  name: string
  category: string
  price: number
  original_price?: number
  rating: number
  reviews_count: number
  image_url: string
  colors: string[]
  sizes: string[]
  tags?: string[]
}

export type ApiReview = {
  id: string
  product_id: string
  user_id: string
  rating: number
  content: string
  verified: boolean
  created_at: string
}

export type ApiCartItem = {
  id: string
  cart_id: string
  product_id: string
  quantity: number
  selected_color?: string
  selected_size?: string
  price_at_purchase: number
  products?: ApiProduct
}

// ── Products ─────────────────────────────────────────────────────────────────

export const productsApi = {
  list(params?: {
    category?: string
    min_price?: number
    max_price?: number
    color?: string
    size?: string
    sort_by?: string
    order?: string
    page?: number
    limit?: number
  }) {
    return api.get<{ data: ApiProduct[]; page: number; limit: number }>("/products/", { params })
  },

  get(id: string) {
    return api.get<ApiProduct>(`/products/${id}`)
  },
}

// ── Reviews ───────────────────────────────────────────────────────────────────

export const reviewsApi = {
  list(productId: string) {
    return api.get<ApiReview[]>(`/reviews/product/${productId}`)
  },

  create(review: { product_id: string; user_id: string; rating: number; content: string }) {
    return api.post<ApiReview>("/reviews/", review)
  },
}

// ── Cart ──────────────────────────────────────────────────────────────────────

export const cartApi = {
  get(userId: string) {
    return api.get<{ cart_id: string; items: ApiCartItem[] }>(`/cart/${userId}`)
  },

  addItem(
    userId: string,
    item: {
      product_id: string
      quantity: number
      selected_color?: string
      selected_size?: string
      price_at_purchase: number
    }
  ) {
    return api.post<ApiCartItem>(`/cart/${userId}/items`, item)
  },

  updateItem(userId: string, itemId: string, quantity: number) {
    return api.patch<ApiCartItem>(`/cart/${userId}/items/${itemId}`, { quantity })
  },

  removeItem(userId: string, itemId: string) {
    return api.delete(`/cart/${userId}/items/${itemId}`)
  },

  clear(userId: string) {
    return api.delete(`/cart/${userId}/clear`)
  },
}

// ── Wishlist ──────────────────────────────────────────────────────────────────

export const wishlistApi = {
  get(userId: string) {
    return api.get<Array<{ id: string; product_id: string; products: ApiProduct }>>(`/wishlist/${userId}`)
  },

  add(userId: string, productId: string) {
    return api.post(`/wishlist/${userId}`, { product_id: productId })
  },

  remove(userId: string, productId: string) {
    return api.delete(`/wishlist/${userId}/${productId}`)
  },
}

// ── Orders ────────────────────────────────────────────────────────────────────

export type ApiOrderItem = {
  id: string
  product_id: string
  quantity: number
  selected_color?: string
  selected_size?: string
  price_at_purchase: number
  products?: {
    name: string
    image_url: string
    category: string
  }
}

export type ApiOrder = {
  id: string
  user_id: string
  status: "pending" | "processing" | "shipped" | "delivered"
  subtotal: number
  discount: number
  delivery_fee: number
  total: number
  created_at: string
  order_items: ApiOrderItem[]
}

export const ordersApi = {
  create(order: {
    user_id: string
    items: Array<{
      product_id: string
      quantity: number
      selected_color?: string
      selected_size?: string
      price_at_purchase: number
    }>
    subtotal: number
    discount: number
    delivery_fee: number
    total: number
    delivery_address?: string
    delivery_city?: string
    delivery_pincode?: string
  }) {
    return api.post<{ order_id: string; status: string }>("/orders/", order)
  },

  getOrder(orderId: string) {
    return api.get<ApiOrder>(`/orders/${orderId}`)
  },

  getUserOrders(userId: string) {
    return api.get<ApiOrder[]>(`/orders/user/${userId}`)
  },
}

// ── Profile ───────────────────────────────────────────────────────────────────

export type ApiProfile = {
  id: string
  email: string
  full_name: string | null
  phone_number: string | null
  address: string | null
  city: string | null
  pincode: string | null
  created_at: string
}

export const profileApi = {
  getMe() {
    return api.get<ApiProfile>("/users/me")
  },
  update(data: { full_name?: string; phone_number?: string; address?: string; city?: string; pincode?: string }) {
    return api.patch<ApiProfile>("/users/me", data)
  },
}

// ── Contact ───────────────────────────────────────────────────────────────────

export const contactApi = {
  send(message: { name: string; email: string; message: string }) {
    return api.post<{ detail: string; id: string }>("/contact/", message)
  },
}

// ── Admin ────────────────────────────────────────────────────────────────────

export type AdminDashboard = {
  total_orders: number
  total_revenue: number
  total_users: number
  total_products: number
  status_counts: Record<string, number>
  recent_orders: Array<{
    id: string
    user_id: string
    status: string
    total: number
    created_at: string
    users: { email: string; full_name: string | null } | null
  }>
}

export type AdminOrder = {
  id: string
  user_id: string
  status: "pending" | "processing" | "shipped" | "delivered"
  subtotal: number
  discount: number
  delivery_fee: number
  total: number
  created_at: string
  delivery_address?: string | null
  delivery_city?: string | null
  delivery_pincode?: string | null
  users: { email: string; full_name: string | null; phone_number?: string | null } | null
  order_items: Array<{
    id: string
    product_id: string
    quantity: number
    selected_color?: string
    selected_size?: string
    price_at_purchase: number
    products?: { name: string; image_url: string; category?: string }
  }>
}

function adminHeaders() {
  const token = localStorage.getItem("admin_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const adminApi = {
  login(email: string, password: string) {
    return api.post<{ access_token: string; role: string }>("/admin/login", { email, password })
  },

  getDashboard() {
    return api.get<AdminDashboard>("/admin/dashboard", { headers: adminHeaders() })
  },

  getAllOrders() {
    return api.get<AdminOrder[]>("/admin/orders", { headers: adminHeaders() })
  },

  getOrder(orderId: string) {
    return api.get<AdminOrder>(`/admin/orders/${orderId}`, { headers: adminHeaders() })
  },

  updateOrderStatus(orderId: string, status: string) {
    return api.patch<AdminOrder>(`/admin/orders/${orderId}/status`, { status }, { headers: adminHeaders() })
  },
}

export default api
