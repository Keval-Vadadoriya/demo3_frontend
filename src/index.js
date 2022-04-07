import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#D4A59A",
      light: "#F3E0DC",
      dark: "#AAA0A0",
    },
    secondary: {
      main: "#5C2018",

      light: "#BC4639",
      dark: "#FFCCBC",
    },
    third: {
      main: "#ffd7a3",
      light: "#F7F9FB",
      extra: "#ffe8ca",
      dark: "#705839",
    },
    fourth: {
      main: "#4285F4",
      light: "#90CCF4",
      dark: "#5DA2D5",
    },

    fifth: {
      main: "#8FC1E3",
      light: "#F7F9FB",
      dark: "#5085A5",
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
