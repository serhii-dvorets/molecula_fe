import { EXCEPTION_TRANSLATIONS } from "./translations";
import { ValidationException } from "./types";

export const formatException = (exception: ValidationException) => {
	if (exception.code === 'VALIDATION_ERROR') {
		return exception.fields.reduce((acc: Record<string, string>, error) => {
			const { field, messages } = error
			acc[field] = getTranslatedValidationError(field, messages)

			return acc
		}, {})
	}

	if (exception.code === 'NOT_UNIQUE') {
		const { field, messages } = exception.fields
		return {
			[exception.fields.field]: getTranslatedValidationError(field, messages)
		}
	}

	return {
		general: 'невідома помилка, зв\'яжіться з адміністратором сайту'
	}
}

export const getTranslatedValidationError = (field: string, message: string | string[]) => {
	if (Array.isArray(message)) {
		return message.reduce((acc, m) => {
			const code = m.split(' ').slice(1).toString().replaceAll(',', ' ')

			if (EXCEPTION_TRANSLATIONS[code]) {
				acc += `${acc.length ? ', ' : ''} ${EXCEPTION_TRANSLATIONS[code]()}`
			} else {
				acc += `${acc.length ? ', ' : ''} ${m}`
			}
			
			return acc
		}, '')
	}
	
	const code = message.split(' ').slice(1).toString().replaceAll(',', ' ')

	if (EXCEPTION_TRANSLATIONS[code]) {
		return EXCEPTION_TRANSLATIONS[code](field)
	}

	return message
}