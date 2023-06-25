import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./features/app/App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./main/store"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
