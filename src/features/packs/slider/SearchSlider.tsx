import * as React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import MuiInput from "@mui/material/Input"
import { Slider } from "@mui/material"

const Input = styled(MuiInput)`
  width: 42px;
`

export const SearchSlider = () => {
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(0)
  const [value2, setValue2] = React.useState<
    number | string | Array<number | string>
  >(100)

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value))
  }
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(event.target.value === "" ? "" : Number(event.target.value))
  }

  const handleBlur = () => {
    if (+value < 0) {
      setValue(0)
    } else if (+value > 100) {
      setValue(100)
    }
  }
  const handleBlur2 = () => {
    if (+value2 < 0) {
      setValue2(0)
    } else if (+value2 > 100) {
      setValue2(100)
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
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
        <Grid item sm>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            style={{
              color: "red",
            }}
            value={value2}
            size="small"
            onChange={handleInputChange2}
            onBlur={handleBlur2}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
