import type { CreateProductPayload } from "../../types/product";
import type { apiResponse } from "../../types/ApiResponse";
import type { EnrichedInventoryItem } from "../../types/Inventory";
import type { IHttpClient } from "../../infrastructure/http/httpClient";

export type ProductService = ReturnType<typeof createProductService>;

export function createProductService(http: IHttpClient) {
  const createProduct = async (createProduct: CreateProductPayload) => {
    try {
      const response = await http.post<apiResponse<any>>(
        "private/product/product",
        createProduct
      );

      return response.data;
    } catch (error) {
      console.error("Error creating product (domain):", error);
      throw error;
    }
  };

  const getEnrichedInventories = async (): Promise<EnrichedInventoryItem[]> => {
    try {
      const response = await http.get<apiResponse<EnrichedInventoryItem[]>>(
        "private/aggregate/inventory"
      );
      // keep the same behavior: return the inner data array
      return response.data.data;
    } catch (error) {
      console.error("Error fetching enriched inventories (domain):", error);
      throw error;
    }
  };

  return {
    createProduct,
    getEnrichedInventories,
  } as const;
}
