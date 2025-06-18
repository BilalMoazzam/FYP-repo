"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import ForecastingSettings from "../settings/ForecastingSettings"
import AIModels from "../settings/AIModels"
import NotificationPreferences from "../settings/NotificationPreferences"
import UserManagementSettings from "../settings/UserManagementSettings"
import "../styles/Settings.css"

const Settings = () => {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("all")
  const [settingsChanged, setSettingsChanged] = useState(false)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  const handleSectionChange = (section) => {
    setActiveSection(section)
  }

  const handleSettingsChange = () => {
    setSettingsChanged(true)
  }

  const handleSaveAll = () => {
    // In a real app, this would save all settings to the backend
    console.log("Saving all settings...")

    // Simulate API call
    setTimeout(() => {
      setSettingsChanged(false)
      alert("All settings saved successfully!")
    }, 1000)
  }

  return (
    <div className="settings-page">
      <Header
        title="Settings"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Settings", active: true },
        ]}
      />

      <div className="settings-container">
        {loading ? (
          <div className="loading">Loading settings...</div>
        ) : (
          <>
            <div className="settings-nav">
              <button
                className={`nav-item ${activeSection === "all" ? "active" : ""}`}
                onClick={() => handleSectionChange("all")}
              >
                All Settings
              </button>
              <button
                className={`nav-item ${activeSection === "forecasting" ? "active" : ""}`}
                onClick={() => handleSectionChange("forecasting")}
              >
                Forecasting
              </button>
              <button
                className={`nav-item ${activeSection === "ai" ? "active" : ""}`}
                onClick={() => handleSectionChange("ai")}
              >
                AI Models
              </button>
              <button
                className={`nav-item ${activeSection === "notifications" ? "active" : ""}`}
                onClick={() => handleSectionChange("notifications")}
              >
                Notifications
              </button>
              <button
                className={`nav-item ${activeSection === "users" ? "active" : ""}`}
                onClick={() => handleSectionChange("users")}
              >
                User Management
              </button>
            </div>

            <div className="settings-content">
              {(activeSection === "all" || activeSection === "forecasting") && (
                <ForecastingSettings onSettingsChange={handleSettingsChange} />
              )}

              {(activeSection === "all" || activeSection === "ai") && (
                <AIModels onSettingsChange={handleSettingsChange} />
              )}

              {(activeSection === "all" || activeSection === "notifications") && (
                <NotificationPreferences onSettingsChange={handleSettingsChange} />
              )}

              {(activeSection === "all" || activeSection === "users") && (
                <UserManagementSettings onSettingsChange={handleSettingsChange} />
              )}
            </div>

            {settingsChanged && (
              <div className="settings-footer">
                <button className="save-all-btn" onClick={handleSaveAll}>
                  Save All Changes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Settings
