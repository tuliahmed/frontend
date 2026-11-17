import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import mystore from "./reduxstore/Store.jsx";
import { Provider } from "react-redux";

// The single-file preview build uses hash URLs so it works when opened as a file.
const Router = import.meta.env.MODE === "single" ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={mystore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
