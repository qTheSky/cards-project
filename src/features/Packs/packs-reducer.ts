import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetPackResponse, packsAPI, packsSearchParams, PackType} from 'api/packsApi';
import {AppRootStateType} from 'app/store';


export const fetchPacks = createAsyncThunk('packs/fetchPacks',
		async (_, thunkAPI) => {
				const state = thunkAPI.getState() as AppRootStateType
				const {data} = await packsAPI.getPacks(state.packs.searchParams)
				return data
		})

export const slice = createSlice({
		name: 'packs',
		initialState: {
				packsState: {
						cardPacks: [] as PackType[],
				} as GetPackResponse,
				searchParams: {
						user_id: '',
						page: 1,
						sortPacks: '0updated',
						pageCount: 10,
						packName: '',
						min: 0,
				} as packsSearchParams
		},
		reducers: {},
		extraReducers: builder => {
				builder
						.addCase(fetchPacks.fulfilled, (state, action) => {
								state.packsState = action.payload
						})
		}
})

export const packReducer = slice.reducer


