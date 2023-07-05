import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../main/hooks"
import { authThunk } from "../auth/auth.slice"
import { useForm } from "react-hook-form"
import { LoginType, RegisterType } from "../auth/auth.api/auth.api"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { AppDispatch } from "@/main/store"
import { useDispatch } from "react-redux"

export const Register = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  //let [error, setError] = useState<string | null>()
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h3>Sing Up</h3>
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
        {errors?.email?.type === "required" && (
          <p style={{ color: "red" }}>This field is required</p>
        )}
        {errors?.email?.type === "maxLength" && (
          <p style={{ color: "red" }}>Email cannot more 30 characters</p>
        )}
        {errors?.email?.type === "minLength" && (
          <p style={{ color: "red" }}>Email cannot less 8 characters</p>
        )}
        {errors?.email?.type === "pattern" && (
          <p style={{ color: "red" }}>Invalid email address</p>
        )}
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
        {errors?.password?.type === "required" && (
          <p style={{ color: "green" }}>This field is required</p>
        )}
        {errors?.password?.type === "maxLength" && (
          <p style={{ color: "red" }}>Password cannot more 20 characters</p>
        )}
        {errors?.password?.type === "minLength" && (
          <p style={{ color: "red" }}>Password cannot less 8 characters</p>
        )}
        {errors?.password?.type === "pattern" && (
          <p style={{ color: "red" }}>Invalid password</p>
        )}

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
          style={{ height: "40px", width: "250px" }}
        />
        {errors.confirm_password && (
          <span style={{ color: "red" }}>
            {errors.confirm_password.message}
          </span>
        )}

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
          Sing up
        </button>
      </form>
      <span style={{ color: "gray", fontSize: "12" }}>
        Already have an account?
      </span>
      <Link to={"/login"} style={{ color: "blue", fontSize: "16" }}>
        Sing In
      </Link>
    </div>
  )
}
