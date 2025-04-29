"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Logout.css"

const Logout = () => {
  const [showConfirmation, setShowConfirmation] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  // When component mounts, show the confirmation dialog
  useEffect(() => {
    // If user navigated directly to this page, show confirmation
    document.body.classList.add("logout-page-active")

    return () => {
      document.body.classList.remove("logout-page-active")
    }
  }, [])

  // Handle the actual logout process
  const handleLogout = () => {
    setIsLoggingOut(true)

    // Clear session and user-related data
    clearAppState()

    // Simulate API call to logout (simulate delay for logout animation)
    setTimeout(() => {
      // Clear user session/token from localStorage and sessionStorage
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      sessionStorage.removeItem("user")

      // Redirect to login page after state and session cleanup
      navigate("/login")
    }, 500)  // Simulate some delay for a smoother transition
  }

  // Function to clear any application-specific state (e.g., Redux, Context)
  const clearAppState = () => {
    console.log("Clearing application state...")

    // Example: If using Redux, you might dispatch a reset action
    // dispatch({ type: 'RESET_APP_STATE' })
  }

  // Handle Cancel Logout action
  const handleCancel = () => {
    // Close the confirmation and navigate back to the previous page
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
                <button
                  className="btn-yes"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Yes"}
                </button>
                <button
                  className="btn-no"
                  onClick={handleCancel}
                  disabled={isLoggingOut}
                >
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
