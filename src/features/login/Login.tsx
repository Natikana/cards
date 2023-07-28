import React from "react"
import { useForm } from "react-hook-form"
import { LoginType } from "../auth/auth.api/auth.api"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "../auth/auth.slice"
import { Link, useNavigate } from "react-router-dom"
import cl from "./Login.module.css"
import { Title } from "@/common/components/title/Title"
import { ButtonLarge } from "@/common/components/buttonLarge/ButtonLarge"
import commonStyle from "@/common/styles/CommomStyles.module.css"

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<LoginType>()

  const onSubmit = handleSubmit((data: LoginType) => {
    dispatch(authThunk.login(data))
      .unwrap()
      .then((res) => {
        if (res.profile) {
          navigate(
            `/profile?_id=${res.profile._id}&name=${res.profile.name}&email=${res.profile.email}`,
          )
        }
      })
      .catch((e) => console.log("Error"))
  })

  const onHandlerSubmit = () => {
    setValue("email", getValues("email"))
    setValue("password", getValues("password"))
  }

  return (
    <div className={commonStyle.sectionAuth}>
      <div className={commonStyle.formLoginReg}>
        <Title title={"Sing In"} />
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
              className={`${commonStyle.authInput} ${cl.inputEmail}`}
              placeholder={"email"}
              type={"email"}
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
                Email cannot more than 30 characters
              </p>
            )}
            {errors?.email?.type === "minLength" && (
              <p
                className={`${commonStyle.commonSecondText} ${cl.warningText}`}
              >
                Email cannot less 8 characters
              </p>
            )}
            {errors?.email?.type === "pattern" && <p>Invalid email address</p>}
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
              className={commonStyle.authInput}
              placeholder={"password"}
              type={"password"}
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
            {errors?.password?.type === "pattern" && <p>Invalid password</p>}
            <div className={cl.inputCheckBlock}>
              <input
                {...register("rememberMe", {
                  onChange: () => {
                    getValues("rememberMe")
                  },
                })}
                className={cl.inputCheck}
                type={"checkbox"}
              />
              <span className={commonStyle.commonSecondText}>Remember me</span>
            </div>
          </div>
          <Link
            to={"/forgot-password"}
            className={`${commonStyle.commonSecondText} ${cl.linkFogPas}`}
          >
            Forgot Password?
          </Link>
          <ButtonLarge onClickHandler={onHandlerSubmit} fullWidth>
            Sing In
          </ButtonLarge>
        </form>
        <span className={commonStyle.commonSecondText}>
          Don't have an account?
        </span>
        <Link to={"/register"} className={commonStyle.colorLink}>
          Sing Up
        </Link>
      </div>
    </div>
  )
}
