import apiSingleton from "@/api/ApiFactory";
import { closeModal } from "@/lib/store/slices/modalSlice";
import { showToast } from "@/lib/toast/showToast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function useDeleteStation() {
	const dispatch = useDispatch()
	return {
		handleDeleteStation: useMutation({
			mutationFn: (id: string) => apiSingleton.station.delete(id),
			onSuccess() {
				showToast('success', 'Станція успішно видалена')
				dispatch(closeModal('stationDeleteModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleDeleteStation error', error.message);
				}		
			}
		})
	}
}