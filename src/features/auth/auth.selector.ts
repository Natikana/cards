import { RootState } from "@/main/store"

export const isInitializedSelector = (state: RootState) =>
  state.auth.isInitialized
export const isAuthSelector = (state: RootState) => state.auth.isAuth
export const profileSelector = (state: RootState) => state.auth.profile
export const errorSelector = (state: RootState) => state.auth.error
