export type CreateOrderItemBody = {
    customerId: string;
    status?: OrderItemStatus
}

export type UpdateOrderItemBody = {
    customerId?: string;
    status?: OrderItemStatus
}

export type OrderItem = {
    type: OrderItemType;
    quantity?: string;
    price?: string;
    name?: string;
}

type OrderItemStatus = 'pending' | 'accepted' | 'in-progress' | 'ready' | 'closed' | 'reopened'
export type OrderItemType = 'carpet' | 'furniture' | 'delivery' | 'custom'
