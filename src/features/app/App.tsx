import "../../App.css"
import React, { FC, PropsWithChildren, useEffect } from "react"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { Login } from "../login/Login"
import { NewPassword } from "../newPassword/NewPassword"
import { ForgotPassword } from "../forgotPassword/ForgotPassword"
import { Profile } from "../profile/Profile"
import { Packs } from "../packs/Packs"
import { Cards } from "../cards/Cards"
import { Learn } from "../learn/Learn"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import { Register } from "../register/Register"
import { ToolBar } from "../toolBar/ToolBar"
import cl from "./app.module.css"
import { authThunk } from "../auth/auth.slice"

const AuthGuard: FC<PropsWithChildren & { isPrivate?: boolean }> = ({
  children,
  isPrivate = false,
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  if (isPrivate) {
    return isAuth ? <>{children}</> : <Navigate to={"/login"} replace />
  }
  return isAuth ? <Navigate to={"/cards"} replace /> : <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/profile" />,
  },
  {
    element: (
      <AuthGuard isPrivate>
        <Profile />
      </AuthGuard>
    ),
    path: "/profile",
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
])

export function App() {
  console.log("app")
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector((state) => state.auth.isInitialized)

  useEffect(() => {
    dispatch(authThunk.me({}))
  }, [])

  if (!isInitialized) return <p>Loading...</p>

  return (
    <div className={cl.app}>
      <ToolBar />
      <RouterProvider router={router} />
    </div>
  )
}
//
// const rotesConfigure = [
//   {
//     path: "/",
//     element: <Counter />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/new-password",
//     element: <NewPassword />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/packs",
//     element: <Packs />,
//   },
//   {
//     path: "/cards",
//     element: <Cards />,
//   },
//   {
//     path: "/learn",
//     element: <Learn />,
//   },
// ]

// const router = createBrowserRouter(
//   rotesConfigure.map(({ path, element }, index) => ({
//     path,
//     element: <AuthGuard key={index}>{element}</AuthGuard>,
//   })),
// )
