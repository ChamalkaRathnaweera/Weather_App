import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="error-modal">
      <div className="modal-content">
        <span className="warning-sign">⚠️</span>
        <p className="modal-message">{message}</p>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default ErrorModal;
