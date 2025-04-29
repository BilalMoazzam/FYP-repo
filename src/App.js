"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

// Import all necessary components/pages
import Sidebar from "./components/layout/Sidebar"
import Dashboard from "./components/pages/Dashboard"
import InventoryManagement from "./components/pages/InventoryManagement"
import OrderManagement from "./components/pages/OrderManagement"
import SupplyChainOverview from "./components/pages/SupplyChainOverview"
import AnalyticsReport from "./components/pages/AnalyticsReport"
import UserManagement from "./components/pages/UserManagement"
import BlockchainTransaction from "./components/pages/BlockchainTransaction"
import NotificationPage from "./components/pages/NotificationPage"
import HelpSupport from "./components/pages/HelpSupport"
import Settings from "./components/pages/Settings"
import Logout from "./components/pages/Logout"
import Login from "./components/pages/Login"
import Signup from "./components/pages/Signup"
import ForgotPassword from "./components/pages/ForgotPassword"
import AuthService from "./components/services/AuthService"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuthStatus = () => {
      const authStatus = AuthService.isLoggedIn()
      setIsLoggedIn(authStatus)
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    AuthService.logout()
    setIsLoggedIn(false)
  }

  if (isLoading) {
    return <div className="app-loading">Loading...</div>
  }

  // Completely different layout for auth pages vs app pages
  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  // App layout with sidebar for authenticated users
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/supply-chain" element={<SupplyChainOverview />} />
            <Route path="/analytics" element={<AnalyticsReport />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/blockchain" element={<BlockchainTransaction />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/help" element={<HelpSupport />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
