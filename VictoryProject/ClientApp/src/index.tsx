import {App} from "./App";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Store from "./state/store";
import {Provider} from "react-redux";
import React from "react";

ReactDOM.render(

    <Provider store={Store}>
  <App/>
    </Provider>
,document.getElementById("root")
);

reportWebVitals();
