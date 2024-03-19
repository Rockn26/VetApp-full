import React from 'react';
import './ErrorContext.style.css'; 

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span className="closebtn" onClick={onClose}>&times;</span>
      {message}
    </div>
  );
};

export default ErrorAlert;
