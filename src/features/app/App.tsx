import "../../App.css"
import React, { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/main/hooks"
import cl from "./app.module.css"
import { authThunk } from "../auth/auth.slice"
import { router } from "@/common/routes/commonRoutes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Loader } from "@/common/loading/Loader"
import { Statuses } from "@/features/app/app.slice"

export function App() {
  console.log("app")
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector((state) => state.auth.isInitialized)
  //const isLoading = useAppSelector((state) => state.app.isLoading)

  useEffect(() => {
    dispatch(authThunk.me({}))
  }, [])

  if (!isInitialized)
    return (
      <div>
        <Loader />
      </div>
    )

  return (
    <div className={cl.app}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
