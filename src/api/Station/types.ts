export type CreateStationBody = {
    name: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}

export type UpdateStationBody = {
    phoneNumber: string,
    password: string,
}

export type Station = {
    id: string;
    name: string;
    location: string;
    averageRating: string;
}