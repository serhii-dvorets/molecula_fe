import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ValidationException } from '../../exception/types'
import { formatException } from '../../exception/utils'
import { User } from '@/api/User/types'

export interface UserState {
  profile: User | null,
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
		setUserProfile: (state, action: PayloadAction<User>) => {
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
	errors: (state: RootState) => state.user.errors,
	role: (state: RootState) => state.user.profile?.role.name
};

export const { setUserProfile, setUserErrors, clearUserProfile, clearUserErrors } = userSlice.actions

export default userSlice.reducer