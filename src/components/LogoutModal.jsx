"use client"

import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { createPortal } from "react-dom"
import "./styles/LogoutModal.css"

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("logout-modal-open")
    } else {
      document.body.classList.remove("logout-modal-open")
    }

    return () => {
      document.body.classList.remove("logout-modal-open")
    }
  }, [isOpen])

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      sessionStorage.removeItem("user")

      if (onLogout) onLogout()
      navigate("/login", { replace: true })
    }, 1000)
  }

  // ✅ Wrapped in useCallback
  const handleCancel = useCallback(() => {
    setIsLoggingOut(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && !isLoggingOut) {
        handleCancel()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, isLoggingOut, handleCancel]) // ✅ No warning now

  if (!isOpen) return null

  return createPortal(
    <div className="logout-modal-overlay">
      <div className="logout-modal-backdrop" onClick={!isLoggingOut ? handleCancel : undefined}></div>
      <div className="logout-modal">
        <div className="logout-modal-content">
          <div className="logout-modal-header">
            <h2>Confirm Logout</h2>
            {!isLoggingOut && (
              <button className="logout-modal-close" onClick={handleCancel}>
                ×
              </button>
            )}
          </div>

          <div className="logout-modal-body">
            <div className="logout-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="16,17 21,12 16,7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="21"
                  y1="12"
                  x2="9"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p>Are you sure you want to logout?</p>
            <span className="logout-subtitle">You will be redirected to the login page.</span>
          </div>

          <div className="logout-modal-buttons">
            <button className="btn-cancel" onClick={handleCancel} disabled={isLoggingOut}>
              Cancel
            </button>
            <button className="btn-logout" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? (
                <>
                  <span className="loading-spinner"></span>
                  Logging out...
                </>
              ) : (
                "Yes, Logout"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default LogoutModal
