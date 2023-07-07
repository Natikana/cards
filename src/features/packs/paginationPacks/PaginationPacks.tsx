import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { useSearchParams } from "react-router-dom"
import { setParams } from "@/features/packs/packsSlice"
import { useEffect } from "react"
import {
  cardPacksTotalCountSelector,
  pageCountSelector,
  pageSelector,
} from "@/features/packs/packs.selector"
import { useSelector } from "react-redux"

export function PaginationPacks() {
  const dispatch = useAppDispatch()

  const pagePack = useSelector(pageSelector)
  const pageCount = useSelector(pageCountSelector)
  const cardPacksTotalCount = useSelector(cardPacksTotalCountSelector)
  const totalPageCount = cardPacksTotalCount / pageCount
  const [page, setPage] = React.useState<number>(pagePack)
  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    if (search) dispatch(setParams({ ...Object.fromEntries(search) }))
  }, [])
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const s = Object.fromEntries(search)
    setSearch({ ...s, page: String(value) })
    setPage(value)
    dispatch(setParams({ page: value }))
  }

  return (
    <Stack spacing={2}>
      <Typography style={{ color: "green" }}>
        Page: {Math.floor(pagePack)}
      </Typography>
      <Pagination
        sx={{
          div: {
            color: "green",
          },
          button: { color: "green" },
        }}
        count={Math.floor(totalPageCount)}
        page={Math.floor(pagePack)}
        onChange={handleChange}
        color={"primary"}
      />
    </Stack>
  )
}
