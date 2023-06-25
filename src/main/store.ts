import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { appReducer } from "../features/app/app.slice"
import counterReducer from "../features/counter/counterSlice"
import { authReducer } from "@/features/auth/auth.slice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
// @ts-ignore
console.log((window.store = store.getState()))
