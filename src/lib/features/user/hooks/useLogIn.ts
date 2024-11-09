import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { setUserErrors, setUserProfile } from "../userSlice";
import { LogInBody } from "@/api/Auth/types";
import { useDispatch } from "react-redux";
import { redirect } from 'next/navigation'

export function useLogIn() {
	const dispatch = useDispatch();

	return {
		handleLogIn: useMutation({
			mutationFn: (data: LogInBody) => apiSingleton.auth.logIn(data),
			onSuccess: (data) =>  {
				dispatch(setUserProfile(data)),
				redirect('/')
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleLogIn error', error.message);
				}

				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setUserErrors(error))
				}			
			}
			
		})
	}
}