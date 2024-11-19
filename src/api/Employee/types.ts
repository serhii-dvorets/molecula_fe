import { Post } from "../Post/types";

export type CreateEmployeeBody = {
    name: string;
    location: string;
}

export type UpdateEmployeeBody = {
    id: string;
    name?: string;
    location?: string;
    posts?: Post[] | [],
    employeeIds?: string[] | []
}

export type Employee = {
    id: string;
    name: string;
    location: string;
    averageRating: string;
}
