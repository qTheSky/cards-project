import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'common/CommonActions/App';
import {
		cardsAPI,
		CardsSearchParams,
		CardType,
		CreateCardType,
		EditCardType,
		GetCardsResponse,
		GradeCardParamsType
} from 'api/cardsApi';
import {AppRootStateType} from 'app/store';
import {handleErrors} from 'utils/error-utils';
import {editPack} from 'features/Packs/packs-reducer';


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
export const gradeCard = createAsyncThunk('cards/gradeCard',
		async (params: GradeCardParamsType, thunkAPI) => {
				thunkAPI.dispatch(appActions.setIsLoading(true))
				try {
						const {data} = await cardsAPI.gradeCard(params)
						thunkAPI.dispatch(appActions.setIsLoading(false))
						return data.updatedGrade
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
				setCardsSearchParams(state, action: PayloadAction<SetCardsSearchParams>) {
						state.searchParams = {...state.searchParams, ...action.payload}
				},
				resetCardsState(state) {
						state.cardsState = {...slice.getInitialState().cardsState}
				},
		},
		extraReducers: builder => {
				builder
						.addCase(fetchCards.fulfilled, (state, action) => {
								state.cardsState = action.payload
						})
						.addCase(gradeCard.pending, (state, action) => {
								const index = state.cardsState.cards.findIndex(card => card._id === action.meta.arg.card_id)
								state.cardsState.cards[index].shots += 1
						})
						.addCase(gradeCard.fulfilled, (state, action) => {
								const index = state.cardsState.cards.findIndex(card => card._id === action.payload.card_id)
								state.cardsState.cards[index].grade = action.payload.grade
						})
						.addCase(editPack.fulfilled, (state, action: PayloadAction<string>) => {
								state.cardsState.packName = action.payload
						})
		}
})
export const {setCardsSearchParams, resetCardsState} = slice.actions
export const cardsReducer = slice.reducer
export type SetCardsSearchParams = {
		cardAnswer?: string
		cardQuestion?: string
		cardsPack_id?: string
		min?: number
		max?: number
		sortCards?: string
		page?: number
		pageCount?: number
}