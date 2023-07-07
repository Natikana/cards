import { RootState } from "@/main/store"

export const cardPacksSelector = (state: RootState) => state.packs.cardPacks
export const pageSelector = (state: RootState) => state.packs.page
export const pageCountSelector = (state: RootState) => state.packs.pageCount
export const cardPacksTotalCountSelector = (state: RootState) =>
  state.packs.cardPacksTotalCount
export const minCardsCountSelector = (state: RootState) =>
  state.packs.minCardsCount
export const maxCardsCountSelector = (state: RootState) =>
  state.packs.maxCardsCount
export const paramsSelector = (state: RootState) => state.packs.params
