import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./routes"
import { ThemeProvider } from "@mui/material"
import { LightTheme } from "./shared/theme"

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )

}