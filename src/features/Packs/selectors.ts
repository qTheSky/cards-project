import {AppRootStateType} from 'app/store';

export const getPacks = (state: AppRootStateType) => state.packs.packsState.cardPacks
export const getPackTotalCount = (state: AppRootStateType) => state.packs.packsState.cardPacksTotalCount
export const getPacksSearchParams = (state: AppRootStateType) => state.packs.searchParams
export const getMinCardsCountFromState = (state:AppRootStateType)=>state.packs.packsState.minCardsCount
export const getMaxCardsCountFromState = (state:AppRootStateType)=>state.packs.packsState.maxCardsCount