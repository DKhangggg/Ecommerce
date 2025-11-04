import type {OrderResponse, OrderRow, OrderStats, OrderStatus} from "../types/order.ts";

const mapBackendStatusToFrontendStatus = (backendStatus: string): OrderStatus => {
    switch (backendStatus.toUpperCase()) {
        case "PENDING":
            return "Pending";
        case "PROCESSING":
            return "Processing";
        case "SHIPPED":
            return "Shipped";
        case "DELIVERED":
            return "Delivered";
        case "CANCELLED":
            return "Cancelled";
        default:
            return "Pending";
    }
};

// Mock data for development
const mockOrders: OrderResponse[] = [
    {
        id: "1",
        orderId: "ORD-001",
        productName: "Laptop Dell XPS 15",
        customerName: "Nguyen Van A",
        amount: 1500.00,
        status: "DELIVERED",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "2",
        orderId: "ORD-002",
        productName: "iPhone 15 Pro Max",
        customerName: "Tran Thi B",
        amount: 1299.99,
        status: "SHIPPED",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "3",
        orderId: "ORD-003",
        productName: "Samsung Galaxy S24",
        customerName: "Le Van C",
        amount: 899.50,
        status: "PROCESSING",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "4",
        orderId: "ORD-004",
        productName: "MacBook Pro M3",
        customerName: "Pham Thi D",
        amount: 2499.00,
        status: "PENDING",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "5",
        orderId: "ORD-005",
        productName: "AirPods Pro 2",
        customerName: "Hoang Van E",
        amount: 249.99,
        status: "CANCELLED",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "6",
        orderId: "ORD-006",
        productName: "Sony WH-1000XM5",
        customerName: "Vu Thi F",
        amount: 399.99,
        status: "DELIVERED",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: "7",
        orderId: "ORD-007",
        productName: "iPad Air M2",
        customerName: "Dang Van G",
        amount: 699.00,
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export const orderService = {
    // Get all orders for the seller
    getAllOrders: async (): Promise<OrderResponse[]> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // TODO: Replace with actual API call
        // const response = await fetch('/api/orders', {
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //     }
        // });
        // return await response.json();

        return mockOrders;
    },

    // Get order statistics
    getOrderStats: async (): Promise<OrderStats> => {
        await new Promise(resolve => setTimeout(resolve, 300));

        const orders = mockOrders;

        return {
            totalOrders: orders.length,
            newOrders: orders.filter(o => o.status === 'PENDING').length,
            completedOrders: orders.filter(o => o.status === 'DELIVERED').length,
            cancelledOrders: orders.filter(o => o.status === 'CANCELLED').length,
        };
    },

    // Map API response to UI format
    mapOrdersToRows: (orders: OrderResponse[]): OrderRow[] => {
        return orders.map(order => ({
            id: order.id,
            orderId: order.orderId,
            productName: order.productName,
            customerName: order.customerName,
            amount: order.amount,
            status: mapBackendStatusToFrontendStatus(order.status),
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt),
        }));
    },

    // Update order status
    updateOrderStatus: async (orderId: string, status: OrderStatus): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        // TODO: Replace with actual API call
        console.log(`Updating order ${orderId} to status ${status}`);
    },

    // Delete/cancel order
    cancelOrder: async (orderId: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));

        // TODO: Replace with actual API call
        console.log(`Cancelling order ${orderId}`);
    },
};

