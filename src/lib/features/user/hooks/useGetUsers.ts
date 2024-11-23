import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";

type GetAllUsersParams = {
	roles: string[]
}

export function useGetUsers() {
	return {
		handleGetOneUser: useMutation({
			mutationFn: (id: string) => apiSingleton.user.getOne(id),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetOneUser error', error.message);
				}		
			}
		}),
		handleGetAllUsers: useMutation({
			mutationFn: (params: GetAllUsersParams) => apiSingleton.user.getAll(params),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetAllUsers error', error.message);
				}		
			}
		}),
	}
}