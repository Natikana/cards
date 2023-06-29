import { authInstance } from "./auth.instance"
import { AxiosResponse } from "axios"

export const authApi = {
  register: (params: RegisterType) => {
    return authInstance.post<
      { addedUser: ProfileType },
      AxiosResponse<{ addedUser: ProfileType }>,
      RegisterType
    >("register", params)
  },
  login: (params: LoginType) => {
    return authInstance.post<
      ProfileType,
      AxiosResponse<ProfileType>,
      LoginType
    >("login", params)
  },
  me: ({}) => {
    return authInstance.post<ProfileType, AxiosResponse<ProfileType>, {}>("me")
  },
  meUpdate: (params: UpdateUserType) => {
    return authInstance.put<
      UpdateProfile,
      AxiosResponse<UpdateProfile>,
      UpdateUserType
    >("me", params)
  },
  logout: ({}) => {
    return authInstance.delete<InfoUserType, AxiosResponse<InfoUserType>, {}>(
      "me",
      {},
    )
  },
  forgotPassword: (params: ForgotUserType) => {
    return authInstance.post<
      InfoUserType,
      AxiosResponse<InfoUserType>,
      ForgotUserType
    >("forgot", params)
  },
  setNewPassword: (params: SetNewPasswordType) => {
    return authInstance.post<
      InfoUserType,
      AxiosResponse<InfoUserType>,
      SetNewPasswordType
    >("set-new-password", params)
  },
  blockUser: (params: BlockUserType) => {
    return authInstance.post<
      InfoBlockUserType,
      AxiosResponse<InfoBlockUserType>,
      BlockUserType
    >("block", params)
  },
}

//types
export type BlockUserType = {
  id: string
  blockReason: string
}
export type InfoBlockUserType = {
  user: string
  blockedCardPacksCount: number
}
export type SetNewPasswordType = {
  password: string
  resetPasswordToken: string | undefined
}
export type ForgotUserType = {
  email: string
  from?: string
  message: string
}
export type InfoUserType = {
  info: string
  error: string
}
export type UpdateUserType = {
  name?: string
  avatar?: string
}
export type LoginType = {
  email: string
  password: string
  rememberMe: boolean
}
export type RegisterType = Omit<LoginType, "rememberMe">

export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar?: null
}

export type UpdateProfile = {
  updatedUser: ProfileType
  token: string
  tokenDeathTime: number
}
