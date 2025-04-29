import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Import all necessary components/pages
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import InventoryManagement from "./components/pages/InventoryManagement";
import OrderManagement from "./components/pages/OrderManagement";
import SupplyChainOverview from "./components/pages/SupplyChainOverview";
import AnalyticsReport from "./components/pages/AnalyticsReport";
import UserManagement from "./components/pages/UserManagement";
import BlockchainTransaction from "./components/pages/BlockchainTransaction";
import NotificationPage from "./components/pages/NotificationPage";
import HelpSupport from "./components/pages/HelpSupport";
import Settings from "./components/pages/Settings";
import Logout from "./components/pages/Logout";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ForgotPassword from "./components/pages/ForgotPassword";
import AuthGuard from "./components/AuthGuard";
import AuthService from "./components/services/AuthService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check if the user is logged in when the app starts
    setIsLoggedIn(AuthService.isLoggedIn());
  }, []);

  if (isLoggedIn === null) {
    // Wait until login status is determined before rendering anything
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {/* Always render these public routes */}
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>

        {/* Show Sidebar and Content only if logged in */}
        {isLoggedIn && (
          <>
            <Sidebar />
            <div className="content with-sidebar">
              <Routes>
                <Route path="/" element={<AuthGuard><Dashboard /></AuthGuard>} />
                <Route path="/inventory" element={<AuthGuard><InventoryManagement /></AuthGuard>} />
                <Route path="/orders" element={<AuthGuard><OrderManagement /></AuthGuard>} />
                <Route path="/supply-chain" element={<AuthGuard><SupplyChainOverview /></AuthGuard>} />
                <Route path="/analytics" element={<AuthGuard><AnalyticsReport /></AuthGuard>} />
                <Route path="/users" element={<AuthGuard><UserManagement /></AuthGuard>} />
                <Route path="/blockchain" element={<AuthGuard><BlockchainTransaction /></AuthGuard>} />
                <Route path="/notifications" element={<AuthGuard><NotificationPage /></AuthGuard>} />
                <Route path="/help" element={<AuthGuard><HelpSupport /></AuthGuard>} />
                <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
                <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
                {/* Redirect unknown routes */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}

        {/* Redirect to login page if not logged in */}
        {!isLoggedIn && (
          <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
