import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  theme,
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core"

const Main = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const root = document.getElementById("root")
if (root) ReactDOM.createRoot(root).render(<Main />)
