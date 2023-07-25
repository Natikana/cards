import React, { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { setCardsParams, thunkCards } from "@/features/cards/cardsSlice"
import { CardsList } from "@/features/cards/cardsList/CardsList"
import { useNavigate, useSearchParams } from "react-router-dom"
import cl from "./Cards.module.css"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import { useDebounce } from "@/common/utils/debounce/debounse"
import { BasicModalCard } from "@/common/basicModal/BasicModalCard"
import { CreateCardType } from "@/features/cards/cardsApi/cardsApi"

export const Cards = () => {
  const dispatch = useAppDispatch()
  const my_id = useSelector(profileSelector)._id
  const [search, setSearch] = useSearchParams()
  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 1000)
  const packName = useAppSelector((state) => state.cards.packName)
  const userId = useAppSelector((state) => state.cards.packUserId)
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = Object.fromEntries(search)
    dispatch(
      thunkCards.getCards({
        ...searchParams,
        cardsPack_id: searchParams.cardsPack_id,
        pageCount: 100,
      }),
    )
    dispatch(setCardsParams(searchParams))
  }, [search])

  useEffect(() => {
    const searchParams = Object.fromEntries(search)
    const searchCardQuestion = search.get("cardQuestion")
    if (searchCardQuestion)
      setSearch({
        ...searchParams,
        cardQuestion: value,
      })
  }, [debouncedValue])

  const createCard = (card: CreateCardType) => {
    const searchParams = Object.fromEntries(search)
    dispatch(
      thunkCards.createCards({
        card: {
          ...searchParams,
          cardsPack_id: card.cardsPack_id,
          answer: card.answer,
          question: card.question,
          questionImg: card.questionImg,
        },
      }),
    )
  }

  const returnToPacks = () => {
    return my_id === userId
      ? navigate(`/packs?user_id=${my_id}`)
      : navigate(`/packs`)
  }
  const onChangeSearching = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParams = Object.fromEntries(search)
    setSearch({ ...searchParams, cardQuestion: e.currentTarget.value })
    setValue(e.currentTarget.value)
  }
  return (
    <div className={cl.cards}>
      <div className={cl.cardsBlock}>
        <div className={cl.cardsPart}>
          <button onClick={returnToPacks}>back to the Packs list</button>
          <span style={{ color: "green" }}>{packName}</span>
        </div>
        <BasicModalCard
          from={"Cards"}
          onHandlerRequest={createCard}
          titleBtn={"Add New Card"}
          title={"Add New Card"}
        />
      </div>
      <input
        onChange={onChangeSearching}
        value={value}
        style={{ width: "100%" }}
        type={"search"}
        placeholder={"search cards"}
      />
      <CardsList />
      {/* <PaginationCards />*/}
    </div>
  )
}
