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

export const PacksList = () => {
  const packs = useAppSelector((state) => state.packs.cardPacks)
  const page = useAppSelector((state) => state.packs.page)
  const isLoading = useAppSelector((state) => state.app.isLoading)
  const my_id = useAppSelector((state) => state.auth.profile._id)
  const dispatch = useAppDispatch()

  //const [params, setSearchParams] = useSearchParams()

  //const allParams = Object.fromEntries(params)
  //console.log("allParams", allParams)
  /*function createData(
        Name: string,
        Cards: number,
        LastUpdated: string,
        CreatedBy: string,
        Setting: string,
      ) {
        return { Name, Cards, LastUpdated, CreatedBy, Setting }
      }*/

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
                  <IconButton disabled={isLoading === Statuses.loading}>
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
  )
}
