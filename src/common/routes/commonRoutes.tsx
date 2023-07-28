import React, { FC, PropsWithChildren } from "react"
import { useAppSelector } from "@/main/hooks"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { ErrorPage } from "@/features/errorPage/ErrorPage"
import { Profile } from "@/features/profile/Profile"
import { Packs } from "@/features/packs/Packs"
import { Cards } from "@/features/cards/Cards"
import { Login } from "@/features/login/Login"
import { Register } from "@/features/register/Register"
import { NewPassword } from "@/features/newPassword/NewPassword"
import { ForgotPassword } from "@/features/forgotPassword/ForgotPassword"
import { ToolBar } from "@/features/toolBar/ToolBar"
import { Learn } from "@/features/learn/Learn"
import { CheckEmail } from "@/features/checkEmail/CheckEmail"

const AuthGuard: FC<PropsWithChildren & { isPrivate?: boolean }> = ({
  children,
  isPrivate = false,
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  if (isPrivate) {
    return isAuth ? (
      <ToolBar>{children}</ToolBar>
    ) : (
      <Navigate to={"/login"} replace />
    )
  }
  return isAuth ? (
    <Navigate to={"/packs"} replace />
  ) : (
    <ToolBar>{children}</ToolBar>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/profile" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <AuthGuard isPrivate>
        <Profile />
      </AuthGuard>
    ),
  },
  {
    path: "/packs",
    element: (
      <AuthGuard isPrivate>
        <Packs />
      </AuthGuard>
    ),
  },
  {
    path: "/cards",
    element: (
      <AuthGuard isPrivate>
        <Cards />
      </AuthGuard>
    ),
  },
  {
    path: "/learn",
    element: (
      <AuthGuard isPrivate>
        <Learn />
      </AuthGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthGuard>
        <Login />
      </AuthGuard>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthGuard>
        <Register />
      </AuthGuard>
    ),
  },
  {
    path: "/new-password/:token",
    element: (
      <AuthGuard>
        <NewPassword />
      </AuthGuard>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthGuard>
        <ForgotPassword />
      </AuthGuard>
    ),
  },
  {
    path: "/check-email",
    element: (
      <AuthGuard>
        <CheckEmail />
      </AuthGuard>
    ),
  },
])
