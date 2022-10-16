import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, LoginDataType, RegisterDataType} from 'api/authApi';
import {initializeApp} from 'app/app-reducer';
import {appActions} from 'common/CommonActions/App';
import {handleErrors} from 'utils/error-utils';

export const register = createAsyncThunk('auth/register',
		async (param: RegisterDataType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await authAPI.register(param)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e,thunkAPI)
				}
		})
export const login = createAsyncThunk('auth/login',
		async (param: LoginDataType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						const {data} = await authAPI.login(param)
						thunkAPI.dispatch(appActions.setIsLoading(false))
						return data
				} catch (e) {
						return handleErrors(e,thunkAPI)
				}
		})
export const logout = createAsyncThunk('auth/logout',
		async (_, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await authAPI.logout()
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e,thunkAPI)
				}
		})
export const forgotPassword = createAsyncThunk('auth/forgotPass',
		async (email: string, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await authAPI.forgotPass(email)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e,thunkAPI)
				}
		})
export const createNewPassword = createAsyncThunk('auth/createNewPassword',
		async (param: { password: string, resetPasswordToken: string }, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await authAPI.createNewPassword(param)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e,thunkAPI)
				}
		})

export const slice = createSlice({
		name: 'auth',
		initialState: {
				isLoggedIn: false,
				isRegisteredSuccess: false,
				isNewPassRequestSuccess: false,
				isNewPasswordCreated: false,
		},
		reducers: {
				setNewPassRequest(state, action: PayloadAction<boolean>) {
						state.isNewPassRequestSuccess = action.payload
				},
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
								state.isNewPassRequestSuccess = true
						})
						.addCase(createNewPassword.fulfilled, (state) => {
								state.isNewPasswordCreated = true
						})
						.addCase(initializeApp.fulfilled, (state) => {
								state.isLoggedIn = true
						})

		}
})
export const {setNewPassRequest} = slice.actions
export const authReducer = slice.reducer


