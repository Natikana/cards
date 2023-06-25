import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum Statuses {
  idle = "idle",
  loading = "loading",
  failed = "failed",
}

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as null | string,
    isLoading: Statuses.idle,
  },
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: Statuses }>) => {
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/pending")
      },
      (state) => {
        state.isLoading = Statuses.loading
      },
    )
    builder.addMatcher(
      (action) => {
        return (
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected")
        )
      },
      (state) => {
        state.isLoading = Statuses.idle
      },
    )
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
