import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, RootState } from "@/main/store"

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: Function,
  showGlobalError?: boolean,
) => {
  const { rejectWithValue } = thunkAPI
  try {
    return await promise()
  } catch (e: unknown) {
    return rejectWithValue({ error: e, showGlobalError })
  }
}
