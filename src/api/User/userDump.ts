import { UserCreateModalType, UserUpdateModalType } from "@/lib/features/modals/types";
import { CreateUserBody, UpdateUserBody } from "./types";

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
