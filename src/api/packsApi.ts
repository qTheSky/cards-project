import {instance} from 'api/instance';

export const packsAPI = {
		getPacks(searchParams: PacksSearchParams) {
				return instance.get<GetPackResponse>(`cards/pack`, {params: {...searchParams}})
		},
		createPack(newPackData: CreatePackDataType) {
				return instance.post(`cards/pack`, {cardsPack: {...newPackData}})
		},
		deletePack(packId: string) {
				return instance.delete(`cards/pack/?id=${packId}`)
		},
		editPack(cardsPack: EditPackType) {
				return instance.put(`cards/pack`, {cardsPack})
		},
}
export type PacksSearchParams = {
		packName: string
		min: number
		max: number
		sortPacks: string
		page: number
		pageCount: number
		user_id: string
}
export type GetPackResponse = {
		cardPacks: PackType []
		cardPacksTotalCount: number
		maxCardsCount: number
		minCardsCount: number
		page: number
		pageCount: number
}

export type PackType = {
		_id: string
		user_id: string
		name: string
		cardsCount: number
		created: Date
		updated: Date
		user_name: string
		grade: number
		rating: number
		shots: number
		private: boolean
}
export type CreatePackDataType = {
		name: string
		deckCover?: string
		private: boolean
}
export type EditPackType = {
		_id: string
		name: string
		private: boolean
}