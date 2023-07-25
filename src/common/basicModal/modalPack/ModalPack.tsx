import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import cl from "./ModalPack.module.css"
import Modal from "@mui/material/Modal"
import { ChangeEvent, FC, useState } from "react"
import { useAppSelector } from "@/main/hooks"
import { IconButton } from "@mui/material"
import UpdateIcon from "@mui/icons-material/Update"
import { PackType } from "@/features/packs/packsApi/packsApi"
const styleBtn = {
  width: "146px",
  height: "36px",
  borderRadius: "4px",
  background: "#8c61ff",
  boxShadow: "0 4px 18px 0 rgba(140, 97, 255, 0.35)",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "24px",
  color: "#fff",
  textTransform: "capitalize",
  hover: "#8c61ff",
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 542,
  height: 311,
  bgcolor: "#171717",
  border: "1px solid #333",
  borderRadius: "2px 2px 0 0",
  boxShadow: 24,
  fontSize: "18px",
  color: "#FFF",
  fontWeight: "700",
  lineHeight: "24px",
}
type PropsType = {
  pack?: PackType
  onHandlerRequest: (pack: any) => void
  nameModalBtn: string
  titleEditBtn?: string
  from: "Packs" | "PacksList"
}

export const ModalPack: FC<PropsType> = ({
  nameModalBtn,
  onHandlerRequest,
  from,
  pack,
  titleEditBtn,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const packName = useAppSelector((state) => state.packs.params?.packName)
  const [title, setTitle] = useState(packName ?? "")
  const [check, setCheck] = useState(false)
  const checkFromPack = from === "Packs"
  const checkFromPackList = from === "PacksList"
  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.currentTarget.checked)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onHandlerPack = () => {
    if (checkFromPack) {
      onHandlerRequest({ name: title, private: check })
    } else if (checkFromPackList && pack) {
      onHandlerRequest({
        ...pack,
        name: title,
        private: check,
        _id: pack._id,
      })
    }

    handleClose()
  }

  return (
    <div>
      {checkFromPack ? (
        <Button sx={styleBtn} onClick={handleOpen}>
          {nameModalBtn}
        </Button>
      ) : (
        <IconButton onClick={handleOpen}>
          <UpdateIcon />
        </IconButton>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cl.modal}>
            <div className={cl.titleBlock}>
              <span className={cl.title}>{nameModalBtn}</span>
              <button className={cl.btnClose} onClick={handleClose}>
                X
              </button>
            </div>
            <div className={cl.textGroup}>
              <span className={cl.secondText}>{cl.text}</span>
              <input
                value={title}
                onChange={onChangeTitle}
                placeholder={"Name"}
                className={cl.inputText}
              />
              <div className={cl.inputCheckGroup}>
                <input
                  checked={check}
                  onChange={onChangeCheckBox}
                  type={"checkbox"}
                  className={cl.inputCheckBox}
                />
                <span className={cl.secondText}>Private pack</span>
              </div>
            </div>

            <div className={cl.btnGroup}>
              <button onClick={handleClose} className={cl.littleBtn}>
                Cancel
              </button>
              <button className={cl.commonBtn} onClick={onHandlerPack}>
                {checkFromPackList ? titleEditBtn : nameModalBtn}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
