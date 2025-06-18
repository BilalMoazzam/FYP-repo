import { Navigate } from "react-router-dom"
import AuthService from "./services/AuthService"

// This component protects routes that require authentication
const AuthGuard = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = AuthService.isLoggedIn()

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the protected route
  return children
}

export default AuthGuard
