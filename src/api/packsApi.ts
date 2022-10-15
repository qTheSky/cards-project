import {instance} from 'api/instance';

export const packsAPI = {
		getPacks(searchParams: packsSearchParams) {
				return instance.get<GetPackResponse>(`cards/pack`, {params: searchParams})
		}
}
export type packsSearchParams = {
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
		user_name:string
}