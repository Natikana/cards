import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  authApi,
  BlockUserType,
  ForgotUserType,
  InfoBlockUserType,
  InfoUserType,
  LoginType,
  ProfileType,
  RegisterType,
  SetNewPasswordType,
  UpdateProfile,
  UpdateUserType,
} from "./auth.api/auth.api"
import { createAppAsyncThunk } from "@/common"

const slice = createSlice({
  name: "auth/register",
  initialState: {
    email: "startEmail" as string,
    error: null as null | string | undefined,
    profile: {} as ProfileType,
    //isLogin: false as boolean,
    isAuth: false as boolean,
    //isRegister: false as boolean,
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
      console.log("stateP", action)
      state.profile = action.payload.profile
    },
    setLoginIn: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isAuth = action.payload.isAuth
    },
    /*setIsRegisterIn: (
      state,
      action: PayloadAction<{ isRegister: boolean }>,
    ) => {
      state.isRegister = action.payload.isRegister
    },*/
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      console.log("register.fulfilled", action)
    })
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(me.fulfilled, (state, action) => {
      console.log("actionMeF", action)
      state.profile = action.payload.profile
      state.isAuth = true
      state.isInitialized = true
    })
    builder.addCase(me.rejected, (state, action) => {
      console.log("actionMErej", action.type)
      state.isInitialized = true
      state.error = action.error.message
    })
    builder.addCase(meUpdate.fulfilled, (state, action) => {
      console.log("meUFul", action.payload.profile)
      state.profile = action.payload.profile.updatedUser
    })
    builder.addCase(meUpdate.rejected, (state, action) => {
      console.log("meURej", action)
      state.error = action.error.message
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false
    })
    builder.addCase(logout.rejected, (state, action) => {
      console.log("meDrej", action.type)
      state.error = action.error.message
    })
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      console.log("forgot", action)
      state.info = action.payload.info.info
    })
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.profile.name = action.type
      console.log("forgotR", action.type)
    })
    builder.addCase(setNewPassword.fulfilled, (state, action) => {
      console.log("setNewPassword", action)
      state.info = action.payload.info.info
    })
    builder.addCase(setNewPassword.rejected, (state, action) => {
      //state.profile.updated = action.type
      console.log("setNewPasswordR", action.type)
    })
    builder.addCase(blockUser.fulfilled, (state, action) => {
      console.log("block", action)
    })
    builder.addCase(blockUser.rejected, (state, action) => {
      //state.profile.updated = action.type
      console.log("blockR", action.type)
    })
    /*builder.addMatcher(
          (action) => {
            console.log(action)
            return (
              action.type.includes("auth/me") &&
              (action.meta.requestStatus === "rejected" ||
                action.meta.requestStatus === "fulfilled")
            )
          },
          (state) => {
            state.isAuth = true
          },
        )*/
  },
})

export const register = createAppAsyncThunk<
  { profile: { addedUser: ProfileType } },
  RegisterType
>("users/register", async (arg) => {
  const res = await authApi.register(arg)
  return { profile: res.data }
})

export const login = createAppAsyncThunk<{ profile: ProfileType }, LoginType>(
  "auth/login",
  async (arg, thunkAPI) => {
    const res = await authApi.login(arg)
    return { profile: res.data }
  },
)
export const me = createAppAsyncThunk<{ profile: ProfileType }, {}>(
  "auth/me",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const res = await authApi.me({})
      return { profile: res.data }
    } catch (e) {
      return rejectWithValue("error")
    }
  },
)
export const meUpdate = createAppAsyncThunk<
  { profile: UpdateProfile },
  UpdateUserType
>("auth/meUpdate", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI
  try {
    const res = await authApi.meUpdate(arg)
    return { profile: res.data }
  } catch (e) {
    return rejectWithValue("error!")
  }
})
export const logout = createAppAsyncThunk<{ info: InfoUserType }, {}>(
  "auth/logout",
  async (arg) => {
    const res = await authApi.meLogout({})
    return { info: res.data }
  },
)
export const forgotPassword = createAppAsyncThunk<
  { info: InfoUserType },
  ForgotUserType
>("auth/forgot", async (arg, thunkAPI) => {
  const res = await authApi.forgotPassword(arg)
  console.log(res)
  return { info: res.data }
})
export const setNewPassword = createAppAsyncThunk<
  { info: InfoUserType },
  SetNewPasswordType
>("auth/setNewPassword", async (arg, thunkAPI) => {
  const res = await authApi.setNewPassword(arg)
  return { info: res.data }
})
export const blockUser = createAppAsyncThunk<
  { infoBlock: InfoBlockUserType },
  BlockUserType
>("auth/block", async (arg, thunkAPI) => {
  const res = await authApi.blockUser(arg)
  return { infoBlock: res.data }
})
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
  blockUser,
}
