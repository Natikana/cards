import cl from "./toolBar.module.css"
import React from "react"

export const ToolBar = () => {
  console.log("ToolBar")
  return (
    <div className={cl.toolBar}>
      <div className={cl.logoBlock}>
        <span className={cl.logo}>IT*IN INCUBATOR</span>
      </div>
      <a className={cl.btn} href={"login"}>
        Sing In
      </a>
    </div>
  )
}
