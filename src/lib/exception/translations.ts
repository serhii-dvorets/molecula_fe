export const EXCEPTION_TRANSLATIONS: Record<string, (field?: string) => string> = {
	['is not unique']: (field) => `${field} з таким значенням вже існує`,
	['should not be empty']: () => `Поле не може бути пустим`,
	['must be a valid phone number']: () => 'Формат телефону: +380*********',
	['is not correct']: (field) => `${field} не вірний`,
	['must match password']: () => 'Паролі не співпадають',
	['must be longer than or equal to 6 characters']: () => 'Має бути не менше 6 знаків',
	['must be a number string']: () => 'Має бути число'
}

export const FIELDS_TRANSLATIONS: Record<string, string> = {
	password: 'Пароль',
	name: `Ім'я`,
	phoneNumber: `Номер телефону`,
}