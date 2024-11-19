import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";

export function useGetTariffs() {
	return {
		handleGetOneTariff: useMutation({
			mutationFn: (id: string) => apiSingleton.tariff.getOne(id),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetOneTariff error', error.message);
				}		
			}
		}),
		handleGetAllTariffs: useMutation({
			mutationFn: () => apiSingleton.tariff.getAll(),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetAllTariffs error', error.message);
				}		
			}
		}),
	}
}