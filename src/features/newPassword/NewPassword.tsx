import React from "react"
import { useAppDispatch } from "@/main/hooks"
import { useForm } from "react-hook-form"
import { SetNewPasswordType } from "@/features/auth/auth.api/auth.api"
import { authThunk } from "@/features/auth/auth.slice"
import { useNavigate, useParams } from "react-router-dom"

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px, solid, gray",
        width: "420px",
        height: "456px",
        gap: "30px",
      }}
    >
      <h3>NewPassword</h3>
      <form onSubmit={onSubmit}>
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
        <span>
          <p>
            Create new password and we will send you further instruction to
            email
          </p>
        </span>
        <button
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
          Create New Password
        </button>
      </form>
    </div>
  )
}
