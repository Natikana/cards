import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  authApi,
  ForgotUserType,
  InfoUserType,
  LoginType,
  ProfileType,
  RegisterType,
  SetNewPasswordType,
  UpdateProfile,
  UpdateUserType,
} from "./auth.api/auth.api"
import { createAppAsyncThunk } from "@/common"
import { thunkTryCatch } from "@/common/utils/thunk-try-catch"
import { toast } from "react-toastify"

export const THUNK_PREFIX = {
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  ME: "auth/me",
  ME_UPDATE: "auth/meUpdate",
  LOGOUT: "auth/logout",
  FORGOT_PASSWORD: "auth/forgotPassword",
  SET_NEW_PASSWORD: "auth/setNewPassword",
}
const slice = createSlice({
  name: "auth",
  initialState: {
    error: null as null | string | undefined,
    profile: {} as ProfileType,
    isAuth: false as boolean,
    isInitialized: false as boolean,
    info: {},
  },
  reducers: {
    setAuthMe: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
    setInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>,
    ) => {
      state.isInitialized = action.payload.isInitialized
    },
    setProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
      state.profile = action.payload.profile
    },
    setLoginIn: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {})
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(login.fulfilled, (state) => {
      state.isAuth = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(me.fulfilled, (state, action) => {
      state.profile = action.payload.profile
      state.isAuth = true
      state.isInitialized = true
    })
    builder.addCase(me.rejected, (state, action) => {
      state.isInitialized = true
      state.error = action.error.message
    })
    builder.addCase(meUpdate.fulfilled, (state, action) => {
      state.profile = action.payload.profile.updatedUser
    })
    builder.addCase(meUpdate.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.info = action.payload.info.info
    })
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.profile.name = action.type
    })
    builder.addCase(setNewPassword.fulfilled, (state, action) => {
      state.info = action.payload.info.info
    })
    builder.addCase(setNewPassword.rejected, (state, action) => {
      //state.profile.updated = action.type
    })
    /* builder.addCase(blockUser.fulfilled, (state, action) => {
      console.log("block", action)
    })
    builder.addCase(blockUser.rejected, (state, action) => {
      //state.profile.updated = action.type
      console.log("blockR", action.type)
    })*/
  },
})
export const register = createAppAsyncThunk<
  {
    profile: { addedUser: ProfileType }
  },
  RegisterType
>(THUNK_PREFIX.REGISTER, async (arg, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await authApi.register(arg)
      return res.data
    },
    true,
  )
})
/*export const register = createAppAsyncThunk<
  {
    profile: { addedUser: ProfileType }
  },
  RegisterType
>(THUNK_PREFIX.REGISTER, async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  const res = await authApi.register(arg)
  console.log(res)
  if (res.statusText === "Created") {
    return { profile: res.data }
  } else {
    console.log(res)
    return rejectWithValue(res)
  }
})*/

export const login = createAppAsyncThunk<{ profile: ProfileType }, LoginType>(
  THUNK_PREFIX.LOGIN,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(arg)
      toast("Hi, we like to see you again)")
      return { profile: res.data }
    })
  },
)
export const me = createAppAsyncThunk<{ profile: ProfileType }, {}>(
  THUNK_PREFIX.ME,
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await authApi.me({})
        return { profile: res.data }
      },
      false,
    )
  },
)
export const meUpdate = createAppAsyncThunk<
  { profile: UpdateProfile },
  UpdateUserType
>(THUNK_PREFIX.ME_UPDATE, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.meUpdate(arg)
    return { profile: res.data }
  })
})
export const logout = createAppAsyncThunk<{ info: InfoUserType }, {}>(
  THUNK_PREFIX.LOGOUT,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.logout({})
      return { info: res.data }
    })
  },
)
export const forgotPassword = createAppAsyncThunk<
  { info: InfoUserType },
  ForgotUserType
>(THUNK_PREFIX.FORGOT_PASSWORD, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.forgotPassword(arg)
    return { info: res.data }
  })
})
export const setNewPassword = createAppAsyncThunk<
  { info: InfoUserType },
  SetNewPasswordType
>(THUNK_PREFIX.SET_NEW_PASSWORD, async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.setNewPassword(arg)
    return { info: res.data }
  })
})
/*export const blockUser = createAppAsyncThunk<
  { infoBlock: InfoBlockUserType },
  BlockUserType
>("auth/block", async (arg, thunkAPI) => {
  const res = await authApi.blockUser(arg)
  return { infoBlock: res.data }
})*/
export const { setProfile, setLoginIn, setAuthMe, setInitialized } =
  slice.actions
export const authReducer = slice.reducer
export const authThunk = {
  register,
  login,
  me,
  meUpdate,
  logout,
  forgotPassword,
  setNewPassword,
}
