export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  slug?: string;
  description?: string;
}

export interface HomePageResponse {
  featuredProducts: ProductResponse[];
  newArrivals: ProductResponse[];
  bestSellers: ProductResponse[];
}

export interface ProductDetailWithStockResponse {
  product: ProductResponse;
  stockQuantity: number;
  stockStatus: string;
}

export interface SellerDashboardSummary {
  sellerId: string;
  totalProducts: number;
  totalQuantity: number;
  lowStockCount: number;
}
