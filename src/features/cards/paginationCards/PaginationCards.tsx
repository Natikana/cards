import { useSelector } from "react-redux"
import * as React from "react"
import { useSearchParams } from "react-router-dom"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Pagination from "@mui/material/Pagination"
import {
  packNameSelector,
  pageCardsSelector,
  pageCountCardsSelector,
  totalCountCardsSelector,
} from "@/features/cards/cards.selector"

export function PaginationCards() {
  const pageCards = useSelector(pageCardsSelector)
  const packName = useSelector(packNameSelector)
  const pageCountCards = useSelector(pageCountCardsSelector)
  const totalCountCards = useSelector(totalCountCardsSelector)
  const totalPageCountCards = totalCountCards / pageCountCards
  const [page, setPage] = React.useState<number>(pageCards)
  const [search, setSearch] = useSearchParams()

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const searchParams = Object.fromEntries(search)
    setSearch({ ...searchParams, page: String(value), packName })
    setPage(value)
  }

  return (
    <Stack spacing={2}>
      <Typography style={{ color: "green" }}>
        Page: {Math.floor(page)}
      </Typography>
      <Pagination
        sx={{
          div: {
            color: "green",
          },
          button: { color: "green" },
        }}
        count={Math.ceil(totalPageCountCards)}
        page={Math.floor(page)}
        onChange={handleChange}
        color={"primary"}
      />
    </Stack>
  )
}
