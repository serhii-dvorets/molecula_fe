import apiSingleton from "@/api/ApiFactory";
import { closeModal } from "@/lib/store/slices/modalSlice";
import { showToast } from "@/lib/toast/showToast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function useDeleteTariff() {
	const dispatch = useDispatch()
	return {
		handleDeleteTariff: useMutation({
			mutationFn: (id: string) => apiSingleton.tariff.delete(id),
			onSuccess() {
				showToast('success', 'Тариф успішно видалений')
				dispatch(closeModal('tariffDeleteModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleDeleteTariff error', error.message);
				}		
			}
		})
	}
}