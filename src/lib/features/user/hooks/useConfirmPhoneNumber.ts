import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { ConfirmCodeBody } from "@/api/Auth/types";
import { useDispatch } from "react-redux";
import { setUserErrors, setUserProfile } from "../../../store/slices/userSlice";
import { redirect } from 'next/navigation'
import { showToast } from "@/lib/toast/showToast";

export function useConfirmPhoneNumber() {
	const dispatch = useDispatch();

	return {
		handleConfirmPhoneNumber: useMutation({
			mutationFn: (data: ConfirmCodeBody) => apiSingleton.auth.confirmPhoneNumber(data),
			onSuccess: (data) =>  {
				console.log('handleConfirmPhoneNumber data', data);
				
				dispatch(setUserProfile(data));
				showToast("success", 'Ваш номер телефону підтверджено!')
				redirect('/change_password')
			},
			onError: (error: any) => {
				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setUserErrors(error))
				}			
			}
			
		})
	}
}