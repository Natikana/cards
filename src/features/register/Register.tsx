import React, { useState } from "react"
import { authThunk } from "../auth/auth.slice"
import { useForm } from "react-hook-form"
import { LoginType, RegisterType } from "../auth/auth.api/auth.api"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { AppDispatch } from "@/main/store"
import { useDispatch } from "react-redux"
import { isAuthSelector } from "@/features/auth/auth.selector"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/main/hooks"
import commonStyle from "@/common/styles/CommomStyles.module.css"
import { Title } from "@/common/components/title/Title"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import cl from "@/features/register/Register.module.css"
import btnLogoutIcon from "@/commonAccess/log-out.png"

export const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    setError,
  } = useForm<RegisterType & { confirm_password: string }>()

  const onSubmit = handleSubmit((data: RegisterType) => {
    dispatch(authThunk.register(data))
      .unwrap()
      .then((res) => {
        if (res.profile) {
          navigate("/login")
        }
      })
      .catch((e) => {
        console.error("error")
      })
  })

  const onHandlerSubmit = () => {
    setValue("email", getValues("email"))
    setValue("password", getValues("password"))
  }

  return (
    <div className={commonStyle.sectionAuth}>
      <div className={commonStyle.formLoginReg}>
        <Title title={"Sing Up"} />
        <form onSubmit={onSubmit} className={cl.formStyle}>
          <div className={cl.inputBlock}>
            <span className={commonStyle.commonSecondText}>Email</span>
            <input
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
              type={"email"}
              className={commonStyle.authInput}
            />
            {errors?.email?.type === "required" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                This field is required
              </p>
            )}
            {errors?.email?.type === "maxLength" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Email cannot more 30 characters
              </p>
            )}
            {errors?.email?.type === "minLength" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Email cannot less 8 characters
              </p>
            )}
            {errors?.email?.type === "pattern" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Invalid email address
              </p>
            )}
            <span
              className={
                errors.password
                  ? `${commonStyle.commonSecondText}`
                  : `${commonStyle.commonSecondText} ${cl.correctTextInput}`
              }
            >
              Password
            </span>
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
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                This field is required
              </p>
            )}
            {errors?.password?.type === "maxLength" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Password cannot more 20 characters
              </p>
            )}
            {errors?.password?.type === "minLength" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Password cannot less 8 characters
              </p>
            )}
            {errors?.password?.type === "pattern" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Invalid password
              </p>
            )}
            <span
              className={
                errors.confirm_password
                  ? `${commonStyle.commonSecondText}`
                  : `${commonStyle.commonSecondText} ${cl.correctTextInput}`
              }
            >
              Confirm Password
            </span>
            <input
              {...register("confirm_password", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    errors.password
                      ? setError("confirm_password", {
                          type: "manual",
                          message: "Your passwords do no match",
                        })
                      : null
                    return "Your passwords do no match"
                  }
                },
              })}
              placeholder={"confirm password"}
              type={"password"}
              className={commonStyle.authInput}
            />
            {errors.confirm_password && (
              <span
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                {errors.confirm_password.message}
              </span>
            )}
          </div>
          <ButtonLarge onClickHandler={onHandlerSubmit} fullWidth>
            Sing Up
          </ButtonLarge>
        </form>
        <span className={commonStyle.commonSecondText}>
          Already have an account?
        </span>
        <Link to={"/login"} className={commonStyle.colorLink}>
          Sing In
        </Link>
      </div>
    </div>
  )
}
