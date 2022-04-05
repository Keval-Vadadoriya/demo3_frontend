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
      main: "#555555",
      light: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    red: {
      main: "#FF1744",
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.3rem",
    },
    h6: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
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
