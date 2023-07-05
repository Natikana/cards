import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import * as React from "react"
import { PackType } from "@/features/packs/packsApi/packsApi"
import { packsThunk } from "@/features/packs/packsSlice"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import Paper from "@mui/material/Paper"
import TableHead from "@mui/material/TableHead"
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"

export const UserPackList = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks)
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
  return (
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
                  <button onClick={() => onHandlerRemovePack(row._id)}>
                    remove
                  </button>
                  <button onClick={() => onHandlerUpdatePack(row)}>
                    update
                  </button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
