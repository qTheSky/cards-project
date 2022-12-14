import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CreatePackDataType, EditPackType, GetPackResponse, packsAPI, PacksSearchParams, PackType} from 'api/packsApi';
import {AppRootStateType} from 'app/store';
import {appActions} from 'common/CommonActions/App';
import {handleErrors} from 'utils/error-utils';


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
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const deletePack = createAsyncThunk('packs/deletePack',
		async (packId: string, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await packsAPI.deletePack(packId)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const editPack = createAsyncThunk('packs/editPack',
		async (param: EditPackType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await packsAPI.editPack(param)
						thunkAPI.dispatch(appActions.setIsLoading(false))
						return param.name
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
            state.searchParams = {...slice.getInitialState().searchParams}
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