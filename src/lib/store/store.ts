import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'
import modalSlice from './slices/modalSlice';
import loadingSlice from './slices/loadingSlice';

const rootReducer = combineReducers({
	user: userSlice,
	modal: modalSlice,
	loading: loadingSlice,
})

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;