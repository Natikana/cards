/*import { BasicModal } from "@/common/basicModal/BasicModal"
import React, { FC } from "react"
import cl from "./CreateCardModal.module.css"

type PropsType = {
  createCard: () => void
}
export const CreateCardModal: FC<PropsType> = ({}) => {
  return (
    <BasicModal>
      <>
        <div className={cl.title}>
          <span>Add New Card</span>
          <button
            style={{ background: "#171717", border: "none", color: "#FFF" }}
          >
            X
          </button>
        </div>
        <div className={cl.inputGroup}>
          <span className={cl.secondText}>Text</span>
          <input placeholder={"Text"} className={cl.inputText} />
          <span className={`${cl.secondText}  ${cl.secondTextAdd}`}>
            Question
          </span>
          <input placeholder={"Question"} className={cl.inputText} />
          <span className={`${cl.secondText}  ${cl.secondTextAdd}`}>
            Answer
          </span>
          <input placeholder={"Answer"} className={cl.inputText} />
        </div>
        <div>
          <div className={cl.btnGroup}>
            <button className={cl.littleBtn}>Cancel</button>
            <button className={cl.commonBtn}>Add New Card</button>
          </div>
        </div>
      </>
    </BasicModal>
  )
}*/
