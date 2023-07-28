import { FC } from "react"
import React from "react"
import cl from "./Title.module.css"

type PropsType = {
  title: string
  className?: string
}
export const Title: FC<PropsType> = ({ title, className }) => {
  return <h3 className={`${cl.title} ${className}`}>{title}</h3>
}
