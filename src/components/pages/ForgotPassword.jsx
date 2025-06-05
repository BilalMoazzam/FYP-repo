"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/AuthService"
import "../styles/ForgotPassword.css"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setEmail(e.target.value)
    // Clear errors when user starts typing
    if (errors.email || errors.general) {
      setErrors({})
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      // Call password reset service
      await AuthService.resetPassword(email)

      // Show success message
      setSuccess(true)
    } catch (error) {
      console.error("Password reset error:", error)
      setErrors({
        general: "Failed to send reset email. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    navigate("/login")
  }

  const handleResendEmail = () => {
    setSuccess(false)
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="card-header">
          <div className="logo-container">
            <img src="/web-logo.png" alt="StockChain AI" className="logo" />
          </div>
          <h1>Forgot Password</h1>
          <p className="subtitle">Enter your email to receive a password reset link</p>
        </div>

        {success ? (
          <div className="success-container">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="64" height="64">
                <circle cx="12" cy="12" r="11" fill="#4CAF50" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2>Check Your Email</h2>
            <p className="email-sent-to">We've sent a password reset link to:</p>
            <div className="email-address">{email}</div>
            <p className="instructions">
              Please check your inbox and follow the instructions to reset your password. If you don't see the email,
              check your spam folder.
            </p>
            <div className="action-buttons">
              <button className="primary-button" onClick={handleBackToLogin}>
                Back to Login
              </button>
              <button className="secondary-button" onClick={handleResendEmail}>
                Resend Email
              </button>
            </div>
          </div>
        ) : (
          <div className="form-container">
            {errors.general && (
              <div className="error-banner">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <circle cx="12" cy="12" r="10" fill="#f44336" />
                  <path d="M12 8v5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1" fill="#fff" />
                </svg>
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-container">
                  <svg className="input-icon" viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M22 6l-10 7L2 6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    disabled={loading}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Remember your password? <Link to="/login">Back to Login</Link>
              </p>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
