import * as React from "react"
import Box from "@mui/material/Box"
import cl from "./ModalPack.module.css"
import Modal from "@mui/material/Modal"
import { ChangeEvent, FC, useState } from "react"
import { PackType } from "@/features/packs/packsApi/packsApi"
import { useSelector } from "react-redux"
import { packNameSelector } from "@/features/cards/cards.selector"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import iconUpdate from "@/commonAccess/iconUpdate.png"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { Title } from "@/common/components/title/Title"

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
  const packName = useSelector(packNameSelector)
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
        <ButtonLarge onClickHandler={handleOpen}>{nameModalBtn}</ButtonLarge>
      ) : (
        <button onClick={handleOpen} className={cl.updateIconPack}>
          <img src={iconUpdate} alt={"iconUpdate"} />
        </button>
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
              <Title title={nameModalBtn} className={cl.title} />
              <button className={cl.btnClose} onClick={handleClose}>
                X
              </button>
            </div>
            <div className={cl.textGroup}>
              <span className={commonStyle.commonSecondText}>Name Pack</span>
              <input
                value={title}
                onChange={onChangeTitle}
                placeholder={"Name"}
                className={`${commonStyle.authInput} ${cl.correctInput}`}
              />
              <div className={cl.inputCheckGroup}>
                <input
                  checked={check}
                  onChange={onChangeCheckBox}
                  type={"checkbox"}
                  className={cl.inputCheckBox}
                />
                <span className={commonStyle.commonText}>Private pack</span>
              </div>
            </div>

            <div className={cl.btnGroup}>
              <ButtonLarge
                className={cl.correctCanselBtn}
                onClickHandler={handleClose}
              >
                Cancel
              </ButtonLarge>
              <ButtonLarge onClickHandler={onHandlerPack}>
                {checkFromPackList ? titleEditBtn : nameModalBtn}
              </ButtonLarge>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
