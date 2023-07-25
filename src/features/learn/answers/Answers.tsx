import React, { FC, ReactNode } from "react"

type PropsType = {
  children: ReactNode
}
export const Answers: FC<PropsType> = ({ children }) => {
  return <div>{children}</div>
}
