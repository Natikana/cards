import React from "react"
import { useAppDispatch } from "@/main/hooks"
import { useForm } from "react-hook-form"
import { SetNewPasswordType } from "@/features/auth/auth.api/auth.api"
import { authThunk } from "@/features/auth/auth.slice"
import { useNavigate, useParams } from "react-router-dom"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { Title } from "@/common/components/title/Title"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import cl from "@/features/newPassword/NewPassword.module.css"

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<SetNewPasswordType>()
  const params = useParams()

  const onSubmit = handleSubmit((data: SetNewPasswordType) => {
    const payload = {
      password: data.password,
      resetPasswordToken: params.token,
    }
    dispatch(authThunk.setNewPassword(payload))
      .unwrap()
      .then((res) => {
        if (res.info) {
          return navigate("/login")
        }
      })
      .catch((e) => {
        console.log(e.message)
      })
  })

  const onHandlerSubmit = () => {
    setValue("password", getValues("password"))
  }

  return (
    <div className={commonStyle.sectionAuth}>
      <div className={`${commonStyle.formLoginReg} ${cl.formMain}`}>
        <Title title={"Create new password"} />
        <form onSubmit={onSubmit} className={cl.formStyle}>
          <span className={commonStyle.commonSecondText}>Password</span>
          <input
            {...register("password", {
              required: true,
              maxLength: 20,
              minLength: 8,
              pattern: /[A-Z0-9._%+-]/g,
              onChange: () => {
                getValues("password")
              },
            })}
            placeholder={"password"}
            type={"password"}
            className={commonStyle.authInput}
          />
          {errors?.password?.type === "required" && (
            <p className={`${commonStyle.commonSecondText} ${cl.warningText}`}>
              This field is required
            </p>
          )}
          {errors?.password?.type === "maxLength" && (
            <p className={`${commonStyle.commonSecondText} ${cl.warningText}`}>
              Password cannot more 20 characters
            </p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className={`${commonStyle.commonSecondText} ${cl.warningText}`}>
              Password cannot less 8 characters
            </p>
          )}
          {errors?.password?.type === "pattern" && (
            <p className={`${commonStyle.commonSecondText} ${cl.warningText}`}>
              Invalid password
            </p>
          )}
          <span>
            <p className={`${commonStyle.commonSecondText} ${cl.correctText}`}>
              Create new password and we will send you further instruction to
              email
            </p>
          </span>
          <ButtonLarge
            onHandlerSubmit={onHandlerSubmit}
            title={"Create New Password"}
          />
        </form>
      </div>
    </div>
  )
}
