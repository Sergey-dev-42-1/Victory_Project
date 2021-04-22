import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./static/scss/index.scss";

import { Provider } from "react-redux";
import Store from "./state/store";

import { Header } from "./Main_components/Header";

import { Register } from "./Main_pages/Register";
import { OrgBasePage } from "./OrganisatorPages/OrgBasePage";
import { ContestPage } from "./Contest/ContestPage";
import { NotFound } from "./Extra_pages/404";

import { Router } from "@reach/router";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <Header />
      <Router>
        <OrgBasePage path="/" />
        <Register path="/signup" />
        <OrgBasePage path="/main" />
        <ContestPage path="/contest/:id" />
        <NotFound path="*" />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
