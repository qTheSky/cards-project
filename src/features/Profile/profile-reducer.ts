import {createSlice} from '@reduxjs/toolkit';
import {UserDataType} from 'api/authApi';
import {login, logout} from 'features/Auth/auth-reducer';
import {initializeApp} from 'app/app-reducer';


export const slice = createSlice({
		name: 'profile',
		initialState: {
				profile: {} as UserDataType,
		},
		reducers: {},
		extraReducers: builder => {
				builder
						.addCase(login.fulfilled, (state, action) => {
								state.profile = action.payload
						})
						.addCase(logout.fulfilled, (state) => {
								state.profile = slice.getInitialState().profile
						})
						.addCase(initializeApp.fulfilled, (state, action) => {
								state.profile = action.payload
						})
		}
})

export const profileReducer = slice.reducer


