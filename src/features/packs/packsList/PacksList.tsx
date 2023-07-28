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
import { profileSelector } from "@/features/auth/auth.selector"
import { useSelector } from "react-redux"
import { cardPacksSelector } from "@/features/packs/packs.selector"
import { Link } from "react-router-dom"
import { ModalDelete } from "@/common/basicModal/modalDelete/ModalDelete"
import { ModalPack } from "@/common/basicModal/modalPack/ModalPack"
import cl from "./PacksList.module.css"
import iconPlay from "@/commonAccess/iconPlay.png"

export const stylesCell = {
  color: "#ffff",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: "24px",
  borderBottom: "0",
}
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#333",
              border: "1px solid #333",
            }}
          >
            <TableCell align="center" sx={stylesCell}>
              Name
            </TableCell>
            <TableCell align="center" sx={stylesCell}>
              Cards
            </TableCell>
            <TableCell align="center" sx={stylesCell}>
              Last Updated
            </TableCell>
            <TableCell align="center" sx={stylesCell}>
              CreatedBy
            </TableCell>
            <TableCell align="center" sx={stylesCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "#000" }}>
          {packs.map((row) => {
            return (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  opacity: row.cardsCount === 0 ? "0.3" : "",
                  borderBottom: "0",
                  border: "1px solid #333",
                }}
              >
                <TableCell align="center" sx={stylesCell}>
                  {row.cardsCount === 0 && row.user_id !== my_id ? (
                    <span className={cl.cell}>{row.name}</span>
                  ) : (
                    <Link
                      className={cl.cell}
                      to={`/cards?cardsPack_id=${row._id}&user_id=${row.user_id}&packName=${row.name}`}
                    >
                      <div className={cl.cellWithIcon}>
                        {row.deckCover && row.user_id === my_id && (
                          <img
                            src={row.deckCover}
                            alt={"cover"}
                            width={"25px"}
                          />
                        )}
                        <span>{row.name}</span>
                      </div>
                    </Link>
                  )}
                </TableCell>
                <TableCell align="center" sx={stylesCell}>
                  {row.cardsCount}
                </TableCell>
                <TableCell align="center" sx={stylesCell}>
                  {row.updated.slice(0, 10).split("-").reverse().join(".")}
                </TableCell>
                <TableCell align="center" sx={stylesCell}>
                  {row.user_name}
                </TableCell>
                <TableCell align="center" sx={stylesCell}>
                  {row.cardsCount === 0 ? (
                    <img src={iconPlay} alt={"iconPlay"} />
                  ) : (
                    <Link
                      to={`/learn?cardsPack_id=${row._id}&packName=${row.name}&cardsTotalCount=${row.cardsCount}`}
                    >
                      <img src={iconPlay} alt={"iconPlay"} />
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
  )
}
