import React, { FC, ReactNode } from "react"
import cl from "./ButtonLarge.module.css"

type PropsType = {
  onClickHandler: () => void
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export const ButtonLarge: FC<PropsType> = ({
  children,
  onClickHandler,
  className,
  fullWidth,
}) => {
  return (
    <button
      className={`${cl.largeBtn} ${fullWidth ? cl.full : ""} ${className}`}
      type={"submit"}
      onClick={onClickHandler}
    >
      {children}
    </button>
  )
}
