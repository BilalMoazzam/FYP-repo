"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import "../styles/LogoutButton.css";

const LogoutButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Simulate API call to logout
    setTimeout(() => {
      try {
        // Clear user session/token
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // Clear any other app state that should be reset
        clearAppState();

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Error clearing storage or session:", error);
      }
    }, 1000);
  };

  const clearAppState = () => {
    // Clear any app-specific state that should be reset on logout
    console.log("Clearing application state...");
    // Example: If using Redux, you might dispatch a reset action
    // dispatch({ type: 'RESET_APP_STATE' });
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="logout-button-container" onClick={handleLogoutClick}>
        <LogOut size={20} />
        <span>Logout</span>
      </div>

      {showConfirmation && (
        <div className="logout-modal-overlay">
          <div className="logout-confirmation-modal">
            <div className="confirmation-content">
              <h2>Do you want to logout?</h2>

              <div className="confirmation-buttons">
                <button className="btn-yes" onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut ? "Logging out..." : "Yes"}
                </button>
                <button className="btn-no" onClick={handleCancel} disabled={isLoggingOut}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutButton;
