import { createSlice } from "@reduxjs/toolkit"
import {
  cardsApi,
  CardType,
  CreateCardType,
  GetCardType,
  ResponseCardType,
  ResponseUpdateGradeType,
  UpdateGradeType,
} from "@/features/cards/cardsApi/cardsApi"
import { createAppAsyncThunk } from "@/common"
import { thunkTryCatch } from "@/common/utils/thunk-try-catch"

const THUNK_PREFIX = {
  GET_CARDS: "cards/getCards",
  CREATE_CARDS: "cards/createCards",
  REMOVE_CARDS: "cards/deleteCards",
  UPDATE_CARDS: "cards/updateCards",
  UPDATE_GRADE_CARD: "cards/upgradeGradeCard",
}

const slice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as CardType[],
    cardsTotalCount: 100,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
    packName: "",
    packPrivate: false,
    packDeckCover: "",
    packCreated: "",
    packUpdated: "",
    token: "",
    tokenDeathTime: 7,
    params: {} as GetCardType,
  },
  reducers: {
    setCardsParams: (state, action) => {
      state.params = { ...state.params, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      return { ...state, ...action.payload }
    })
    builder.addCase(createCards.fulfilled, (state, action) => {
      //state.cards.unshift(action.payload.newCard)
    })
    builder.addCase(removeCard.fulfilled, (state, action) => {
      /*const idCard = state.cards.findIndex(
        (el) => el.cardsPack_id === action.payload.deletedCard.cardsPack_id,
      )
      state.cards.splice(idCard, 1)*/
    })
    builder.addCase(updatedCard.fulfilled, (state, action) => {
      /* const idCard = state.cards.findIndex((el) =>
        el._id === action.payload.updatedCard._id
          ? {
              ...el,
              answer: action.payload.updatedCard.answer,
              question: action.payload.updatedCard.question,
            }
          : el,
      )
      if (idCard !== -1) {
        state.cards[idCard] = action.payload.updatedCard
      }*/
    })
    builder.addCase(upgradeGradeCard.fulfilled, (state, action) => {
      /*state.cards.map((el) =>
        el._id === action.payload.updatedGrade.card_id
          ? { ...el, grade: action.payload.updatedGrade.grade }
          : el,
      )*/
    })
  },
})

export const getCards = createAppAsyncThunk<ResponseCardType, GetCardType>(
  THUNK_PREFIX.GET_CARDS,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await cardsApi.getCards(arg)
      return res.data
    })
  },
)
export const createCards = createAppAsyncThunk<
  { newCard: CardType; token: string; tokenDeathTime: number },
  { card: CreateCardType }
>(THUNK_PREFIX.CREATE_CARDS, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { getState, dispatch } = thunkAPI
    const params = getState().cards.params
    const res = await cardsApi.createCards({
      cardsPack_id: arg.card.cardsPack_id,
      answer: arg.card.answer,
      question: arg.card.question,
      questionImg: arg.card.questionImg,
    })
    dispatch(thunkCards.getCards({ ...params, pageCount: 1000 }))
    return res.data
  })
})
export const removeCard = createAppAsyncThunk<
  { deletedCard: CardType; token: string; tokenDeathTime: number },
  { idCard: string }
>(THUNK_PREFIX.REMOVE_CARDS, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { getState, dispatch } = thunkAPI
    const params = getState().cards.params
    const res = await cardsApi.removeCards(arg.idCard)
    dispatch(thunkCards.getCards({ ...params, pageCount: 1000 }))
    return res.data
  })
})
export const updatedCard = createAppAsyncThunk<
  { updatedCard: CardType; token: string; tokenDeathTime: number },
  { card: CardType }
>(THUNK_PREFIX.UPDATE_CARDS, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { getState, dispatch } = thunkAPI
    const params = getState().cards.params
    const res = await cardsApi.updateCard(arg.card)
    dispatch(thunkCards.getCards({ ...params, pageCount: 1000 }))
    return res.data
  })
})
export const upgradeGradeCard = createAppAsyncThunk<
  { updatedGrade: ResponseUpdateGradeType },
  UpdateGradeType
>(THUNK_PREFIX.UPDATE_GRADE_CARD, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { getState, dispatch } = thunkAPI
    const params = getState().cards.params
    const res = await cardsApi.updateGrade(arg)
    dispatch(thunkCards.getCards({ ...params, pageCount: 1000 }))
    return res.data
  })
})
export const cardsReducer = slice.reducer
export const thunkCards = {
  getCards,
  createCards,
  removeCard,
  updatedCard,
  upgradeGradeCard,
}
export const { setCardsParams } = slice.actions
