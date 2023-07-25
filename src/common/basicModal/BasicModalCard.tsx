import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import { ChangeEvent, FC, useRef, useState } from "react"
import cl from "@/features/cards/modalCreateCard/CreateCardModal.module.css"
import { useSearchParams } from "react-router-dom"
import { CardType } from "@/features/cards/cardsApi/cardsApi"
import UpdateIcon from "@mui/icons-material/Update"
import { convertFileToBase64 } from "@/common/utils/convertFileToBase64"
import { toast } from "react-toastify"
import questionCard from "@/commonAccess/questionCard.png"

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
  const [cover, setCover] = useState(questionCard)

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
        <Button className={cl.commonBtn} onClick={handleOpen} sx={styleBtn}>
          Add New Card
        </Button>
      ) : (
        <Button onClick={handleOpen}>
          <UpdateIcon />
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
            <button
              style={{
                background: "#171717",
                border: "none",
                color: "#FFF",
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              X
            </button>
          </div>
          <div className={cl.inputGroup}>
            <span className={cl.secondText}>Text</span>
            <select name={"Text"} className={cl.inputText}>
              <option value={question}>text</option>
              <option value={cover}>picture</option>
            </select>
            <div>
              <input
                type={"file"}
                ref={inputRef}
                style={{ display: "none" }}
                onChange={uploadHandlerCover}
                accept={"image/png"}
              />
              <button
                className={`${cl.commonBtn} ${cl.coverBtn}`}
                onClick={selectFile}
              >
                Change Cover
              </button>
            </div>

            <span className={`${cl.secondText}  ${cl.secondTextAdd}`}>
              Question
            </span>
            <input
              value={question}
              onChange={onChangeQuestion}
              placeholder={"Question"}
              className={cl.inputText}
            />
            <span className={`${cl.secondText}  ${cl.secondTextAdd}`}>
              Answer
            </span>
            <input
              value={answer}
              onChange={onChangeAnswer}
              placeholder={"Answer"}
              className={cl.inputText}
            />
          </div>
          <div>
            <div className={cl.btnGroup}>
              <button className={cl.littleBtn} onClick={onHandlerCancel}>
                Cancel
              </button>
              <button className={cl.commonBtn} onClick={createCard}>
                {titleBtn}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
