export interface Product {
    id: number;
    name: string;
    price: string;
    imageSrc: string;
    color?: string;
    href?: string;
    imageAlt?: string;
}

export type CreateProductPayload = {
    name: string;
    description: string;
    price: number;
    stock: number;
    categories?: string[];
    location?: string;
    imageUrls?: string[];
    attributes?: { name: string; value: string }[];
    sellerId?: string | number;
};

export type ProductRow = {
    id: string;
    quantity: number;
    location: string;
    status: ProductRowStatus; // <-- SỬ DỤNG TYPE MỚI
    name: string;
    price: number;
    imageUrls: string[];
    description: string;
    categories: string[];
    attributes: { name: string; value: string }[];
    reserved: number;
    updatedAt: Date | string;
    createdAt: Date | string;
};
export type ProductRowStatus =
    | "In Stock"
    | "Out of Stock"
    | "Low Stock"
    | "Discontinued"
    | "Reserved";