import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import MuiInput from "@mui/material/Input"
import { Slider } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { packsThunk, setParams } from "@/features/packs/packsSlice"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { GetPackType } from "@/features/packs/packsApi/packsApi"

const Input = styled(MuiInput)`
  width: 42px;
`

export const SearchSlider = () => {
  const dispatch = useAppDispatch()

  const maxCards = useAppSelector((state) => state.packs.maxCardsCount)
  const params = useAppSelector((state) => state.packs.params)

  const [search, setSearch] = useSearchParams()
  const [value, setValue] = React.useState<number[]>([0, maxCards])

  useEffect(() => {
    if (search) dispatch(setParams({ ...Object.fromEntries(search) }))
    //const min = ({ ...Object.fromEntries(search) } as GetPackType).min
    //const max = ({ ...Object.fromEntries(search) } as GetPackType).max
    //if (min && max) setValue([min, max])
  }, [])

  useEffect(() => {
    if (!params?.min && !params?.max) setValue((value) => [value[0], maxCards])
  }, [maxCards])

  useEffect(() => {
    if (!params?.min && !params?.max) {
      setValue([0, maxCards])
    }
    if (params?.min && params?.max) {
      setValue([params?.min, params?.max])
    }
  }, [params?.min, params?.max])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const s = Object.fromEntries(search)
    setSearch({
      ...s,
      min: event.currentTarget.value,
    })

    setValue((value) => [+event.currentTarget.value, value[1]])
    dispatch(setParams({ min: +event.currentTarget.value, max: value[1] }))
  }
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const s = Object.fromEntries(search)

    setSearch({ ...s, max: event.currentTarget.value })

    setValue((value) => [value[0], +event.currentTarget.value])

    dispatch(setParams({ min: value[0], max: +event.currentTarget.value }))
  }

  /*function valuetext(value: number) {
      return `${value}°C`
    }*/
  /* const handleBlur = () => {
      if (+value[0] < 0) {
        setValue([0])
      } else if (+value[0] > 100) {
        setValue([100])
      }
    }
    const handleBlur2 = () => {
      if (+value[1] < 0) {
        setValue([0])
      } else if (+value[1] > 100) {
        setValue([100])
      }
    }*/
  const handleChange = (event: Event, newValue: any) => {
    const s = Object.fromEntries(search)
    setSearch({ ...s, min: newValue[0], max: newValue[1] })
    setValue(newValue as number[])
  }
  const handleChangeCommited = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    if (Array.isArray(newValue)) {
      dispatch(setParams({ min: newValue[0], max: newValue[1] }))
    }
  }

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            style={{
              color: "green",
            }}
            value={value[0]}
            size="small"
            onChange={handleInputChange}
            /* onBlur={handleBlur}*/
            inputProps={{
              step: 1,
              min: 0,
              max: maxCards,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
        <Grid item sm>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChangeCommitted={handleChangeCommited}
            onChange={handleChange}
            valueLabelDisplay="auto"
            max={maxCards}
            /* getAriaValueText={valuetext}*/
          />
        </Grid>
        <Grid item>
          <Input
            style={{
              color: "red",
            }}
            value={value[1]}
            size="small"
            onChange={handleInputChange2}
            /*onBlur={handleBlur2}*/
            inputProps={{
              step: 1,
              min: 0,
              max: maxCards,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
