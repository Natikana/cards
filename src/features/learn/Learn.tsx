import * as React from "react"
import { FC, useEffect, useState } from "react"
import cl from "./Learn.module.css"
import { useSelector } from "react-redux"
import { pageSelector } from "@/features/packs/packs.selector"
import { Link, useSearchParams } from "react-router-dom"
import { useAppDispatch } from "@/main/hooks"
import { setCardsParams, thunkCards } from "@/features/cards/cardsSlice"
import { CardType } from "@/features/cards/cardsApi/cardsApi"
import { cardsSelector } from "@/features/cards/cards.selector"

const grades = [
  "Did not know",
  "Forgot",
  "A lot of though",
  "Confused",
  "Knew the answer",
]

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce(
    (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
    0,
  )
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; _id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
      return { sum: newSum, _id: newSum < rand ? i : acc._id }
    },
    { sum: 0, _id: -1 },
  )
  console.log("test: ", sum, rand, res)

  return cards[res._id + 1]
}

export const Learn: FC = () => {
  const [search, setSearch] = useSearchParams()
  const dispatch = useAppDispatch()
  const page = useSelector(pageSelector)
  const cards = useSelector(cardsSelector)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [choice, setChoice] = useState(false)
  const [grade, setGrade] = useState<number>(1)
  const [card, setCard] = useState<CardType>({
    _id: "fake",
    user_id: "",
    cardsPack_id: "",
    answer: "answer fake",
    question: "question fake",
    grade: 0,
    shots: 0,
    type: "",
    rating: 0,
    more_id: "",
    created: "",
    updated: "",
    __v: 0,
    comments: "",
  })

  const searchParams = Object.fromEntries(search)
  useEffect(() => {
    dispatch(
      thunkCards.getCards({
        cardsPack_id: searchParams.cardsPack_id,
        pageCount: 100,
      }),
    )
    dispatch(setCardsParams(searchParams))
  }, [search])
  useEffect(() => {
    if (cards.length > 0) {
      setCard(getCard(cards))
    }
  }, [cards])

  const onNext = () => {
    if (cards.length > 0) {
      dispatch(
        thunkCards.upgradeGradeCard({
          card_id: card._id,
          grade: grade,
        }),
      )
      setCard(getCard(cards))
    }
  }
  return (
    <div>
      <Link
        style={{
          textDecoration: "none",
          paddingTop: "30px",
          display: "inline-block",
        }}
        to={`/packs?page=${page}`}
      >
        back to the Packs list
      </Link>
      <div
        className={!isChecked ? `${cl.box}` : `${cl.box} ${cl.correctHiegth}`}
      >
        <div className={cl.modal}>
          <span className={cl.title}>{`Learn ${searchParams.packName}`}</span>
          <div className={cl.mainContext}>
            <span
              className={`${cl.text} ${cl.textQue}`}
            >{`Question: ${card.question}`}</span>
            <span
              className={cl.secondText}
            >{`Number of attempts to answer a question: ${card.shots}`}</span>
            {!isChecked && (
              <button onClick={() => setIsChecked(true)} className={cl.btn}>
                Show Answer
              </button>
            )}
            {isChecked && (
              <div>
                <span
                  className={`${cl.text} ${cl.textAns}`}
                >{`Answer: ${card.answer}`}</span>
                <div>
                  <legend className={`${cl.text} ${cl.textLeg}`}>
                    Rate yourself:
                    {grades.map((el, i) => {
                      return (
                        <div key={i + 1} className={cl.radioGroup}>
                          <input
                            value={i + 1}
                            className={cl.radioInput}
                            type="radio"
                            name={card.answer}
                            checked={grade === i + 1}
                            onChange={(e) => {
                              setGrade(i + 1)
                              setChoice(e.currentTarget.checked)
                            }}
                          />
                          <label className={cl.secondText}>{el}</label>
                        </div>
                      )
                    })}
                  </legend>
                </div>
                <button onClick={onNext} className={cl.btn}>
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
