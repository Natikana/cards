import React, { ChangeEvent, FC, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import cl from "./profile.module.css"
import { authThunk } from "../auth/auth.slice"

export type Props = {
  //userName: string
  //updateProfileInfo: (name?: string, avatar?: string) => void
}
export const Profile: FC<Props> = () => {
  console.log("profile")
  const profile = useAppSelector((state) => state.auth.profile)
  const dispatch = useAppDispatch()

  const [mode, setMode] = useState(false)
  const [name, setName] = useState(profile.name)
  const updateProfileInfo = (name?: string, avatar?: string) => {
    // logic for avatar preparation to request
    dispatch(authThunk.meUpdate({ name, avatar }))
  }
  const onChangeInfo = () => {
    setMode(false)
    updateProfileInfo(name)
  }
  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }
  const onHandlerChangeName = () => {
    setMode(true)
    setName(profile.name)
  }

  const onHandlerLogout = () => {
    dispatch(authThunk.logout({}))
  }

  return (
    <div className={cl.profile}>
      <div className={cl.profileBlock}>
        <h3 style={{ color: "white" }}>Personal information</h3>
        <div>
          <div className={cl.correctImg}>
            <input type={"file"} alt={"avatar"} />
            <button style={{ color: "white", backgroundColor: "gray" }}>
              correct avatar
            </button>
          </div>
          <div className={cl.correctName}>
            {mode ? (
              <input
                autoFocus
                value={name}
                onChange={changeName}
                onBlur={onChangeInfo}
              />
            ) : (
              <span
                onDoubleClick={onHandlerChangeName}
                style={{ color: "white" }}
              >
                name: {profile.name}
              </span>
            )}
          </div>
          <p style={{ color: "white" }}>email: {profile.email}</p>
          <button
            onClick={onHandlerLogout}
            style={{ color: "white", backgroundColor: "gray" }}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  )
}
