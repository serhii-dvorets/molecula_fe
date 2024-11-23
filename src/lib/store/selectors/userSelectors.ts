import { RootState } from "../store";

export const userSelectors = {
	isAuthenticated: (state: RootState) => state.user.profile?.phoneNumberConfirmed,
	user: (state: RootState) => state.user.profile,
	name: (state: RootState) => state.user.profile?.name,
	errors: (state: RootState) => state.user.errors,
	role: (state: RootState) => state.user.profile?.role.name
};
