import { createBrowserRouter, Navigate } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { HomePage } from "@/pages/home-page"
import { CategoryPage } from "@/pages/category-page"
import { ProductDetailPage } from "@/pages/product-detail-page"
import { CartPage } from "@/pages/cart-page"
import { ProfilePage } from "@/pages/profile-page"
import { WishlistPage } from "@/pages/wishlist-page"
import { ContactUsPage } from "@/pages/contact-us-page"
import { OrdersPage } from "@/pages/orders-page"
import { CheckoutPage } from "@/pages/checkout-page"
import { OrderConfirmationPage } from "@/pages/order-confirmation-page"
import { AdminLoginPage } from "@/pages/admin-login-page"
import { AdminDashboardPage } from "@/pages/admin-dashboard-page"
import { AdminOrderDetailPage } from "@/pages/admin-order-detail-page"

export const router = createBrowserRouter([
  // Main site pages (wrapped in Layout)
  {
    path: "/",
    element: <Layout><HomePage /></Layout>,
  },
  {
    path: "/category/:slug",
    element: <Layout><CategoryPage /></Layout>,
  },
  {
    path: "/product/:id",
    element: <Layout><ProductDetailPage /></Layout>,
  },
  {
    path: "/cart",
    element: <Layout><CartPage /></Layout>,
  },
  {
    path: "/profile",
    element: <Layout><ProfilePage /></Layout>,
  },
  {
    path: "/wishlist",
    element: <Layout><WishlistPage /></Layout>,
  },
  {
    path: "/contact-us",
    element: <Layout><ContactUsPage /></Layout>,
  },
  {
    path: "/orders",
    element: <Layout><OrdersPage /></Layout>,
  },
  {
    path: "/checkout",
    element: <Layout><CheckoutPage /></Layout>,
  },
  {
    path: "/order-confirmation/:orderId",
    element: <Layout><OrderConfirmationPage /></Layout>,
  },

  // Admin pages (no Layout wrapper)
  { path: "/admin", element: <AdminLoginPage /> },
  { path: "/admin/dashboard", element: <AdminDashboardPage /> },
  { path: "/admin/orders/:orderId", element: <AdminOrderDetailPage /> },

  // Catch-all
  { path: "*", element: <Navigate to="/" replace /> },
])
