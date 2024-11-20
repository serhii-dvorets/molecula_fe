import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";

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
			mutationFn: () => apiSingleton.user.getAll(),
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