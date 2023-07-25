import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useAppDispatch } from "@/main/hooks"
import { packsThunk } from "@/features/packs/packsSlice"
import { PackType } from "@/features/packs/packsApi/packsApi"
import { loadingSelector } from "@/features/app/app.selector"
import { profileSelector } from "@/features/auth/auth.selector"
import { useSelector } from "react-redux"
import { cardPacksSelector } from "@/features/packs/packs.selector"
import { Link, useNavigate } from "react-router-dom"
import { ModalDelete } from "@/common/basicModal/modalDelete/ModalDelete"
import { ModalPack } from "@/common/basicModal/modalPack/ModalPack"
import VisibilityIcon from "@mui/icons-material/Visibility"

export const PacksList = () => {
  const packs = useSelector(cardPacksSelector)
  const my_id = useSelector(profileSelector)._id
  const dispatch = useAppDispatch()
  const onHandlerUpdatePack = (pack: PackType) => {
    dispatch(
      packsThunk.updatePack({
        cardsPack: {
          ...pack,
          _id: pack._id,
          name: pack.name,
          private: pack.private,
        },
      }),
    )
  }
  const onHandlerRemovePack = (idPack: string) => {
    dispatch(packsThunk.removePack({ _id: idPack }))
  }

  return packs.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Cards</TableCell>
            <TableCell align="center">LastUpdated</TableCell>
            <TableCell align="center">CreatedBy</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {packs.map((row) => {
            return (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  opacity: row.cardsCount === 0 ? "0.5" : "",
                }}
              >
                <TableCell align="center">
                  {row.deckCover && row.user_id === my_id ? (
                    <img
                      src={row.deckCover}
                      alt={"cover"}
                      style={{ width: "30px" }}
                    />
                  ) : (
                    ""
                  )}
                </TableCell>
                <TableCell align="center">
                  {row.cardsCount === 0 && row.user_id !== my_id ? (
                    <span>{row.name}</span>
                  ) : (
                    <Link to={`/cards?cardsPack_id=${row._id}`}>
                      {row.name}
                    </Link>
                  )}
                </TableCell>
                <TableCell align="center">{row.cardsCount}</TableCell>
                <TableCell align="center">
                  {row.updated.slice(0, 10).split("-").reverse().join(".")}
                </TableCell>
                <TableCell align="center">{row.user_name}</TableCell>
                <TableCell align="center">
                  {row.cardsCount === 0 ? (
                    <VisibilityIcon />
                  ) : (
                    <Link
                      to={`/learn?cardsPack_id=${row._id}&packName=${row.name}&cardsTotalCount=${row.cardsCount}`}
                    >
                      <VisibilityIcon />
                    </Link>
                  )}
                  {row.user_id === my_id && (
                    <>
                      <ModalDelete
                        nameModalBtn={"Delete Pack"}
                        titleModal={row.name}
                        onHandlerRequest={() => onHandlerRemovePack(row._id)}
                      />

                      <ModalPack
                        titleEditBtn={"Save Changes"}
                        pack={row}
                        onHandlerRequest={onHandlerUpdatePack}
                        nameModalBtn={"Edit Pack"}
                        from={"PacksList"}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
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
