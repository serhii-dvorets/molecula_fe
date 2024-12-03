export type CreateOrderItemBody = {
    customerId: string;
    status?: OrderItemStatus
}

export type UpdateOrderItemBody = {
    id: string;
    status?: OrderItemStatus;
    type?: OrderItemType;
    height?: string | null;
    width?: string | null;
    tariff?: string | null;
    quantity?: string;
    price?: string;
    name?: string;
    createdAt?: Date
    updatedAt?: Date
}

export type OrderItem = {
    id?: string;
    status?: OrderItemStatus;
    type?: OrderItemType;
    height?: string | null;
    width?: string | null;
    tariff?: string | null;
    quantity?: string;
    price?: string;
    name?: string;
    createdAt?: Date
    updatedAt?: Date
}

type OrderItemStatus = 'pending' | 'accepted' | 'in-progress' | 'ready' | 'closed' | 'reopened'
export type OrderItemType = 'carpet' | 'furniture' | 'delivery' | 'custom'
