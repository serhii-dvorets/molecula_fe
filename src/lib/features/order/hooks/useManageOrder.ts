import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@/lib/toast/showToast";
import { closeModal, setModalErrors } from "@/lib/store/slices/modalSlice";
import { CreateOrderBody, UpdateOrderBody } from "@/api/Order/types";

export function useManageOrder() {
	const dispatch = useDispatch();

	return {
		handleCreateOrder: useMutation({
			mutationFn: (data: CreateOrderBody) => apiSingleton.order.create(data),
			onSuccess: () =>  {
				showToast('success', 'Замовлення успішно створене')
				dispatch(closeModal('orderCreateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleCreateOrder error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'tariffUpdateModal', errors: error }))
				}			
			}
			
		}),
		handleUpdateOrder: useMutation({
			mutationFn: (data: UpdateOrderBody) => apiSingleton.order.update(data.id, { ...data }),
			onSuccess: () =>  {
				showToast('success', 'Замовлення успішно оновлено')
				dispatch(closeModal('orderUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleUpdateOrder error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'tariffUpdateModal', errors: error }))
				}			
			}
			
		})
	}
}