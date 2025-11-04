import type {CreateProductPayload} from "../types/product.ts";
import type {apiResponse} from "../types/ApiResponse.ts";
import PrivateApiClient from "../api/privateApiClient.ts";
import type {EnrichedInventoryItem} from "../types/Inventory.ts";

export type BackendStatus =
    | "IN_STOCK"
    | "OUT_OF_STOCK"
    | "LOW_STOCK"
    | "DISCONTINUED"
    | "RESERVED";

const createProduct = async (createProduct: CreateProductPayload) => {
    try {
        const response = await PrivateApiClient.post<apiResponse<any>>('private/product/product', createProduct);

        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export const getEnrichedInventories = async (): Promise<EnrichedInventoryItem[]> => {
    try {
        const response = await PrivateApiClient.get<apiResponse<EnrichedInventoryItem[]>>('private/aggregate/inventory');
        console.log("Lấy enriched inventories thành công:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Lỗi khi lấy enriched inventories:", error);
        throw error;
    }
};
export const productService = {
    createProduct,
    getEnrichedInventories,
};