import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import { FC, useState } from "react"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import cl from "./ModaleDelete.module.css"
import trash from "@/commonAccess/trash.png"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import { Title } from "@/common/components/title/Title"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 542,
  height: 226,
  bgcolor: "#171717",
  border: "1px solid #333",
  borderRadius: "2px 2px 0 0",
  boxShadow: 24,
}

type PropsType = {
  titleModal: string
  onHandlerRequest: () => void
  nameModalBtn: string
}
export const ModalDelete: FC<PropsType> = ({
  titleModal,
  nameModalBtn,
  onHandlerRequest,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <button onClick={handleOpen} className={cl.iconDeleteBtn}>
        <img src={trash} alt={"trash"} className={cl.iconDelete} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cl.modal}>
            <div className={cl.titleBlock}>
              <Title title={nameModalBtn} className={cl.title} />
              <button className={cl.btnClose} onClick={handleClose}>
                X
              </button>
            </div>
            <span className={cl.text}>
              {`Do you really want to remove ${titleModal}?`}
              <p>All cards will be deleted.</p>
            </span>
            <div className={cl.btnGroup}>
              <ButtonLarge
                className={cl.correctCanselBtn}
                onClickHandler={handleClose}
              >
                Cancel
              </ButtonLarge>
              <ButtonLarge onClickHandler={onHandlerRequest}>
                {nameModalBtn}
              </ButtonLarge>
              {/*<button onClick={handleClose} className={cl.littleBtn}>
                Cancel
              </button>*/}
              {/* <button className={cl.commonBtn} onClick={onHandlerRequest}>
                {nameModalBtn}
              </button>*/}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
