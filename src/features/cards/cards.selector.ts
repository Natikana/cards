import { RootState } from "@/main/store"

export const pageCardsSelector = (state: RootState) => state.cards.page
export const cardsSelector = (state: RootState) => state.cards.cards
export const pageCountCardsSelector = (state: RootState) =>
  state.cards.pageCount
export const totalCountCardsSelector = (state: RootState) =>
  state.cards.cardsTotalCount
export const packUserCardsSelector = (state: RootState) =>
  state.cards.packUserId
export const paramsCardsSelector = (state: RootState) => state.cards.params
export const packNameSelector = (state: RootState) => state.cards.packName
