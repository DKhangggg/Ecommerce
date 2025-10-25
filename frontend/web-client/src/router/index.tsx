import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layouts/UserLayout";
import { HomePage } from "../pages/HomePage";
import { ProductDetailPage } from "../pages/ProductPage";
import { AuthLayout } from "../components/layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";

import ProfileLayout from "../components/layouts/ProfileLayout";
import UserProfilePage from "../pages/Profile/UserProfilePage";
import SellerProfilePage from "../pages/Profile/SellerProfilePage";
import NotificationsPage from "../pages/Profile/NotificationsPage";
import OrdersPage from "../pages/Profile/OrdersPage";
import VouchersPage from "../pages/Profile/VouchersPage";
import AllOrdersPage from "../pages/Profile/Orders/AllOrdersPage";
import PendingOrdersPage from "../pages/Profile/Orders/PendingOrdersPage";
import ShippingOrdersPage from "../pages/Profile/Orders/ShippingOrdersPage";
import DeliveringOrdersPage from "../pages/Profile/Orders/DeliveringOrdersPage";
import CompletedOrdersPage from "../pages/Profile/Orders/CompletedOrdersPage";
import CancelledOrdersPage from "../pages/Profile/Orders/CancelledOrdersPage";
import RefundsOrdersPage from "../pages/Profile/Orders/RefundsOrdersPage";
import CartPage from "../pages/Profile/CartPage";
import { ProtectedRoute } from "./protectedRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <UserProfilePage /> },
      { path: "user", element: <UserProfilePage /> },
      { path: "seller", element: <SellerProfilePage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "vouchers", element: <VouchersPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "orders",
        element: <OrdersPage />,
        children: [
          { path: "all", element: <AllOrdersPage /> },
          { path: "pending", element: <PendingOrdersPage /> },
          { path: "shipping", element: <ShippingOrdersPage /> },
          { path: "delivering", element: <DeliveringOrdersPage /> },
          { path: "completed", element: <CompletedOrdersPage /> },
          { path: "cancelled", element: <CancelledOrdersPage /> },
          { path: "refunds", element: <RefundsOrdersPage /> },
        ],
      },
    ],
  },
]);
