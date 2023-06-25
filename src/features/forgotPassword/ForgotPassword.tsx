import React from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "@/main/hooks"
import { authThunk } from "@/features/auth/auth.slice"
import { useForm } from "react-hook-form"
import { ForgotUserType } from "@/features/auth/auth.api/auth.api"
/*{
    from: "hello82@gmail.com",
        email: "mashkovski82@gmail.com",
    message: `<div>password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>link
</a></div>`,
}*/
export const ForgotPassword = () => {
  const dispatch = useAppDispatch()

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
      <h3>Forgot Password</h3>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
          style={{ height: "40px", width: "250px" }}
        />
        <span>
          <p>
            Enter your email address and we will send you further instruction
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
          Send Instructions
        </button>
      </form>
      <span>Did you remember your password?</span>
      <Link to={"/login"}>Try logging in</Link>
    </div>
  )
}
