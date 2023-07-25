import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useAppDispatch } from "@/main/hooks"
import { thunkCards } from "@/features/cards/cardsSlice"
import { CardType } from "@/features/cards/cardsApi/cardsApi"
import { BasicModalCard } from "@/common/basicModal/BasicModalCard"
import { ModalDelete } from "@/common/basicModal/modalDelete/ModalDelete"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import { cardsSelector } from "@/features/cards/cards.selector"
import questionCard from "@/commonAccess/questionCard.png"

export const CardsList = () => {
  const cards = useSelector(cardsSelector)
  const myId = useSelector(profileSelector)._id
  const dispatch = useAppDispatch()

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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Cover</TableCell>
            <TableCell align="center">Question</TableCell>
            <TableCell align="center">Answer</TableCell>
            <TableCell align="center">Updated</TableCell>
            <TableCell align="center">Grade</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {row.questionImg && (
                  <img
                    style={{ width: "30px" }}
                    src={row.questionImg}
                    alt={"question"}
                  />
                )}
              </TableCell>
              <TableCell align="center">{row.question}</TableCell>

              <TableCell align="center">{row.answer}</TableCell>
              <TableCell align="center">{row.updated}</TableCell>
              <TableCell align="center">
                {row.grade > 0 ? row.grade.toFixed(1) : 0}
              </TableCell>
              {row.user_id === myId && (
                <TableCell align="center">
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
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <h2
      style={{
        color: "whitesmoke",
      }}
    >
      "Ups, The packs with current names are found. Try to change parameters of
      searching"
    </h2>
  )
}
