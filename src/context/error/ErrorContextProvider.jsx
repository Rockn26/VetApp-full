import React, { useState } from "react";
import ErrorContext from "./ErrorContext";

const ErrorContextProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const errorHolder = {
        showAlert,
        setShowAlert,
        alertMessage,
        setAlertMessage,
    };
    return <ErrorContext.Provider value={errorHolder}>
        {children}
        </ErrorContext.Provider>;
};

export default ErrorContextProvider;

    