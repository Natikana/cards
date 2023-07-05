import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"
import { THUNK_PREFIX } from "@/features/auth/auth.slice"

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
        return action.type.endsWith("rejected")
      },
      (state, { payload: { error } }) => {
        state.isLoading = Statuses.failed
        const messageError = getErrorMessage(error)
        if (messageError === null) return
        toast.error(messageError)
      },
    )
    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/fulfilled")
      },
      (state) => {
        state.isLoading = Statuses.idle
      },
    )
  },
})

const getErrorMessage = (error: unknown): string | null => {
  if (isAxiosError(error)) {
    if (THUNK_PREFIX.ME + "/rejected" && error?.response?.status === 401) {
      return null
    }
    return error.response?.data?.error ?? error.message
  } else if (error instanceof Error) {
    return `Native error:${error.message}`
  }
  return JSON.stringify(error)
}
export const appReducer = slice.reducer
export const appActions = slice.actions
