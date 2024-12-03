export type CreateRoleBody = {
    name: string;
    description: string;
}

export type UpdateRoleBody = {
    id: string;
    name?: string;
    description?: string;
}

export type Role = {
    id: string;
    name: string;
    description: string;
    permissions?: {id: string, name: string}[]
}
