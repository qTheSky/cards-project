import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, LoginDataType, RegisterDataType} from 'api/authApi';
import {PATH} from 'app/RouteVariables';
import {initializeApp} from 'app/app-reducer';

export const register = createAsyncThunk('auth/register',
		async (param: RegisterDataType, thunkAPI) => {
				try {
						await authAPI.register(param)
				} catch (e) {
						return thunkAPI.rejectWithValue(null)
				}
		})
export const login = createAsyncThunk('auth/login',
		async (param: LoginDataType, thunkAPI) => {
				try {
						const {data} = await authAPI.login(param)
						return data
				} catch (e) {
						return thunkAPI.rejectWithValue(null)
				}
		})
export const logout = createAsyncThunk('auth/logout',
		async (_, thunkAPI) => {
				try {
						await authAPI.logout()
				} catch (e) {
						return thunkAPI.rejectWithValue(null)
				}
		})
export const forgotPassword = createAsyncThunk('auth/forgotPass',
		async (email: string, thunkAPI) => {
				try {
						await authAPI.forgotPass(email)
				} catch (e) {
						return thunkAPI.rejectWithValue(null)
				}
		})
export const createNewPassword = createAsyncThunk('auth/createNewPassword',
		async (param: { password: string, resetPasswordToken: string }, thunkAPI) => {
				try {
						await authAPI.createNewPassword(param)
				} catch (e) {
						return thunkAPI.rejectWithValue(null)
				}
		})

export const slice = createSlice({
		name: 'auth',
		initialState: {
				isLoggedIn: false,
				isRegisteredSuccess: false,
				isRequestSuccess: false,
		},
		reducers: {
				setIsLoggedIn(state, action: PayloadAction) {
				}
		},
		extraReducers: builder => {
				builder
						.addCase(register.fulfilled, (state) => {
								state.isRegisteredSuccess = true
						})
						.addCase(login.fulfilled, (state) => {
								state.isLoggedIn = true
						})
						.addCase(logout.fulfilled, (state) => {
								state.isLoggedIn = false
						})
						.addCase(forgotPassword.fulfilled, (state) => {
								state.isRequestSuccess = true
						})
						.addCase(createNewPassword.fulfilled, (state) => {
								window.location.href = PATH.login
						})
						.addCase(initializeApp.fulfilled, (state) => {
								state.isLoggedIn = true
						})

		}
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions


