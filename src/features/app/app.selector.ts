import { RootState } from "@/main/store"

export const loadingSelector = (state: RootState) => state.app.isLoading
