import React from "react";
import ReactDOM from "react-dom";
import "./static/scss/index.scss";

import { Provider } from "react-redux";
import Store from "./state/store";

import { Header } from "./Main_components/Header";

import { Register } from "./Main_pages/RegisterPage/Register";
import { OrgBasePage } from "./OrganisatorPages/OrgBasePage";
import { ContestPage } from "./Contest/ContestPage";
import { NotFound } from "./Extra_pages/404";

import { ThemeProvider } from "@material-ui/core";
import { defaultTheme } from "./MaterialUI/Themes";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Router } from "@reach/router";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={Store}>
    <ThemeProvider theme={defaultTheme}>
      <React.StrictMode>
        <CssBaseline />
        <Header />
        <Router id="routerWrapper">
          <OrgBasePage path="/" />
          <Register path="/signup" />

          <ContestPage path="/contest/:id" />
          <NotFound path="*" />
        </Router>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
