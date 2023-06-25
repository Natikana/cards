import React from "react"
import { useForm } from "react-hook-form"
import { LoginType } from "../auth/auth.api/auth.api"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "../auth/auth.slice"
import { Link, useNavigate } from "react-router-dom"

export const Login = () => {
  console.log("login")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<LoginType>()
  console.log(errors)

  const onSubmit = handleSubmit((data: LoginType) => {
    dispatch(authThunk.login(data))
      .unwrap()
      .then((res) => {
        if (res.profile) {
          navigate("/cards")
        }
        console.log("res", res)
      })
      .catch()
  })

  const onHandlerSubmit = () => {
    setValue("email", getValues("email"))
    setValue("password", getValues("password"))
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h3>Sing in</h3>
      <form
        onSubmit={onSubmit}
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
          style={{ height: "40px", width: "250px" }}
        />
        {errors?.email?.type === "required" && <p>This field is required</p>}
        {errors?.email?.type === "maxLength" && (
          <p>Email cannot more 30 characters</p>
        )}
        {errors?.email?.type === "minLength" && (
          <p>Email cannot less 8 characters</p>
        )}
        {errors?.email?.type === "pattern" && <p>Invalid email address</p>}
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
          style={{ height: "40px", width: "250px" }}
        />
        {errors?.password?.type === "required" && <p>This field is required</p>}
        {errors?.password?.type === "maxLength" && (
          <p>Password cannot more 20 characters</p>
        )}
        {errors?.password?.type === "minLength" && (
          <p>Password cannot less 8 characters</p>
        )}
        {errors?.password?.type === "pattern" && <p>Invalid password</p>}
        <input
          {...register("rememberMe", {
            onChange: () => {
              getValues("rememberMe")
            },
          })}
          type={"checkbox"}
        />
        <span style={{ color: "black", fontSize: "12" }}>Remember me</span>
        <Link to="/forgot-password">Forgot Password?</Link>
        <button
          type={"submit"}
          onClick={onHandlerSubmit}
          style={{
            backgroundColor: "blue",
            color: "white",
            width: "150px",
            height: "40px",
            borderRadius: "3px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sing in
        </button>
      </form>

      <span style={{ color: "gray", fontSize: "12" }}>
        Don't have an account?
      </span>
      <Link to={"/register"} style={{ color: "blue", fontSize: "16" }}>
        Sing Up
      </Link>
    </div>
  )
}
