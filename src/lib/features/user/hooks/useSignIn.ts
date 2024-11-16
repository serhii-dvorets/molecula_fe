import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { SignInBody } from "@/api/Auth/types";
import { useDispatch } from "react-redux";
import { setUserErrors, setUserProfile } from "../../../store/slices/userSlice";
import { redirect } from 'next/navigation'
import { showToast } from "@/lib/toast/showToast";

export function useSignIn() {
	const dispatch = useDispatch();

	return {
		handleSingIn: useMutation({
			mutationFn: (data: SignInBody) => apiSingleton.auth.signIn(data),
			onSuccess: (data) =>  {
				dispatch(setUserProfile(data));
				showToast("success", 'Your post has been published!')
				redirect('/')
			},
			onError: (error: any) => {
				if (error.code === 'USER_REGISTERED_WITHOUT_PASSWORD') {
					redirect('/set_password_code')
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setUserErrors(error))
				}			
			}
			
		})
	}
}