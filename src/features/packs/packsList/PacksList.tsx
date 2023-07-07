import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { packsThunk } from "@/features/packs/packsSlice"
import { PackType } from "@/features/packs/packsApi/packsApi"
import { Statuses } from "@/features/app/app.slice"
import UpdateIcon from "@mui/icons-material/Update"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DeleteIcon from "@mui/icons-material/Delete"
import { IconButton } from "@mui/material"
import TableSortLabel from "@mui/material/TableSortLabel"
import { loadingSelector } from "@/features/app/app.selector"
import { profileSelector } from "@/features/auth/auth.selector"
import { useSelector } from "react-redux"
import { cardPacksSelector } from "@/features/packs/packs.selector"

export const PacksList = () => {
  const packs = useSelector(cardPacksSelector)
  const isLoading = useSelector(loadingSelector)
  const my_id = useSelector(profileSelector)._id
  const dispatch = useAppDispatch()

  const onHandlerUpdatePack = (pack: PackType) => {
    dispatch(
      packsThunk.updatePack({
        cardsPack: {
          ...pack,
          _id: pack._id,
          name: "Sasha",
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.cardsCount}</TableCell>
                <TableCell align="center">
                  {row.updated.slice(0, 10).split("-").reverse().join(".")}
                </TableCell>
                <TableCell align="center">{row.user_name}</TableCell>
                <TableCell align="center">
                  <IconButton disabled={row.cardsCount === 0}>
                    <VisibilityIcon />
                  </IconButton>
                  {row.user_id === my_id && (
                    <>
                      <IconButton
                        onClick={() => onHandlerRemovePack(row._id)}
                        disabled={isLoading === Statuses.loading}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onHandlerUpdatePack(row)}
                        disabled={isLoading === Statuses.loading}
                      >
                        <UpdateIcon />
                      </IconButton>
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
