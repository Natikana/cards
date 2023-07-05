import { AxiosResponse } from "axios"
import { packsInstance } from "@/features/packs/packsApi/packs.instance"

export const packsApi = {
  getPack: (values: GetPackType) => {
    return packsInstance.get<
      ResponsePacksType,
      AxiosResponse<ResponsePacksType>,
      GetPackType
    >("/pack", {
      params: {
        packName: values.packName,
        max: values.max,
        min: values.min,
        sortPacks: values.sortPacks,
        page: values.page,
        pageCount: values.pageCount,
        user_id: values.user_id,
        block: values.block,
      },
    })
  },
  createPack: (cardsPack: ArgCreatePackType) => {
    return packsInstance.post<
      CreatePackType,
      AxiosResponse<CreatePackType>,
      { cardsPack: ArgCreatePackType }
    >("/pack", { cardsPack })
  },
  removePack: (id?: string) => {
    return packsInstance.delete<RemovePackType>(`/pack?id=${id}`)
  },
  updatePack: (cardsPack: PackType) => {
    return packsInstance.put<
      UpdatePackType,
      AxiosResponse<UpdatePackType>,
      { cardsPack: PackType }
    >("pack", { cardsPack })
  },
}
//types

export type ArgCreatePackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

export type GetPackType = {
  packName?: string
  max?: number
  min?: number
  sortPacks?: number
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}
export type UpdatePackType = {
  updatedCardsPack: PackType
  token: string
  tokenDeathTime: number
}
export type CreatePackType = {
  newCardsPack: PackType
  token: string
  tokenDeathTime: number
}
export type RemovePackType = {
  deletedCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  private: boolean
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  more_id: string
  created: string
  updated: string
  __v: number
}
export type ResponsePacksType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type CreateNewPackType = {
  newCardsPack: PackType
  token: string
  tokenDeathTime: number
}
