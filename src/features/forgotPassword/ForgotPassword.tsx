import React from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "@/features/auth/auth.slice"
import { useForm } from "react-hook-form"
import { ForgotUserType } from "@/features/auth/auth.api/auth.api"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { Title } from "@/common/components/title/Title"
import cl from "@/features/forgotPassword/ForgotPassword.module.css"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [search, setSearch] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<ForgotUserType>()

  const onSubmit = handleSubmit((data: ForgotUserType) => {
    const payload = {
      ...data,
      from: "mashkovski82@gmail.com",
      message: `<div>password recovery link:<a href='http://localhost:5173/new-password/$token$'>link
</a></div>`,
    }
    dispatch(authThunk.forgotPassword(payload))
  })
  const onHandlerSubmit = () => {
    setValue("email", getValues("email"))
    setSearch(getValues("email"))
    navigate(`/check-email?email=${getValues("email")}`)
  }

  return (
    <div className={commonStyle.sectionAuth}>
      <div className={`${commonStyle.formLoginReg} ${cl.formCorrect} `}>
        <Title title={"Forgot Password"} />
        <form onSubmit={onSubmit} className={cl.formStyle}>
          <span className={commonStyle.commonSecondText}>Email</span>
          <input
            type={"email"}
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              maxLength: 30,
              minLength: 8,
              onChange: () => {
                getValues("email")
              },
            })}
            placeholder={"email"}
            className={commonStyle.authInput}
          />
          <span>
            <p
              className={`${commonStyle.commonSecondText} ${cl.correctHeight}`}
            >
              Enter your email address and we will send you further instruction
            </p>
          </span>
          <ButtonLarge onClickHandler={onHandlerSubmit} fullWidth>
            Send Instructions
          </ButtonLarge>
        </form>
        <span className={commonStyle.commonSecondText}>
          Did you remember your password?
        </span>
        <Link to={"/login"} className={commonStyle.colorLink}>
          Try logging in
        </Link>
      </div>
    </div>
  )
}
