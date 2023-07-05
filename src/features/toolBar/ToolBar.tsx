import cl from "./toolBar.module.css"
import React, { FC, PropsWithChildren } from "react"
import logo from "@/commonAccess/Logo.png"
import { authThunk } from "@/features/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { Link } from "react-router-dom"
import { Loader } from "@/common/loading/Loader"
import { Statuses } from "@/features/app/app.slice"

export const ToolBar: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.app.isLoading)

  return (
    <>
      <div className={cl.toolBar}>
        <img src={logo} alt={"logo"} className={cl.logo} />
        <Link to={"/login"}>
          <button className={cl.btn}>Sing In</button>
        </Link>
        <button
          className={cl.btn}
          onClick={() => {
            dispatch(authThunk.logout({}))
          }}
        >
          Logout
        </button>
      </div>
      {isLoading === Statuses.loading && <Loader />}
      {children}
    </>
  )
}
