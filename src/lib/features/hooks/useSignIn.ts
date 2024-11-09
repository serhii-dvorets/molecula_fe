import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";
import { setUserErrors, setUserProfile } from "../userSlice";
import { SignInBody } from "@/api/Auth/types";
import { useDispatch } from "react-redux";

export type SignInCredentials = {
    name: string,
    phoneNumber: string,
    password: string
}

export function useSignIn() {
	const dispatch = useDispatch();

	return {
		handleSingIn: useMutation({
			mutationFn: (data: SignInBody) => apiSingleton.auth.signIn(data),
			onSuccess: (data) =>  dispatch(setUserProfile(data)),
			onError: (error: any) => {
				if (error?.statusCode === 400 && error?.code && error?.fields){
					dispatch(setUserErrors(error))
				}			
			}
			
		})
	}
}