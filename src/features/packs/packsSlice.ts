import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "@/common"
import { thunkTryCatch } from "@/common/utils/thunk-try-catch"
import {
  ArgCreatePackType,
  CreatePackType,
  GetPackType,
  packsApi,
  PackType,
  RemovePackType,
  ResponsePacksType,
  UpdatePackType,
} from "@/features/packs/packsApi/packsApi"

const THUNK_PREFIX = {
  GET_PACK: "pack/getPack",
  CREATE_PACK: "pack/createPack",
  REMOVE_PACK: "pack/deletePack",
  UPDATE_PACK: "pack/updatePack",
}
const slice = createSlice({
  name: "cards",
  initialState: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 10,
    cardPacksTotalCount: 2000,
    minCardsCount: 0,
    maxCardsCount: 100,
    params: null as GetPackType | null,
  },
  reducers: {
    setParams: (state, action: PayloadAction<GetPackType | null>) => {
      if (!state.params) {
        state.params = {}
      }
      state.params = { ...state.params, ...action.payload }
    },
    clearParams: (state) => {
      state.params = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getsPack.fulfilled, (state, action) => {
      // state.page = action.payload.page
      // state.cardPacks = action.payload.cardPacks
      return { ...state, ...action.payload }
    })
    builder.addCase(createPack.fulfilled, (state, action) => {
      state.cardPacks.unshift(action.payload.newCardsPack)
    })
    builder.addCase(updatePack.fulfilled, (state, action) => {
      const idPack = state.cardPacks.findIndex(
        (el) => el._id === action.payload.updatedCardsPack._id,
      )
      if (idPack !== -1) {
        state.cardPacks[idPack] = action.payload.updatedCardsPack
      }
    })
    builder.addCase(removePack.fulfilled, (state, action) => {
      const idPack = state.cardPacks.findIndex(
        (el) => el._id === action.payload.deletedCardsPack._id,
      )
      state.cardPacks.splice(idPack, 1)
    })
  },
})

export const updatePack = createAppAsyncThunk<
  UpdatePackType,
  { cardsPack: PackType }
>(THUNK_PREFIX.UPDATE_PACK, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { getState, dispatch } = thunkAPI
    const params = getState().packs.params
    const res = await packsApi.updatePack(arg.cardsPack)
    params && dispatch(packsThunk.getsPack(params))
    return res.data
  })
})
export const removePack = createAppAsyncThunk<RemovePackType, { _id?: string }>(
  THUNK_PREFIX.REMOVE_PACK,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { getState, dispatch } = thunkAPI
      const params = getState().packs.params
      const res = await packsApi.removePack(arg._id)
      params && dispatch(packsThunk.getsPack(params))
      return res.data
    })
  },
)
export const getsPack = createAppAsyncThunk<ResponsePacksType, GetPackType>(
  THUNK_PREFIX.GET_PACK,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const params = thunkAPI.getState().packs.params
      const res = await packsApi.getPack(params ?? {})
      //thunkAPI.dispatch(setParams(arg))

      return res.data
    })
  },
)

export const createPack = createAppAsyncThunk<
  CreatePackType,
  { cardsPack: ArgCreatePackType }
>(THUNK_PREFIX.CREATE_PACK, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { getState, dispatch } = thunkAPI
    const params = getState().packs.params
    const res = await packsApi.createPack(arg.cardsPack)
    params && dispatch(getsPack(params))
    return res.data
  })
})
export const { setParams, clearParams } = slice.actions
export const packsThunk = {
  getsPack,
  createPack,
  removePack,
  updatePack,
}
export const packsReducer = slice.reducer
