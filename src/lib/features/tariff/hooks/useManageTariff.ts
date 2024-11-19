import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { CreateTariffBody, UpdateTariffBody } from "@/api/Tariff/types";
import { showToast } from "@/lib/toast/showToast";
import { closeModal, setModalErrors } from "@/lib/store/slices/modalSlice";

export function useManageTariff() {
	const dispatch = useDispatch();

	return {
		handleCreateTariff: useMutation({
			mutationFn: (data: CreateTariffBody) => apiSingleton.tariff.create(data),
			onSuccess: () =>  {
				showToast('success', 'Тариф успішно створений')
				dispatch(closeModal('tariffUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleCreateTariff error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'tariffUpdateModal', errors: error }))
				}			
			}
			
		}),
		handleUpdateTariff: useMutation({
			mutationFn: (data: UpdateTariffBody) => apiSingleton.tariff.update(data.id, { ...data }),
			onSuccess: () =>  {
				showToast('success', 'Тариф успішно оновлено')
				dispatch(closeModal('tariffUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleUpdateTariff error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'tariffUpdateModal', errors: error }))
				}			
			}
			
		})
	}
}