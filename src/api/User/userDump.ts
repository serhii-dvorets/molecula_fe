import { UserCreateModalType, UserUpdateModalType } from "@/lib/features/modals/types";
import { CreateUserBody, UpdateUserBody, User } from "./types";

export const dumpCreateUser = (data: Omit<UserCreateModalType, 'type'>): CreateUserBody => {
	return {
		name: data.name,
		phoneNumber: data.phoneNumber,
		notes: data.notes,
		role: data.role,
		address: {
			city: data?.city,
			street: data?.city,
			building: data?.building,
			flat: data?.flat,
			entrance: data?.entrance,
			notes: data?.notes,
		}
	}
}

export const dumpUpdateUser = (data: Omit<UserUpdateModalType, 'type'>): UpdateUserBody => {
	return {
		id: data.id,
		name: data.name,
		phoneNumber: data.phoneNumber,
		notes: data?.notes,
		role: data?.role,
		address: {
			city: data?.city,
			street: data?.city,
			building: data?.building,
			flat: data?.flat,
			entrance: data?.entrance,
			notes: data?.notes,
		}
	}
}

export const dumpUserForModal = (data: User | undefined) => {
	return {
		name: data?.name,
		phoneNumber: data?.phoneNumber,
		notes: data?.notes,
		city: data?.address?.city,
		street: data?.address?.street,
		building: data?.address?.building,
		flat: data?.address?.flat,
		entrance: data?.address?.entrance,
		addressNotes: data?.address?.notes,
		role: data?.role.name
	}
}
