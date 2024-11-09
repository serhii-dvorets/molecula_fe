export type SignInBody = {
    name: string,
    phoneNumber: string,
    password: string,
}

export type LogInBody = {
    phoneNumber: string,
    password: string,
}