import { createContext, useContext, useMemo, useReducer, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { cartApi } from "@/services/api"
import { useAuth } from "@/contexts/auth-context"

export type CartItem = {
  id: string          // cart_items.id from DB when logged in; composite key for guests
  productId: string
  name: string
  price: number
  originalPrice?: number
  image: string
  color?: string
  size?: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  loading: boolean
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

type CartContextValue = {
  items: CartItem[]
  loading: boolean
  subtotal: number
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) =>
          i.productId === action.payload.productId &&
          i.color === action.payload.color &&
          i.size === action.payload.size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i))
          .filter((i) => i.quantity > 0),
      }
    case "CLEAR_CART":
      return { ...state, items: [] }
    default:
      return state
  }
}

// ── localStorage helpers for guest cart ──────────────────────────────────────

function loadGuestCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("cart_guest")
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function saveGuestCart(items: CartItem[]) {
  localStorage.setItem("cart_guest", JSON.stringify(items))
}

// ── Map API response to CartItem[] ──────────────────────────────────────────

function mapApiItems(apiItems: Awaited<ReturnType<typeof cartApi.get>>["data"]["items"]): CartItem[] {
  return apiItems.map((item) => ({
    id: item.id,
    productId: item.product_id,
    name: item.products?.name ?? "",
    price: item.price_at_purchase,
    originalPrice: item.products?.original_price,
    image: item.products?.image_url ?? "",
    color: item.selected_color,
    size: item.selected_size,
    quantity: item.quantity,
  }))
}

// ── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const prevUserIdRef = useRef<string | null>(null)
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: false })

  // On mount: load guest cart
  useEffect(() => {
    dispatch({ type: "SET_ITEMS", payload: loadGuestCart() })
  }, [])

  // When user logs in → fetch server cart; logs out → load guest cart
  useEffect(() => {
    const prevId = prevUserIdRef.current
    const currentId = user?.user_id ?? null
    prevUserIdRef.current = currentId

    if (currentId && currentId !== prevId) {
      // Logged in — fetch from backend
      dispatch({ type: "SET_LOADING", payload: true })
      cartApi
        .get(currentId)
        .then((res) => dispatch({ type: "SET_ITEMS", payload: mapApiItems(res.data.items) }))
        .catch(() => {/* keep current items on error */})
        .finally(() => dispatch({ type: "SET_LOADING", payload: false }))
    } else if (!currentId && prevId) {
      // Logged out — show guest cart
      dispatch({ type: "SET_ITEMS", payload: loadGuestCart() })
    }
  }, [user])

  // Persist guest cart to localStorage
  useEffect(() => {
    if (!user) {
      saveGuestCart(state.items)
    }
  }, [state.items, user])

  // ── Actions ──────────────────────────────────────────────────────────────

  function addItem(item: Omit<CartItem, "id">) {
    if (user) {
      cartApi
        .addItem(user.user_id, {
          product_id: item.productId,
          quantity: item.quantity,
          selected_color: item.color,
          selected_size: item.size,
          price_at_purchase: item.price,
        })
        .then(() => cartApi.get(user.user_id))
        .then((res) => dispatch({ type: "SET_ITEMS", payload: mapApiItems(res.data.items) }))
        .catch(() => {/* silently fail */})
    } else {
      const guestId = `${item.productId}-${item.color ?? ""}-${item.size ?? ""}`
      dispatch({ type: "ADD_ITEM", payload: { ...item, id: guestId } })
    }
  }

  function removeItem(id: string) {
    if (user) {
      const item = state.items.find((i) => i.id === id)
      if (!item) return
      dispatch({ type: "REMOVE_ITEM", payload: { id } })
      cartApi.removeItem(user.user_id, id).catch(() => {
        if (item) dispatch({ type: "ADD_ITEM", payload: item })
      })
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: { id } })
    }
  }

  function updateQuantity(id: string, quantity: number) {
    const prev = state.items.find((i) => i.id === id)
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    if (user) {
      cartApi.updateItem(user.user_id, id, quantity).catch(() => {
        if (prev) dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: prev.quantity } })
      })
    }
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" })
    if (user) {
      cartApi.clear(user.user_id).catch(() => {/* best effort */})
    }
  }

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      loading: state.loading,
      subtotal: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.items, state.loading, user]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
