import { User } from "../User/types";

export type CreateOrderBody = {
    customerId: string;
}

export type UpdateOrderBody = {
    id: string;
}

export type Order = {
    id: string;
    customer: User;
}
