import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'
import modalSlice from './slices/modalSlice';

const rootReducer = combineReducers({
	user: userSlice,
	modal: modalSlice
})

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;