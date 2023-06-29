import { useRouteError } from "react-router-dom"
import React from "react"

export const ErrorPage = () => {
  //const error = useRouteError();

  return (
    <div
      id="error-pa
        ge"
    >
      <h1 style={{ color: "green" }}>Oops!</h1>
      <p style={{ color: "green" }}>Sorry, an unexpected error has occurred.</p>
      {/*<p>
                 <i>{error.statusText || error.message}</i>
            </p>*/}
    </div>
  )
}
