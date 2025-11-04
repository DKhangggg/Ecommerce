export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderRow {
    id: string;
    orderId: string;
    productName: string;
    customerName: string;
    amount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderStats {
    totalOrders: number;
    newOrders: number;
    completedOrders: number;
    cancelledOrders: number;
}

export interface CreateOrderPayload {
    productId: string;
    customerId: string;
    quantity: number;
    amount: number;
}

export interface OrderResponse {
    id: string;
    orderId: string;
    productName: string;
    customerName: string;
    amount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

