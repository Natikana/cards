import React from "react"
import { useForm } from "react-hook-form"
import { LoginType } from "../auth/auth.api/auth.api"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "../auth/auth.slice"
import { Link, useNavigate } from "react-router-dom"
import cl from "./Login.module.css"

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
      .catch()
  })

  const onHandlerSubmit = () => {
    setValue("email", getValues("email"))
    setValue("password", getValues("password"))
  }

  return (
    <div className={cl.login}>
      <div className={cl.loginSection}>
        <h3 className={cl.singInText}>Sing in</h3>
        <form onSubmit={onSubmit} className={cl.formLogin}>
          <div className={cl.inputBlock}>
            <span className={cl.commonText}>Email</span>
            <input
              className={cl.inputEmail}
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
            />
            {errors?.email?.type === "required" && (
              <p>This field is required</p>
            )}
            {errors?.email?.type === "maxLength" && (
              <p>Email cannot more than 30 characters</p>
            )}
            {errors?.email?.type === "minLength" && (
              <p>Email cannot less 8 characters</p>
            )}
            {errors?.email?.type === "pattern" && <p>Invalid email address</p>}
            <span className={cl.commonText}>Password</span>
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
            />
            {errors?.password?.type === "required" && (
              <p>This field is required</p>
            )}
            {errors?.password?.type === "maxLength" && (
              <p>Password cannot more 20 characters</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p>Password cannot less 8 characters</p>
            )}
            {errors?.password?.type === "pattern" && <p>Invalid password</p>}
            <div className={cl.inputCheckBlock}>
              <input
                className={cl.inputCheck}
                {...register("rememberMe", {
                  onChange: () => {
                    getValues("rememberMe")
                  },
                })}
                type={"checkbox"}
              />
              <span className={cl.commonText}>Remember me</span>
            </div>
          </div>
          <Link
            to={"/forgot-password"}
            className={`${cl.commonText} ${cl.linkFogPas}`}
          >
            Forgot Password?
          </Link>
          <button
            className={`${cl.commonBtn} ${cl.loginBtn}`}
            type={"submit"}
            onClick={onHandlerSubmit}
          >
            Sing in
          </button>
        </form>
        <span className={`${cl.commonText} ${cl.regText}`}>
          Don't have an account?
        </span>
        <Link to={"/register"} className={cl.linkSingUp}>
          Sing Up
        </Link>
      </div>
    </div>
  )
}
