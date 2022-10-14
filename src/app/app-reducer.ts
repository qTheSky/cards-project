import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI} from 'api/authApi';
import {appActions} from 'features/CommonActions/App';

export const initializeApp = createAsyncThunk('app/initializeApp',
		async (_, thunkAPI) => {
				try {
						const {data} = await authAPI.me()
						return data
				} catch (e) {
						return thunkAPI.rejectWithValue(null)
				}
		})

export const slice = createSlice({
		name: 'app',
		initialState: {
				isInitialized: false,
				isLoading: false,
				error: '',
		},
		reducers: {},
		extraReducers: builder => {
				builder
						.addCase(initializeApp.fulfilled, (state, action) => {
								state.isInitialized = true
						})
						.addCase(initializeApp.rejected, (state) => {
								state.isInitialized = true
						})
						.addCase(appActions.setIsLoading, (state, action) => {
								state.isLoading = action.payload
						})
						.addCase(appActions.setAppError, (state, action) => {
								state.error = action.payload
						})
		}
})

export const appReducer = slice.reducer


