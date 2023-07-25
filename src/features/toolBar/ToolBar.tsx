import cl from "./toolBar.module.css"
import React, { FC, PropsWithChildren } from "react"
import logo from "@/commonAccess/Logo.png"
import { Link } from "react-router-dom"
import { Loader } from "@/common/loading/Loader"
import { Statuses } from "@/features/app/app.slice"
import { useSelector } from "react-redux"
import { loadingSelector } from "@/features/app/app.selector"
import { isAuthSelector, profileSelector } from "@/features/auth/auth.selector"
import { DropMenu } from "@/features/toolBar/dialogWindow/DropMenu"

export const ToolBar: FC<PropsWithChildren> = ({ children }) => {
  const isLoading = useSelector(loadingSelector)
  const isAuth = useSelector(isAuthSelector)
  const userName = useSelector(profileSelector).name
  const userAva = useSelector(profileSelector).avatar

  return (
    <>
      {isLoading === Statuses.loading && <Loader />}
      <div className={cl.toolBar}>
        <img src={logo} alt={"logo"} className={cl.logo} />
        {isAuth ? (
          <div className={cl.userInfo}>
            <span className={cl.userName}>{userName}</span>
            <DropMenu />
            {/*<img className={cl.avaImg} src={userAva} alt={"avatar"} />*/}
          </div>
        ) : (
          <Link to={"/login"}>
            <button className={cl.btn}>Sing In</button>
          </Link>
        )}
      </div>
      {children}
    </>
  )
}
