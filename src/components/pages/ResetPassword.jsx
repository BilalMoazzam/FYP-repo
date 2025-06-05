"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import AuthService from "../services/AuthService"
import "../styles/ResetPassword.css"

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState(null)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await AuthService.verifyResetToken(token)
        setTokenValid(response.valid)
      } catch (error) {
        console.error("Token verification error:", error)
        setTokenValid(false)
      }
    }
  
    if (token) {
      verifyToken()
    } else {
      setTokenValid(false)
    }
  }, [token])
  

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 12.5
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5
    return Math.min(strength, 100)
  }

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return "Very Weak"
    if (strength < 50) return "Weak"
    if (strength < 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return "#f44336"
    if (strength < 50) return "#ff9800"
    if (strength < 75) return "#2196f3"
    return "#4caf50"
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === "password") {
      const strength = calculatePasswordStrength(value)
      setPasswordStrength(strength)
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setLoading(true)
      setErrors({})

      const response = await AuthService.resetPassword(token, formData.password)

      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          navigate("/login", {
            state: {
              message: "Password reset successful! Please login with your new password.",
            },
          })
        }, 3000)
      } else {
        setErrors({ general: response.message || "Failed to reset password" })
      }
    } catch (error) {
      console.error("Password reset error:", error)
      setErrors({
        general: error.message || "Failed to reset password. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (tokenValid === false) {
    return (
      <div className="enhanced-auth-page">
        <div className="auth-background-overlay"></div>
        <div className="enhanced-auth-container">
          <div className="auth-form-box">
            <div className="error-container">
              <div className="error-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#f44336" />
                  <line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="2" />
                  <line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <h2>Invalid or Expired Link</h2>
              <p>This password reset link is invalid or has expired.</p>
              <p>Password reset links are only valid for 1 hour.</p>
              <div className="error-actions">
                <Link to="/forgot-password" className="submit-btn">
                  Request New Reset Link
                </Link>
                <Link to="/login" className="secondary-btn">
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (tokenValid === null) {
    return (
      <div className="enhanced-auth-page">
        <div className="auth-background-overlay"></div>
        <div className="enhanced-auth-container">
          <div className="auth-form-box">
            <div className="loading-container">
              <div className="loading-spinner large"></div>
              <p>Verifying reset link...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="enhanced-auth-page">
      <div className="auth-background-overlay"></div>
      <div className="enhanced-auth-container">
        <div className="auth-form-box">
          <div className="auth-header">
            <h1>Reset Password</h1>
            <p>Enter your new password below</p>
          </div>

          {success ? (
            <div className="success-container">
              <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                  <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2>Password Reset Successful!</h2>
              <p>Your password has been successfully reset.</p>
              <p>You will be redirected to the login page in a few seconds...</p>
              <div className="success-actions">
                <Link to="/login" className="submit-btn">
                  Go to Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              {errors.general && (
                <div className="error-alert">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#f44336" />
                    <line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="2" />
                    <line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="2" />
                  </svg>
                  {errors.general}
                </div>
              )}

              <form className="enhanced-auth-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="password">New Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    disabled={loading}
                  />
                  {errors.password && <span className="field-error">{errors.password}</span>}

                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div
                          className="strength-fill"
                          style={{
                            width: `${passwordStrength}%`,
                            backgroundColor: getPasswordStrengthColor(passwordStrength),
                          }}
                        ></div>
                      </div>
                      <span className="strength-text" style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <span className="field-error">{errors.confirmPassword}</span>
                  )}
                </div>

                <div className="password-requirements">
                  <h4>Password Requirements:</h4>
                  <ul>
                    <li className={formData.password.length >= 8 ? "valid" : ""}>
                      At least 8 characters long
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? "valid" : ""}>
                      At least one uppercase letter
                    </li>
                    <li className={/[a-z]/.test(formData.password) ? "valid" : ""}>
                      At least one lowercase letter
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? "valid" : ""}>
                      At least one number
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(formData.password) ? "valid" : ""}>
                      Special character (optional but recommended)
                    </li>
                  </ul>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
