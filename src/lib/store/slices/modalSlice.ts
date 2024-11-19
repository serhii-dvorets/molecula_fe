import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ModalData, ModalName } from '@/lib/features/modals/types'
import { ValidationException } from '@/lib/exception/types';
import { formatException } from '@/lib/exception/utils';
import { RootState } from '../store';

export type ModalState = {
  [modalName: string]: {
    isOpen: boolean;
    data: ModalData | null;
	errors: Record<string, string>
	refetch: boolean
  },
}

const initialState: ModalState = {}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<{modalName: ModalName, data: ModalData | null}>) => {
			const { modalName, data } = action.payload;

			state[modalName] = {
				isOpen: true,
				data,
				errors: {},
				refetch: false
			};
		},
		closeModal: (state, action: PayloadAction<ModalName>) => {
			const modalName = action.payload;

			if (state[modalName]) {
				state[modalName].isOpen = false;
				state[modalName].data = null;
				state[modalName].errors = {};
				state[modalName].refetch = true;
			}
		},
		setModalErrors: (state, action: PayloadAction<{modalName: ModalName, errors: ValidationException}>) => {
			const { modalName, errors } = action.payload

			state[modalName].errors = formatException(errors)
		},
		clearModalErrors: (state, action: PayloadAction<ModalName>) => {
			state[action.payload].errors = {}
		}
	},
})

export const tariffUpdateModalSelectors = {
	state: (state: RootState) => state.modal?.tariffUpdateModal,
	refetch: (state: RootState) => state.modal?.tariffUpdateModal?.refetch,
	errors: (state: RootState) => state.modal?.tariffUpdateModal?.errors
};

export const tariffDeleteModalSelectors = {
	state: (state: RootState) => state.modal?.tariffDeleteModal,
	refetch: (state: RootState) => state.modal?.tariffDeleteModal?.refetch,
};

export const { openModal, closeModal, setModalErrors, clearModalErrors } = modalSlice.actions

export default modalSlice.reducer