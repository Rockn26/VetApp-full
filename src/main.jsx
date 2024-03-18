import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorContextProvider from "./context/error/ErrorContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ErrorContextProvider>
            <App />
        </ErrorContextProvider>
    </BrowserRouter>
);
