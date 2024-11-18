export type CreatePostBody = {
    name: string;
    stationId: string;
}

export type UpdatePostBody = {
    id: string;
    name?: string;
}

export type Post = {
    id: string;
    name: string;
}