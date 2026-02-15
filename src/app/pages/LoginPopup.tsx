import React from "react";
import "../../styles/LoginPopup.css";

interface LoginPopupProps {
  close: () => void;
}

export default function LoginPopup({ close }: LoginPopupProps) {
  return (
    <div className="popup-bg" onClick={close}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={close}>
          &times;
        </span>
        
        <h2 className="popup-title">Login Required</h2>
        
        <p className="popup-text">
          You need to login or signup to access this feature.
        </p>
        
        <div className="popup-buttons">
          <button
            className="popup-btn login-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          
          <button
            className="popup-btn signup-btn"
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}