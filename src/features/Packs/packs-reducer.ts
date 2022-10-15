import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetPackResponse, packsAPI, packsSearchParams, PackType} from 'api/packsApi';
import {AppRootStateType} from 'app/store';
import {appActions} from "../CommonActions/App";
import {handleErrors} from "../../utils/error-utils";


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
    reducers: {
        setPackSearchParams(state, action) {
            state.searchParams = {...state.searchParams, ...action.payload}
        },
        clearPackSearchParams(state) {
            state.searchParams = {...slice.getInitialState().searchParams, max: state.packsState.maxCardsCount}
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPacks.fulfilled, (state, action) => {
                state.packsState = action.payload
            })
    }
})
export const {setPackSearchParams,clearPackSearchParams} = slice.actions
export const packReducer = slice.reducer


