import React, { FC } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { thunkCards } from "@/features/cards/cardsSlice"
import { CardType, CreateCardType } from "@/features/cards/cardsApi/cardsApi"
import { BasicModalCard } from "@/common/basicModal/BasicModalCard"
import { ModalDelete } from "@/common/basicModal/modalDelete/ModalDelete"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import { cardsSelector } from "@/features/cards/cards.selector"
import { Title } from "@/common/components/title/Title"
import cl from "./CardsList.module.css"
import { stylesCell } from "@/features/packs/packsList/PacksList"

type PropsType = {
  createCard: (card: CreateCardType) => void
  searchParams: any
}

export const CardsList: FC<PropsType> = ({ createCard, searchParams }) => {
  const cards = useSelector(cardsSelector)
  const myId = useSelector(profileSelector)._id
  const userId = useAppSelector((state) => state.cards.packUserId)
  const dispatch = useAppDispatch()
  const searchParamsCards = Object.fromEntries(searchParams)
  const deleteCard = (idCard: string) => {
    dispatch(thunkCards.removeCard({ idCard }))
  }

  const updateCard = (card: CardType) => {
    dispatch(
      thunkCards.updatedCard({
        card: {
          ...card,
          _id: card._id,
          answer: card.answer,
          question: card.question,
          questionImg: card.questionImg,
        },
      }),
    )
  }

  return cards.length ? (
    <TableContainer sx={{ marginTop: "24px" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: "#333",
            border: "1px solid #333",
          }}
        >
          <TableRow>
            <TableCell sx={stylesCell} align="center">
              Question
            </TableCell>
            <TableCell sx={stylesCell} align="center">
              Answer
            </TableCell>
            <TableCell sx={stylesCell} align="center">
              Updated
            </TableCell>
            <TableCell sx={stylesCell} align="center">
              Grade
            </TableCell>
            <TableCell sx={stylesCell} align="center">
              {myId === userId ? "Actions" : ""}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "#000" }}>
          {cards.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                borderBottom: "0",
                border: "1px solid #333",
              }}
            >
              <TableCell sx={stylesCell} align="center">
                <div className={cl.cell}>
                  {row.questionImg && (
                    <img
                      src={row.questionImg}
                      width={"25px"}
                      alt={"question"}
                    />
                  )}
                  <span>{row.question}</span>
                </div>
              </TableCell>
              <TableCell sx={stylesCell} align="center">
                {row.answer}
              </TableCell>
              <TableCell sx={stylesCell} align="center">
                {row.updated.slice(0, 10).split("-").reverse().join(".")}
              </TableCell>
              <TableCell sx={stylesCell} align="center">
                {row.grade > 0 ? row.grade.toFixed(1) : 0}
              </TableCell>

              <TableCell sx={stylesCell} align="center">
                {row.user_id === myId ? (
                  <>
                    <ModalDelete
                      nameModalBtn={"Delete Card"}
                      titleModal={row.question}
                      onHandlerRequest={() => deleteCard(row._id)}
                    />
                    <BasicModalCard
                      from={"CardsList"}
                      title={"Edit Card"}
                      titleBtn={"Save Changes"}
                      card={row}
                      onHandlerRequest={updateCard}
                    />
                  </>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className={cl.emptyPage}>
      <Title
        className={cl.correctTitle}
        title={"This pack is empty. Click add new card to fill this pack"}
      />
      <BasicModalCard
        from={"Cards"}
        onHandlerRequest={createCard}
        titleBtn={"Add New Card"}
        title={"Add New Card"}
      />
    </div>
  )
}
