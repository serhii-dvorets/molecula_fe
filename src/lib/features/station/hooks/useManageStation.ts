import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { CreateStationBody, UpdateStationBody } from "@/api/Station/types";
import { showToast } from "@/lib/toast/showToast";
import { closeModal, setModalErrors } from "@/lib/store/slices/modalSlice";

export function useManageStation() {
	const dispatch = useDispatch();

	return {
		handleCreateStation: useMutation({
			mutationFn: (data: CreateStationBody) => apiSingleton.station.create(data),
			onSuccess: () =>  {
				showToast('success', 'Станція успішно створена')
				dispatch(closeModal('stationUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleLogIn error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'stationUpdateModal', errors: error }))
				}			
			}
			
		}),
		handleUpdateStation: useMutation({
			mutationFn: (data: UpdateStationBody) => apiSingleton.station.update(data.id, { ...data }),
			onSuccess: () =>  {
				showToast('success', 'Станція успішно оновлена')
				dispatch(closeModal('stationUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleLogIn error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'stationUpdateModal', errors: error }))
				}			
			}
			
		})
	}
}