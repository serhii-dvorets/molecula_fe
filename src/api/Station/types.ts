import { Post } from "../Post/types";

export type CreateStationBody = {
    name: string;
    location: string;
}

export type UpdateStationBody = {
    id: string;
    name?: string;
    location?: string;
    posts?: Post[] | [],
    employeeIds?: string[] | []
}

export type Station = {
    id: string;
    name: string;
    location: string;
    averageRating: string;
}
