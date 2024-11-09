import { HttpStatusCode } from "axios"

export type ValidationException = {
    statusCode: HttpStatusCode,
    code: "NOT_UNIQUE",
    fields: ErrorFields
} | {
    statusCode: HttpStatusCode,
    code: "VALIDATION_ERROR",
    fields: ErrorFields[]
}

type ErrorFields = {
    field: string,
    messages: string | string[],
    value?: string
}
