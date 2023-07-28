import React, { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { setCardsParams, thunkCards } from "@/features/cards/cardsSlice"
import { CardsList } from "@/features/cards/cardsList/CardsList"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import cl from "./Cards.module.css"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import { useDebounce } from "@/common/utils/debounce/debounse"
import { BasicModalCard } from "@/common/basicModal/BasicModalCard"
import { CreateCardType } from "@/features/cards/cardsApi/cardsApi"
import { cardsSelector } from "@/features/cards/cards.selector"
import { pageSelector } from "@/features/packs/packs.selector"
import leftArrow from "@/commonAccess/leftArrow.png"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { Title } from "@/common/components/title/Title"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"

export const Cards = () => {
  const dispatch = useAppDispatch()
  const my_id = useSelector(profileSelector)._id
  const [search, setSearch] = useSearchParams()
  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 1000)
  const cards = useSelector(cardsSelector)
  const page = useSelector(pageSelector)
  const userId = Object.fromEntries(search).user_id
  const packName = Object.fromEntries(search).packName
  const cardsPack_id = Object.fromEntries(search).cardsPack_id
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

  const onChangeSearching = (e: ChangeEvent<HTMLInputElement>) => {
    const searchParams = Object.fromEntries(search)
    setSearch({ ...searchParams, cardQuestion: e.currentTarget.value })
    setValue(e.currentTarget.value)
  }
  return (
    <div className={cl.cards}>
      <Link
        className={cl.linkBlock}
        to={
          my_id === userId
            ? `/packs?page=${page}&user_id=${my_id} `
            : `/packs?page=${page}`
        }
      >
        <img src={leftArrow} alt={"leftArrow"} />
        <span className={commonStyle.commonText}>Back to Packs List</span>
      </Link>
      <div className={cl.cardsBlock}>
        <Title title={`${packName} Pack`} />
        {cards.length && my_id === userId ? (
          <BasicModalCard
            from={"Cards"}
            onHandlerRequest={createCard}
            titleBtn={"Add New Card"}
            title={"Add New Card"}
          />
        ) : (
          <ButtonLarge
            onClickHandler={() =>
              navigate(
                `/learn?user_id=${userId}&packName=${packName}&cardsPack_id=${cardsPack_id}`,
              )
            }
          >
            Learn to Pack
          </ButtonLarge>
        )}
      </div>
      {cards.length && (
        <input
          className={cl.searchingInput}
          onChange={onChangeSearching}
          value={value}
          type={"search"}
          placeholder={"Input search"}
        />
      )}
      <CardsList createCard={createCard} searchParams={search} />
      {/* <PaginationCards />*/}
    </div>
  )
}
