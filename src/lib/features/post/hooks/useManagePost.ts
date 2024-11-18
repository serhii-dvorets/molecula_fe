import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "@/lib/toast/showToast";
import { closeModal, setModalErrors } from "@/lib/store/slices/modalSlice";
import { CreatePostBody, UpdatePostBody } from "@/api/Post/types";

export function useManagePost() {
	const dispatch = useDispatch();

	return {
		handleCreatePost: useMutation({
			mutationFn: (data: CreatePostBody) => apiSingleton.post.create(data),
			onSuccess: () =>  {
				showToast('success', 'Пост успішно створений')
				dispatch(closeModal('stationUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleCreatePost error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'stationUpdateModal', errors: error }))
				}			
			}
			
		}),
		handleUpdatePost: useMutation({
			mutationFn: (data: UpdatePostBody) => apiSingleton.post.update(data.id, { ...data }),
			onSuccess: () =>  {
				showToast('success', 'Пост успішно оновлений')
				dispatch(closeModal('stationUpdateModal'))
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleUpdatePost error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setModalErrors({ modalName: 'stationUpdateModal', errors: error }))
				}			
			}
			
		})
	}
}