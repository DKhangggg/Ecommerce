import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layouts/User";
import { HomePage } from "../pages/HomePage";
import { ProductDetailPage } from "../pages/ProductPage";
import { AuthLayout } from "../components/layouts/Auth";
import LoginPage from "../pages/LoginPage";

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
]);
