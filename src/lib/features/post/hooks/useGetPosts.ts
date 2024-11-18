import apiSingleton from "@/api/ApiFactory";
import { useMutation } from "@tanstack/react-query";

export function useGetPosts() {
	return {
		handleGetOnePost: useMutation({
			mutationFn: (id: string) => apiSingleton.post.getOne(id),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetOnePost error', error.message);
				}		
			}
		}),
		handleGetAllPosts: useMutation({
			mutationFn: () => apiSingleton.post.getAll(),
			onSuccess(data) {
				return data
			},
			onError: (error: any) => {
				if (error?.message) {
					// TODO ShowToast 
					console.log('handleGetAllPosts error', error.message);
				}		
			}
		}),
	}
}