class AuthService {
  isLoggedIn() {
    return new Promise((resolve) => {
      // Check if a token is present in localStorage or sessionStorage
      resolve(!!this.getToken());
    });
  }

  getToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  login(username, password, rememberMe = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!username || !password) {
          reject(new Error("Invalid credentials"));
          return;
        }

        const token = "mock-jwt-token-" + Math.random().toString(36).substr(2);
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
      }, 1000);
    });
  }

  // Other methods remain unchanged...
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
