import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {authAPI} from 'api/authApi';

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
		}
})

export const appReducer = slice.reducer


