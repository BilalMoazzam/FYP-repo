"use client";

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles/Login.css";
import scmFrontImage from '../../assets/scm-front.jpg'; // Correct path to assets folder

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);  // Use null initially for loading state
  const navigate = useNavigate();

  // Redirect user if already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AuthService.isLoggedIn();
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        navigate("/dashboard");  // Redirect to dashboard if logged in
      }
    };
    checkLoginStatus();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Call login service and set login state
      const isSuccess = await AuthService.login(formData.username, formData.password, formData.rememberMe);

      if (isSuccess) {
        setIsLoggedIn(true);  // Update login state to true
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        ...errors,
        general: "Invalid username or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password page or show modal
    navigate("/forgot-password");
  };

  if (isLoggedIn === null) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div
      className="auth-page login-page"
      style={{
        backgroundImage: `url(${scmFrontImage})`, // Use the imported image path
      }}
    >
      <div className="auth-container">
        <div className="auth-content">
          <h1>Login Page</h1>
          <p className="auth-subtitle">Please fill in your information</p>

          {errors.general && <div className="error-message">{errors.general}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "error" : ""}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="form-group">
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

            <div className="form-row">
              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                  <span>Remember me</span>
                </label>
              </div>
              <div className="forgot-password">
                <span onClick={handleForgotPassword}>Forgot password?</span>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={errors.agreeTerms ? "error" : ""}
                />
                <span>Agree with Terms & Conditions</span>
              </label>
              {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
