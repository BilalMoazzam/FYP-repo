"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthService from "../services/AuthService"
import "../styles/Signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "", // Changed from phoneNo to phone
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Updated roles to match backend enum values
  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Employee", label: "Employee" }, // Changed from "user" to "Employee"
    { value: "Viewer", label: "Viewer" },
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

    if (!formData.phone.trim()) {
      // Changed from phoneNo to phone
      newErrors.phone = "Phone number is required"
    } else if (!/^03\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Pakistani number starting with 03"
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
      setErrors({}) // Clear previous errors

      // Create user object from form data
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone, // Changed from phoneNo to phone
        role: formData.role,
        email: formData.email,
        password: formData.password,
      }

      console.log("Sending registration data:", userData) // Debug log

      // Call register service
      const result = await AuthService.register(userData)

      if (result.success) {
        // Show success message or redirect to login
        navigate("/login", {
          state: {
            message: "Registration successful! Please login with your credentials.",
          },
        })
      } else {
        setErrors({
          general: result.message || "Registration failed. Please try again.",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)

      // Better error handling
      let errorMessage = "Registration failed. Please try again."

      if (error.message) {
        errorMessage = error.message
      }

      setErrors({
        general: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="enhanced-auth-page signup-page">
      <div className="auth-background-overlay"></div>

      <div className="enhanced-auth-container signup-container">
        <div className="auth-form-box signup-box">
          <div className="auth-header">
            <h1>Sign up</h1>
            <p>Fill your Information below</p>
          </div>

          {errors.general && <div className="error-alert">{errors.general}</div>}

          <form className="enhanced-auth-form signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`form-input ${errors.firstName ? "error" : ""}`}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>

              <div className="form-field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input ${errors.lastName ? "error" : ""}`}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Phone No</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "error" : ""}`}
                  placeholder="03xxxxxxxxx"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="form-field">
                <label>Role Selection</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`form-input ${errors.role ? "error" : ""}`}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
                {errors.role && <span className="field-error">{errors.role}</span>}
              </div>
            </div>

            <div className="form-field full-width">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "error" : ""}`}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <div className="form-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${errors.confirmPassword ? "error" : ""}`}
                />
                {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          <div className="auth-footer-link">
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
