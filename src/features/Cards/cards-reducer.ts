import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'common/CommonActions/App';
import {cardsAPI, CardType, CardsSearchParams, GetCardsResponse, CreateCardType, EditCardType} from 'api/cardsApi';
import {AppRootStateType} from 'app/store';
import {handleErrors} from 'utils/error-utils';
import {PacksSearchParams} from 'api/packsApi';


export const fetchCards = createAsyncThunk('cards/fetchCards',
		async (packId: string, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						const state = thunkAPI.getState() as AppRootStateType
						const {data} = await cardsAPI.getCards({...state.cards.searchParams, cardsPack_id: packId})
						thunkAPI.dispatch(appActions.setIsLoading(false))
						return data
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const createCard = createAsyncThunk('cards/createCard',
		async (params: CreateCardType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await cardsAPI.createCard(params)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const deleteCard = createAsyncThunk('cards/deleteCard',
		async (cardId: string, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await cardsAPI.deleteCard(cardId)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})
export const editCard = createAsyncThunk('cards/editCard',
		async (params: EditCardType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						await cardsAPI.editCard(params)
						thunkAPI.dispatch(appActions.setIsLoading(false))
				} catch (e) {
						return handleErrors(e, thunkAPI)
				}
		})

export const slice = createSlice({
		name: 'cards',
		initialState: {
				cardsState: {
						cards: [] as CardType[]
				} as GetCardsResponse,
				searchParams: {
						page: 1,
						pageCount: 10,
						cardQuestion: '',
				} as CardsSearchParams,
		},
		reducers: {
				setCardsSearchParams(state, action: PayloadAction<PacksSearchParams>) {

				},
		},
		extraReducers: builder => {
				builder
						.addCase(fetchCards.fulfilled, (state, action) => {
								state.cardsState = action.payload
						})
		}
})

export const cardsReducer = slice.reducer
