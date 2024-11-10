import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { ChangePasswordBody } from "@/api/Auth/types";
import { useDispatch } from "react-redux";
import { setUserErrors, setUserProfile } from "../userSlice";
import { redirect } from 'next/navigation'
import { showToast } from "@/lib/toast/showToast";

export function useChangePassword() {
	const dispatch = useDispatch();

	return {
		handleChangePassword: useMutation({
			mutationFn: (data: ChangePasswordBody) => apiSingleton.auth.changePassword(data),
			onSuccess: (data) =>  {
				dispatch(setUserProfile(data));
				showToast("success", 'Пароль успішно змінено!')
				redirect('/')
			},
			onError: (error: any) => {
				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setUserErrors(error))
				}			
			}
			
		})
	}
}