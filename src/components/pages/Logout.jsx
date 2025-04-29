"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Logout.css"

const Logout = ({ onLogout }) => {
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  // When component mounts, show the confirmation dialog
  useEffect(() => {
    document.body.classList.add("logout-page-active")

    return () => {
      document.body.classList.remove("logout-page-active")
    }
  }, [])

  const handleLogout = () => {
    setIsLoggingOut(true)

    // Small timeout to show the loading state
    setTimeout(() => {
      // Call the logout handler from parent
      if (onLogout) {
        onLogout()
      }

      // Navigate to login page
      navigate("/login")
    }, 800)
  }

  const handleCancel = () => {
    // Close the confirmation and navigate back to previous page
    setShowConfirmation(false)
    navigate(-1)
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
