export type CreateStationBody = {
    name: string;
    location: string;
    postIds: string[] | [],
    employeeIds: string[] | []
}

export type UpdateStationBody = {
    id: string;
    name?: string;
    location?: string;
    postIds: string[] | [],
    employeeIds: string[] | []
}

export type Station = {
    id: string;
    name: string;
    location: string;
    averageRating: string;
}