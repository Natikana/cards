import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import cl from "./PaginationPacks.module.css"
import {
  cardPacksTotalCountSelector,
  pageCountSelector,
  pageSelector,
} from "@/features/packs/packs.selector"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
const style = {
  div: {
    color: "#8c61ff",
  },
  button: { color: "#8c61ff" },
}

export function PaginationPacks() {
  const pagePack = useSelector(pageSelector)
  const pageCount = useSelector(pageCountSelector)
  const cardPacksTotalCount = useSelector(cardPacksTotalCountSelector)
  const totalPageCount = cardPacksTotalCount / pageCount
  const [page, setPage] = React.useState<number>(pagePack)
  const [search, setSearch] = useSearchParams()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const searchParams = Object.fromEntries(search)
    setSearch({ ...searchParams, page: String(value) })
    setPage(value)
  }

  return (
    <Stack spacing={2}>
      <span className={cl.page}>Page: {Math.floor(pagePack)}</span>
      <Pagination
        sx={style}
        count={Math.floor(totalPageCount)}
        page={Math.floor(pagePack)}
        onChange={handleChange}
      />
    </Stack>
  )
}
