import {instance} from 'api/instance';

export const cardsAPI = {
    getCards(params: CardsSearchParams) {
        return instance.get<GetCardsResponse>('cards/card', {params})
    },
    createCard(params: CreateCardType) {
        return instance.post('cards/card', {card: params})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card/?id=${cardId}`)
    },
    editCard(params: EditCardType) {
        return instance.put('cards/card', {card: params})
    },
    gradeCard(gradeParams: GradeCardParamsType) {
        return instance.put<{ updatedGrade: UpdatedGradeType }>('cards/grade', gradeParams)
    }
}
export type GetCardsResponse = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packCreated: Date
    packName: string
    packPrivate: boolean
    packUpdated: Date
    packUserId: string
    page: number
    pageCount: number
    packDeckCover: string
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
export type CreateCardType = {
    cardsPack_id: string
    question?: string
    answer: string
    questionImg?: string
}
export type EditCardType = {
    _id: string
    question: string
    answer: string
    questionImg?: string
}
export type GradeCardParamsType = {
    grade: number
    card_id: string
}
export type UpdatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}