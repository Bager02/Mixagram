import React from "react";
import '../css/ConfirmPopup.css';

function ConfirmPopup({ isOpen, message, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                <div className="popup-buttons">
                    <button className="popup-confirm" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="popup-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmPopup;