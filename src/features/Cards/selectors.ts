import {AppRootStateType} from 'app/store';

export const getPackName = (state: AppRootStateType) => state.cards.cardsState.packName
export const getPackOwnerId = (state: AppRootStateType) => state.cards.cardsState.packUserId
export const getCards = (state: AppRootStateType) => state.cards.cardsState.cards
export const getCardsTotalCount = (state: AppRootStateType) => state.cards.cardsState.cardsTotalCount
export const getCardsSearchParams = (state: AppRootStateType) => state.cards.searchParams
export const getCardsState = (state: AppRootStateType) => state.cards.cardsState