import cl from "./toolBar.module.css"
import React, { FC, PropsWithChildren } from "react"
import logo from "@/commonAccess/Logo.png"
import { authThunk } from "@/features/auth/auth.slice"
import { useAppDispatch } from "@/main/hooks"
import { Link } from "react-router-dom"
import { Loader } from "@/common/loading/Loader"
import { Statuses } from "@/features/app/app.slice"
import { useSelector } from "react-redux"
import { loadingSelector } from "@/features/app/app.selector"

export const ToolBar: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(loadingSelector)

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
