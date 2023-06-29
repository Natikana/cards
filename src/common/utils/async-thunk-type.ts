import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "@/main/store"
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: unknown | null | ResponseDataType
}>()

export type FieldsErrorsType = {
  field: string
  error: string
}
export type ResponseDataType<D = {}> = {
  messages: Array<string>
  data: D
  fieldsErrors: FieldsErrorsType[]
}
