import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { ValidationException } from '../../exception/types'
import { formatException } from '../../exception/utils'

export type UserProfile = {
	id: number,
	name: string,
	email: string | null,
	emailConfirmed: boolean,
	phoneNumber: string,
	phoneNumberConfirmed: boolean,
	role: {
		id: number,
		name: string,
		description: string,
		permissions: string[]
	}
}

export interface UserState {
  profile: UserProfile | null,
  errors: Record<string, string>
}

const initialState: UserState = {
	profile: null,
	errors: {}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserProfile: (state, action: PayloadAction<UserProfile>) => {
			state.profile = action.payload
		},
		setUserErrors: (state, action: PayloadAction<ValidationException>) => {
			state.errors = formatException(action.payload)
		},
		clearUserProfile: (state) => {state.profile = null},
		clearUserErrors: (state) => {state.errors = {}}
	},
})

export const userSelectors = {
	isAuthenticated: (state: RootState) => state.user.profile?.phoneNumberConfirmed,
	user: (state: RootState) => state.user.profile,
	name: (state: RootState) => state.user.profile?.name,
	errors: (state: RootState) => state.user.errors
};

export const { setUserProfile, setUserErrors, clearUserProfile, clearUserErrors } = userSlice.actions

export default userSlice.reducer