"use client"

import { useState, useEffect } from "react"
import "../styles/Logout.css"

const Logout = ({ onLogout, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    document.body.classList.add("logout-page-active")
    return () => {
      document.body.classList.remove("logout-page-active")
    }
  }, [])

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      if (onLogout) {
        onLogout()
      }
    }, 800)
  }

  const handleCancel = () => {
    setShowConfirmation(false)
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="logout-page">
      <div className="logout-content">
        {showConfirmation && (
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
        )}
      </div>
    </div>
  )
}

export default Logout
