import { packsInstance } from "@/features/packs/packsApi/packs.instance"
import { AxiosResponse } from "axios"

export const cardsApi = {
  getCards: (values: GetCardType) => {
    return packsInstance.get<
      ResponseCardType,
      AxiosResponse<ResponseCardType>,
      GetCardType
    >("card", {
      params: {
        cardAnswer: values.cardAnswer,
        cardQuestion: values.cardQuestion,
        sortCards: values.sortCards,
        cardsPack_id: values.cardsPack_id,
        min: values.min,
        page: values.page,
        pageCount: values.pageCount,
      },
    })
  },
  createCards: (card: CreateCardType) => {
    return packsInstance.post<
      { newCard: CardType; token: string; tokenDeathTime: number },
      AxiosResponse<{
        newCard: CardType
        token: string
        tokenDeathTime: number
      }>,
      { card: CreateCardType }
    >("card", { card })
  },
  removeCards: (idCard: string) => {
    return packsInstance.delete(`card?id=${idCard}`)
  },
  updateCard: (card: CardType) => {
    return packsInstance.put<
      { updatedCard: CardType; token: string; tokenDeathTime: number },
      AxiosResponse<{
        updatedCard: CardType
        token: string
        tokenDeathTime: number
      }>,
      { card: CardType }
    >("card", { card })
  },
  updateGrade: (valueGrade: UpdateGradeType) => {
    return packsInstance.put<
      { updatedGrade: ResponseUpdateGradeType },
      AxiosResponse<{ updatedGrade: ResponseUpdateGradeType }>,
      UpdateGradeType
    >("grade", {
      grade: valueGrade.grade,
      card_id: valueGrade.card_id,
    })
  },
}
//types
export type UpdateGradeType = {
  grade: number
  card_id: string
}
export type ResponseUpdateGradeType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
export type CreateCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type GetCardType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
export type ResponseCardType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  token: string
  tokenDeathTime: number
}
export type CardType = {
  answer: string
  question: string
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
  comments: string
  more_id: string
  rating: number
  type: string
  __v: number
}
