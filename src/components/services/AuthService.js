const API_URL = "http://localhost:5000/api/auth"

const AuthService = {
  // ✅ Register new user
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Registration failed")
    }

    return await response.json()
  },

  // Check if user is logged in
  isLoggedIn: () => {
    try {
      const token = localStorage.getItem("authToken")
      return !!token
    } catch (error) {
      console.error("Error checking auth status:", error)
      return false
    }
  },

  // Login user
  login: (email, password, rememberMe = false) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const token = "demo-token-" + Math.random().toString(36).substring(2)
          const user = {
            id: 1,
            name: "Demo User",
            email: email,
            role: "admin",
          }

          localStorage.setItem("authToken", token)
          localStorage.setItem("user", JSON.stringify(user))

          if (rememberMe) {
            localStorage.setItem("rememberMe", "true")
          }

          resolve({ success: true, user })
        } catch (error) {
          reject(error)
        }
      }, 800)
    })
  },

  // Forgot Password - Send reset email
  resetPassword: (email) => {
    return new Promise((resolve, reject) => {
      console.log("Sending reset email to:", email)

      setTimeout(() => {
        try {
          if (!email || !/\S+@\S+\.\S+/.test(email)) {
            reject(new Error("Please enter a valid email address"))
            return
          }

          localStorage.setItem("resetEmail", email)

          console.log("Reset email sent successfully to:", email)

          resolve({
            success: true,
            message: "Password reset email sent successfully",
          })
        } catch (error) {
          console.error("Reset password error:", error)
          reject(new Error("Failed to send reset email. Please try again."))
        }
      }, 1500)
    })
  },

  // Verify reset token
  verifyResetToken: (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!token || token.length < 20) {
            reject(new Error("Invalid or expired reset token"))
            return
          }

          if (token.startsWith("expired")) {
            reject(new Error("Reset token has expired"))
            return
          }

          resolve({
            valid: true,
            email: localStorage.getItem("resetEmail") || "user@example.com",
          })
        } catch (error) {
          reject(new Error("Invalid or expired reset token"))
        }
      }, 800)
    })
  },

  // Update password with token
  updatePassword: (token, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!token || token.length < 20) {
            reject(new Error("Invalid reset token"))
            return
          }

          if (!newPassword || newPassword.length < 8) {
            reject(new Error("Password must be at least 8 characters long"))
            return
          }

          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
            reject(
              new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
            )
            return
          }

          console.log("Password updated successfully")
          localStorage.removeItem("resetEmail")

          resolve({
            success: true,
            message: "Password updated successfully",
          })
        } catch (error) {
          reject(new Error("Failed to update password"))
        }
      }, 1200)
    })
  },

  generateResetToken: () => {
    return "reset_" + Math.random().toString(36).substring(2) + Date.now().toString(36)
  },

  logout: () => {
    try {
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
      localStorage.removeItem("rememberMe")
      localStorage.removeItem("resetEmail")
      return true
    } catch (error) {
      console.error("Error during logout:", error)
      return false
    }
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },

  getToken: () => {
    return localStorage.getItem("authToken")
  },
}

export default AuthService
