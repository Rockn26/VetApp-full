import React, { useState } from "react";
import ErrorContext from "./ErrorContext";
import ErrorAlert from "./ErrorAlert";

const ErrorContextProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
  
    const handleCloseAlert = () => setShowAlert(false);
  
    return (
      <ErrorContext.Provider value={{ showAlert, setShowAlert, alertMessage, setAlertMessage }}>
        {children}
        {showAlert && <ErrorAlert message={alertMessage} onClose={handleCloseAlert} />}
      </ErrorContext.Provider>
    );
  };

export default ErrorContextProvider;

    