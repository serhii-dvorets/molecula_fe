import { OrderItem } from "../OrderItem/types";
import { User } from "../User/types";

export type CreateOrderBody = {
    customerId: string;
    status?: OrderStatus
}

export type UpdateOrderBody = {
    id: string;
    customerId?: string;
    status?: OrderStatus
    orderItems?: OrderItem[]
}

export type Order = {
    id: string;
    status: OrderStatus;
    customer: User;
    deliveryDate: string | null;
    pickupDate: string | null;
    selfPickup: boolean;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'in-progress' | 'ready' | 'customer-notified' | 'closed' | 'reopened'


