export type SignInBody = {
    name: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}

export type LogInBody = {
    phoneNumber: string,
    password: string,
}

export type ConfirmCodeBody = {
    code: string,
}

export type ChangePasswordBody = {
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}