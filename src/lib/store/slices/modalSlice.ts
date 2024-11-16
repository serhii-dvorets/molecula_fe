import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ModalData, ModalName } from '@/lib/features/modals/types'

export interface ModalState {
  [modalName: string]: {
    isOpen: boolean;
    data: ModalData | null;
  };
}

const initialState: ModalState = {}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<{modalName: ModalName, data: ModalData}>) => {
			console.log('PAYLOAD', action.payload);
			const { modalName, data } = action.payload;
			
			state[modalName] = {
				isOpen: true,
				data,
			};
		},
		closeModal: (state, action: PayloadAction<ModalName>) => {
			const modalName = action.payload;
			if (state[modalName]) {
				state[modalName].isOpen = false;
				state[modalName].data = null;
			}
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer