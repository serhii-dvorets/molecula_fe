import { Role } from "../Role/types";

export type CreateUserBody = {
    name: string;
    email: string | null;
    phoneNumber: string | null;
}

export type UpdateUserBody = {
    id: string;
    name: string;
    email: string | null;
    phoneNumber: string | null;
}

export type User = {
    id: string;
    name: string;
    email: string | null;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    role: Role;
}
