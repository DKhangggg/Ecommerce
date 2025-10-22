import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layouts/User";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
    ],
  },
]);
