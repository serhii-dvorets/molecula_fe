import apiSingleton from "@/api/ApiFactory";
import { closeModal } from "@/lib/store/slices/modalSlice";
import { showToast } from "@/lib/toast/showToast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function useDeleteUser() {
	const dispatch = useDispatch()
	return {
		handleDeleteUser: useMutation({
			mutationFn: (id: string) => apiSingleton.user.delete(id),
			onSuccess() {
				showToast('success', 'Користувач успішно видалений')
				dispatch(closeModal('userDeleteModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleDeleteUser error', error.message);
				}		
			}
		})
	}
}