// AuthService.js - Handles authentication-related functionality

class AuthService {
  // Check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  }

  // Get the authentication token
  getToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }

  // Get the current user
  getCurrentUser() {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  // Login user
  login(username, password, rememberMe = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password) {
          reject(new Error("Invalid credentials"));
          return;
        }

        const token = "mock-jwt-token-" + Math.random().toString(36).substring(2);
        const user = {
          id: 1,
          username: username,
          name: "Raj Mohan",
          role: "Admin",
          email: "raj.mohan@example.com",
        };

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", token);
        storage.setItem("user", JSON.stringify(user));

        resolve(true);
      }, 800);
    });
  }

  // Register new user
  register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Registering user:", userData);
        resolve({
          success: true,
          message: "User registered successfully",
        });
      }, 800);
    });
  }

  // Reset password
  resetPassword(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Password reset requested for:", email);
        resolve({
          success: true,
          message: "Password reset email sent",
        });
      }, 800);
    });
  }

  // Logout user
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    return true;
  }
}

// ✅ Create named instance before export to avoid ESLint warning
const authServiceInstance = new AuthService();
export default authServiceInstance;
