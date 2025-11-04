import type {BackendStatus} from "../services/productService.ts";

export type EnrichedInventoryItem = {
    reserved?: number;
    productId: string;
    quantity: number;
    location?: string;
    status: BackendStatus;

    productName: string;
    productPrice: number;
    productImageUrls?: string[];
    productDescription?: string;
    productCategories?: string[];
    productAttributes?: { name: string; value: string }[];
};