export const EXCEPTION_TRANSLATIONS: Record<string, (field?: string) => string> = {
	['is not unique']: (field) => `${field} з таким значенням вже існує`,
	['should not be empty']: () => `Поле не може бути пустим`,
	['must be a valid phone number']: () => 'Має бути валідний номер телефону',
	['is not correct']: (field) => `${field} не вірний`
}

export const FIELDS_TRANSLATIONS: Record<string, string> = {
	password: 'Пароль',
	name: `Ім'я`,
	phoneNumber: `Номер телефону`,
}