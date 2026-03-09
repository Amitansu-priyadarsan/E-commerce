import { createContext, ReactNode, useContext, useMemo, useReducer } from "react"

type CartItem = {
  id: string
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
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

type CartContextValue = {
  items: CartItem[]
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      )

      if (existing) {
        return {
          items: state.items.map((item) =>
            item === existing
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }

      return { items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((item) => item.id !== action.payload.id) }
    case "UPDATE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      }
    case "CLEAR_CART":
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      subtotal: state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }),
    [state.items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return ctx
}

