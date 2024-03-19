
import React from 'react';
import './Alert.style.css';

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert">
            {message}
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default Alert;
