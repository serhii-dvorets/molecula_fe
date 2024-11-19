import { Post } from "../Tariff/types";

export type CreateOrderBody = {
    name: string;
    location: string;
}

export type UpdateOrderBody = {
    id: string;
    name?: string;
    location?: string;
    posts?: Post[] | [],
    employeeIds?: string[] | []
}

export type Order = {
    id: string;
    name: string;
    location: string;
    averageRating: string;
}
