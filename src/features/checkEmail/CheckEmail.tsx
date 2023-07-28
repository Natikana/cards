import React from "react"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import cl from "@/features/checkEmail/CheckEmail.module.css"
import { Title } from "@/common/components/title/Title"
import letter from "@/commonAccess/letter.png"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import { useNavigate, useSearchParams } from "react-router-dom"

export const CheckEmail = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()
  const email = Object.fromEntries(search).email

  return (
    <div className={commonStyle.sectionAuth}>
      <div className={`${commonStyle.formLoginReg} ${cl.formCorrect} `}>
        <Title title={"Check Email"} />
        <img src={letter} alt={"letter"} className={cl.img} />
        <span className={`${commonStyle.commonSecondText} ${cl.correctText}`}>
          We’ve sent an Email with instructions to
          <p>{email}</p>
        </span>
        <ButtonLarge onClickHandler={() => navigate("/login")} fullWidth>
          Back to Sign In
        </ButtonLarge>
      </div>
    </div>
  )
}
