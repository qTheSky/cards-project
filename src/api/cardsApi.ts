import {instance} from 'api/instance';

export const cardsAPI = {
		getCards(params: CardsSearchParams) {
				return instance.get<GetCardsResponse>('cards/card', {params})
		},
}
export type GetCardsResponse = {
		cards: CardType[]
		cardsTotalCount: number
		maxGrade: number
		minGrade: number
		packCreated:Date
		packName:string
		packPrivate:boolean
		packUpdated:Date
		packUserId:string
		page:number
		pageCount:number
}
export type CardsSearchParams = {
		cardAnswer: string
		cardQuestion: string
		cardsPack_id: string
		min: number
		max: number
		sortCards: string
		page: number
		pageCount: number
}
export type CardType = {
		answer: string
		answerImg: string
		answerVideo: string
		cardsPack_id: string
		comments: string
		created: Date
		grade: number
		question: string
		questionImg: string
		questionVideo: string
		rating: number
		shots: number
		type: string
		updated: Date
		user_id: string
		_id: string
}