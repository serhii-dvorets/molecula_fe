import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";

export function useGetOrders() {
	return {
		handleGetOneOrder: useMutation({
			mutationFn: (id: string) => apiSingleton.order.getOne(id),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetOneOrder error', error.message);
				}		
			}
		}),
		handleGetAllOrders: useMutation({
			mutationFn: () => apiSingleton.order.getAll(),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetAllOrders error', error.message);
				}		
			}
		}),
	}
}