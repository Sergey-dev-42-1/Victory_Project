import React from "react";
import ReactDOM from "react-dom";
import "./static/scss/index.scss";
import { App } from "./App";
import { Header } from "./Main_components/Header";
import { Register } from "./Main_pages/Register";
import { Footer } from "./Main_components/Footer";
import { BasePage } from "./OrganisatorPages/BasePage";
import { NotFound } from "./Extra_pages/404";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path="" element={<App />} />
        <Route path="signup" element={<Register />} />
        <Route path="organisator" element={<BasePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
