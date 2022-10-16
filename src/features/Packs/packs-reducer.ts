import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CreatePackDataType, GetPackResponse, packsAPI, PacksSearchParams, PackType} from 'api/packsApi';
import {AppRootStateType} from 'app/store';
import {appActions} from '../CommonActions/App';
import {handleErrors} from '../../utils/error-utils';


export const fetchPacks = createAsyncThunk('packs/fetchPacks',
		async (_, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						const state = thunkAPI.getState() as AppRootStateType
						const {data} = await packsAPI.getPacks(state.packs.searchParams)
						thunkAPI.dispatch(appActions.setIsLoading(false))
						return data
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const createPack = createAsyncThunk('packs/createNewPack',
		async (param: CreatePackDataType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await packsAPI.createPack(param)
						thunkAPI.dispatch(fetchPacks())
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const deletePack = createAsyncThunk('packs/deletePack',
		async (packId: string, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await packsAPI.deletePack(packId)
						thunkAPI.dispatch(fetchPacks())
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})

export const slice = createSlice({
		name: 'packs',
		initialState: {
				packsState: {
						cardPacks: [] as PackType[],
				} as GetPackResponse,
				searchParams: {
						page: 1,
						pageCount: 10,
						max: 0,
						min: 0,
						packName: '',
						user_id: '',
						sortPacks: '0updated',
				} as PacksSearchParams,
		},
		reducers: {
				setPackSearchParams(state, action: PayloadAction<SetPackSearchParamsType>) {
						state.searchParams = {...state.searchParams, ...action.payload}
				},
				clearPackSearchParams(state) {
						state.searchParams = {...slice.getInitialState().searchParams, max: state.packsState.maxCardsCount}
				},
		},
		extraReducers: builder => {
				builder
						.addCase(fetchPacks.fulfilled, (state, action: PayloadAction<GetPackResponse>) => {
								state.packsState = action.payload
						})
		}
})
export const {setPackSearchParams, clearPackSearchParams} = slice.actions
export const packReducer = slice.reducer


export type SetPackSearchParamsType = {
		packName?: string
		min?: number
		max?: number
		sortPacks?: string
		page?: number
		pageCount?: number
		user_id?: string
}