import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import { ChangeEvent, FC, useRef, useState } from "react"
import cl from "@/features/cards/modalCreateCard/CreateCardModal.module.css"
import { useSearchParams } from "react-router-dom"
import { CardType } from "@/features/cards/cardsApi/cardsApi"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { convertFileToBase64 } from "@/common/utils/convertFileToBase64"
import { toast } from "react-toastify"
import book from "@/commonAccess/book.png"
import iconUpdate from "@/commonAccess/iconUpdate.png"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"

const styleBtn = {
  width: "146px",
  height: "36px",
  borderRadius: "4px",
  background: "#8c61ff",
  boxShadow: "0 4px 18px 0 rgba(140, 97, 255, 0.35)",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "24px",
  color: "#fff",
  textTransform: "capitalize",
  hover: "#8c61ff",
}
const style = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 542,
  height: 515,
  bgcolor: "#171717",
  border: "1px solid #000",
  borderRadius: "2px 2px 0px 0px",
  boxShadow: 24,
  fontSize: "18px",
  color: "#FFF",
  fontWeight: "700",
  lineHeight: "24px",
}

type PropsType = {
  title: string
  titleBtn: string
  card?: CardType
  from: "Cards" | "CardsList"
  onHandlerRequest: (card: any) => void
}

export const BasicModalCard: FC<PropsType> = ({
  onHandlerRequest,
  title,
  titleBtn,
  from,
  card,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isCheckFromCards = from === "Cards"
  const isCheckFromCardsList = from === "CardsList"
  const [search, setSearch] = useSearchParams()
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState(card?.question ?? "")
  const [answer, setAnswer] = useState(card?.answer ?? "")
  const [cover, setCover] = useState(book)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const createCard = () => {
    const searchParams = Object.fromEntries(search)
    if (isCheckFromCards) {
      onHandlerRequest({
        ...searchParams,
        cardsPack_id: searchParams.cardsPack_id,
        answer,
        question,
        questionImg: cover,
      })
    } else if (isCheckFromCardsList) {
      onHandlerRequest({
        ...searchParams,
        _id: card?._id,
        answer,
        question,
        questionImg: cover,
      })
    }
    handleClose()
  }
  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.currentTarget.value)
  }
  const onHandlerCancel = () => {
    setAnswer("")
    setQuestion("")
    setOpen(false)
  }
  const selectFile = () => {
    inputRef && inputRef.current?.click()
  }
  const uploadHandlerCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 40000) {
        convertFileToBase64(file, (file64: string) => {
          setCover(file64)
        })
      }
    } else {
      toast("Hi, The file is big:)")
    }
  }
  return (
    <div>
      {isCheckFromCards ? (
        <ButtonLarge className={cl.commonBtn} onClickHandler={handleOpen}>
          {titleBtn}
        </ButtonLarge>
      ) : (
        <Button onClick={handleOpen}>
          <img src={iconUpdate} alt={"iconUpdate"} />
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cl.titleBlock}>
            <span>{title}</span>
            <button className={commonStyle.closeBtn} onClick={handleClose}>
              X
            </button>
          </div>
          <div className={cl.inputGroup}>
            <div>
              <span className={cl.secondText}>Text</span>
              <select
                name={"Text"}
                className={`${commonStyle.authInput} ${cl.inputText} ${cl.correctSelect}`}
              >
                <option value={question}>text</option>
                <option value={cover}>picture</option>
              </select>
            </div>

            <div>
              <input
                type={"file"}
                ref={inputRef}
                style={{ display: "none" }}
                onChange={uploadHandlerCover}
                accept={"image/png"}
              />
              <ButtonLarge onClickHandler={selectFile} fullWidth>
                Change Cover
              </ButtonLarge>
            </div>
            <div>
              <span className={`${cl.secondText}  ${cl.secondTextAdd}`}>
                Question
              </span>
              <input
                value={question}
                onChange={onChangeQuestion}
                placeholder={"Question"}
                className={`${commonStyle.authInput} ${cl.inputText}`}
              />
            </div>
            <div>
              <span className={`${cl.secondText}  ${cl.secondTextAdd}`}>
                Answer
              </span>
              <input
                value={answer}
                onChange={onChangeAnswer}
                placeholder={"Answer"}
                className={`${commonStyle.authInput} ${cl.inputText}`}
              />
            </div>
          </div>

          <div className={cl.btnGroup}>
            <ButtonLarge
              onClickHandler={onHandlerCancel}
              className={cl.correctCanselBtn}
            >
              Cancel
            </ButtonLarge>
            <ButtonLarge onClickHandler={createCard}>{titleBtn}</ButtonLarge>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
