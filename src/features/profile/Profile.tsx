import React, { ChangeEvent, FC, useRef, useState } from "react"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "../auth/auth.slice"
import { useSelector } from "react-redux"
import { profileSelector } from "@/features/auth/auth.selector"
import correctIcon from "@/commonAccess/edit-2-outline.png"
import btnLogoutIcon from "@/commonAccess/log-out.png"
import defaultAva from "@/commonAccess/user.png"
import { toast } from "react-toastify"
import { convertFileToBase64 } from "@/common/utils/convertFileToBase64"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { Title } from "@/common/components/title/Title"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import cl from "./profile.module.css"

export type Props = {}
export const Profile: FC<Props> = () => {
  const ava = useSelector(profileSelector).avatar
  const nameUser = useSelector(profileSelector).name
  const email = useSelector(profileSelector).email
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(nameUser)
  const [avatar, setAvatar] = useState<undefined | string>(ava)
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [modal, setModal] = useState(false)

  const updateProfileInfo = () => {
    if (modal) {
      dispatch(authThunk.meUpdate({ name }))
    }
    setModal(false)
  }

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const onHandlerLogout = () => {
    dispatch(authThunk.logout({}))
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(authThunk.meUpdate({ avatar: file64 }))
            .unwrap()
            .then(() => {
              setAvatar(file64)
            })
        })
      } else {
        toast("Hi, The file is big:)")
      }
    }
  }
  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const errorHandler = () => {
    setIsAvaBroken(true)
    toast("The icon is broken")
  }

  const imgSrc = isAvaBroken ? defaultAva : avatar ? avatar : defaultAva

  return (
    <div className={cl.profile}>
      <div
        className={
          !modal
            ? cl.profileBlock
            : `${cl.profileBlock} ${cl.profileBlockModal}`
        }
      >
        <Title title={"Personal information"} />
        <div className={cl.infoBlock}>
          <div className={modal ? "" : cl.updateAva}>
            <div className={modal ? cl.modalImg : ""}>
              <img
                onError={errorHandler}
                src={imgSrc}
                className={cl.avaImg}
                alt={"ava"}
              />
            </div>
            {!modal && (
              <>
                <input
                  accept={"image/png"}
                  onChange={uploadHandler}
                  type={"file"}
                  alt={"avatar"}
                  className={cl.fileInput}
                  ref={inputRef}
                />
                <button
                  onClick={selectFileHandler}
                  className={cl.correctImgAvaBtn}
                >
                  <img src={correctIcon} alt={"correctDelete"} />
                </button>
              </>
            )}
            {modal && (
              <div className={`${cl.infoBlock} ${cl.correctInfoBlock}`}>
                <div className={cl.inputGroup}>
                  <span className={commonStyle.commonSecondText}>NickName</span>
                  <input
                    onChange={changeName}
                    value={name}
                    placeholder={"Name"}
                    className={commonStyle.authInput}
                  />
                </div>
                <ButtonLarge
                  onClickHandler={updateProfileInfo}
                  fullWidth
                  className={cl.correctBtnModal}
                >
                  Save Changes
                </ButtonLarge>
              </div>
            )}
          </div>
          {!modal && (
            <>
              <div className={cl.correctNameBlock}>
                <Title className={cl.name} title={nameUser} />
                {/*<h2 className={cl.name}>{nameUser}</h2>*/}
                <button
                  className={cl.correctNameBtn}
                  onClick={() => setModal(!modal)}
                >
                  <img
                    className={cl.correctImgNameBtn}
                    src={correctIcon}
                    alt={"correctDelete"}
                  />
                </button>
              </div>
              <span className={commonStyle.commonSecondText}>{email}</span>
              <ButtonLarge
                className={cl.btnLogout}
                onClickHandler={onHandlerLogout}
              >
                <img src={btnLogoutIcon} alt={"logout"} />
                Logout
              </ButtonLarge>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
