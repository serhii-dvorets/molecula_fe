import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";

export function useGetStations() {
	return {
		handleGetOneStation: useMutation({
			mutationFn: (id: string) => apiSingleton.station.getOne(id),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetOneStation error', error.message);
				}		
			}
		}),
		handleGetAllStations: useMutation({
			mutationFn: () => apiSingleton.station.getAll(),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetAllStations error', error.message);
				}		
			}
		}),
	}
}