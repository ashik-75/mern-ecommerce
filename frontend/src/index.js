import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import store from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
const theme = createTheme();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<PlayWithMe />, document.getElementById("root"));
