import React from "react";
import ReactDOM from "react-dom";

import "./static/scss/index.scss";

import { Provider } from "react-redux";
import Store from "./state/store";

import { Header } from "./Main_components/Header";

import { Register } from "./Main_pages/Register";
import { OrgBasePage } from "./OrganisatorPages/OrgBasePage";
import { ContestPage } from "./Main_pages/ContestPage";
import { NotFound } from "./Extra_pages/404";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <React.StrictMode>
        <Header />
        <Routes>
          <Route path="" element={<OrgBasePage />} />
          <Route path="signup" element={<Register />} />
          <Route path="main" element={<OrgBasePage />} />
          <Route path="contest/:id" element={<ContestPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
