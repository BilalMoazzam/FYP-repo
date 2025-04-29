"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/AuthService"
import "../styles/Signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "user", label: "User" },
    { value: "viewer", label: "Viewer" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required"
    } else if (!/^\d{10}$/.test(formData.phoneNo.replace(/[-()\s]/g, ""))) {
      newErrors.phoneNo = "Please enter a valid phone number"
    }

    if (!formData.role) {
      newErrors.role = "Please select a role"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      // Create user object from form data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNo: formData.phoneNo,
        role: formData.role,
        email: formData.email,
        password: formData.password,
      }

      // Call register service
      await AuthService.register(userData)

      // Show success message or redirect to login
      navigate("/login", {
        state: {
          message: "Registration successful! Please login with your credentials.",
        },
      })
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({
        ...errors,
        general: "Registration failed. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-content">
          <h1>Sign up</h1>
          <p className="auth-subtitle">Fill your information below</p>

          {errors.general && <div className="error-message">{errors.general}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group half-width">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "error" : ""}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-group half-width">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "error" : ""}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <input
                  type="text"
                  name="phoneNo"
                  placeholder="Phone No."
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={errors.phoneNo ? "error" : ""}
                />
                {errors.phoneNo && <span className="error-text">{errors.phoneNo}</span>}
              </div>

              <div className="form-group half-width">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={errors.role ? "error" : ""}
                >
                  <option value="">Role Selection</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && <span className="error-text">{errors.role}</span>}
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group half-width">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-group half-width">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
