import {
  ApiResponse,
  HomePageResponse,
  ProductDetailWithStockResponse,
  ProductResponse,
  SellerDashboardSummary,
} from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function getHomepageData(): Promise<HomePageResponse> {
  const res = await fetch(`${API_BASE}/api/public/aggregate/homepage-data`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch homepage data");
  }
  const api = (await res.json()) as ApiResponse<HomePageResponse>;
  return api.data;
}

export async function getShopProducts(params: URLSearchParams): Promise<ProductResponse[]> {
  const searchParams = new URLSearchParams(params.toString());
  if (!searchParams.get("page")) searchParams.set("page", "0");
  if (!searchParams.get("size")) searchParams.set("size", "20");

  const res = await fetch(`${API_BASE}/api/public/product?${searchParams.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const api = (await res.json()) as ApiResponse<ProductResponse[]>;
  return api.data ?? [];
}

export async function getProductDetailWithStock(
  id: string
): Promise<ProductDetailWithStockResponse | null> {
  const res = await fetch(`${API_BASE}/api/public/aggregate/product/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  const api = (await res.json()) as ApiResponse<ProductDetailWithStockResponse>;
  return api.data;
}

export async function getSellerDashboardSummary(
  token: string
): Promise<SellerDashboardSummary | null> {
  if (!token) return null;
  const res = await fetch(`${API_BASE}/api/private/aggregate/seller-dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const api = (await res.json()) as ApiResponse<SellerDashboardSummary>;
  return api.data;
}

