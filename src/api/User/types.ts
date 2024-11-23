import { Role } from "../Role/types";

export type CreateUserBody = {
    name: string;
    phoneNumber: string | null;
    notes?: string | null;
    role: string;
    address?: {
        city?: string | null;
        street?: string | null;
        building?: string | null;
        flat?: string | null;
        entrance?: string | null;
        notes?: string | null;
    }
}

export type UpdateUserBody = {
    id: string;
    name?: string;
    phoneNumber?: string | null;
    notes?: string | null;
    role?: string | null;
    address?: {
        city?: string | null;
        street?: string | null;
        building?: string | null;
        flat?: string | null;
        entrance?: string | null;
        notes?: string | null;
    }
}

export type User = {
    id: string;
    name: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    notes?: string;
    role: Role;
    address?: Address
}

export type Address = {
    city?: string,
    street?: string,
    building?: string,
    entrance?: string,
    flat?: string,
    notes?: string,
}
