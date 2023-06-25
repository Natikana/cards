import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import React from "react"
import { store } from "@/main/store"
import { App } from "@/features/app/App"

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
