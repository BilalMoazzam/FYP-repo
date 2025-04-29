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
    setErrors({})
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

  return (
    <div className="auth-page forgot-password-page">
      <div className="auth-container">
        <div className="auth-content">
          <h1>Forgot Password</h1>
          <p className="auth-subtitle">Enter your email address and we'll send you a link to reset your password</p>

          {success ? (
            <div className="success-message">
              <p>Password reset link has been sent to your email.</p>
              <p>Please check your inbox and follow the instructions.</p>
              <button className="auth-button" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </div>
          ) : (
            <>
              {errors.general && <div className="error-message">{errors.general}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? "Sending..." : "Reset Password"}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Remember your password? <Link to="/login">Back to Login</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
