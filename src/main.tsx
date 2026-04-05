import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { router } from "./router"
import { CartProvider } from "./contexts/cart-context"
import { WishlistProvider } from "./contexts/wishlist-context"
import { AuthProvider } from "./contexts/auth-context"
import { ToastProvider } from "./contexts/toast-context"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
