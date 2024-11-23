import { RootState } from "../store";

export const tariffUpdateModalSelectors = {
	state: (state: RootState) => state.modal?.tariffUpdateModal,
	refetch: (state: RootState) => state.modal?.tariffUpdateModal?.refetch,
	errors: (state: RootState) => state.modal?.tariffUpdateModal?.errors
};

export const tariffDeleteModalSelectors = {
	state: (state: RootState) => state.modal?.tariffDeleteModal,
	refetch: (state: RootState) => state.modal?.tariffDeleteModal?.refetch,
};

export const userUpdateModalSelectors = {
	state: (state: RootState) => state.modal?.userUpdateModal,
	refetch: (state: RootState) => state.modal?.userUpdateModal?.refetch,
	errors: (state: RootState) => state.modal?.userUpdateModal?.errors
};

export const userDeleteModalSelectors = {
	state: (state: RootState) => state.modal?.userDeleteModal,
	refetch: (state: RootState) => state.modal?.userDeleteModal?.refetch,
};

export const orderCreateModalSelectors = {
	state: (state: RootState) => state.modal?.orderCreateModal,
	refetch: (state: RootState) => state.modal?.orderCreateModal?.refetch,
	errors: (state: RootState) => state.modal?.orderCreateModal?.errors
};

export const orderUpdateModalSelectors = {
	state: (state: RootState) => state.modal?.orderUpdateModal,
	refetch: (state: RootState) => state.modal?.orderUpdateModal?.refetch,
};
