import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@/lib/toast/showToast";
import { closeModal, setModalErrors } from "@/lib/store/slices/modalSlice";
import { CreateUserBody, UpdateUserBody } from "@/api/User/types";

export function useManageUser() {
	const dispatch = useDispatch();

	return {
		handleCreateUser: useMutation({
			mutationFn: (data: CreateUserBody) => apiSingleton.user.create(data),
			onSuccess: () =>  {
				showToast('success', 'Користувач успішно створений')
				dispatch(closeModal('userUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleCreateUser error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'userUpdateModal', errors: error }))
				}			
			}
			
		}),
		handleUpdateUser: useMutation({
			mutationFn: (data: UpdateUserBody) => apiSingleton.user.update(data.id, { ...data }),
			onSuccess: () =>  {
				showToast('success', 'Користувач успішно оновлений')
				dispatch(closeModal('userUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleUpdateUser error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'userUpdateModal', errors: error }))
				}			
			}
			
		})
	}
}