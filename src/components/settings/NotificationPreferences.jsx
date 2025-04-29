"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"

const NotificationPreferences = ({ onSettingsChange }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    thresholdEnabled: true,
    thresholdValue: 15,
    emailNotifications: true,
    pushNotifications: true,
    dailyDigest: false,
    lowStockAlerts: true,
    orderUpdates: true,
    systemAlerts: true,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading notification preferences
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  const handleToggleChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
    onSettingsChange()
  }

  const handleThresholdChange = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      thresholdValue: Number.parseInt(e.target.value),
    })
    onSettingsChange()
  }

  const handleSave = () => {
    // In a real app, this would save the notification settings to the backend
    console.log("Saving notification settings:", notificationSettings)
    alert("Notification preferences saved!")
  }

  return (
    <div className="settings-section notification-settings">
      <div className="section-header">
        <h2>Notification Preferences</h2>
      </div>

      {loading ? (
        <div className="loading-indicator">Loading notification preferences...</div>
      ) : (
        <>
          <div className="notification-group threshold-notification">
            <div className="notification-header">
              <h3>Threshold Notification</h3>
              <button className="configure-btn" onClick={() => handleToggleChange("thresholdEnabled")}>
                {notificationSettings.thresholdEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            <div className="notification-content">
              <p className="notification-description">
                Receive notifications when inventory levels fall below the specified threshold.
              </p>

              <div className="threshold-control">
                <label>Notify me when stock falls below:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={notificationSettings.thresholdValue}
                  onChange={handleThresholdChange}
                  disabled={!notificationSettings.thresholdEnabled}
                />
                <span>units</span>
              </div>
            </div>
          </div>

          <div className="notification-group delivery-preferences">
            <div className="notification-content with-icon">
              <div className="bell-icon">
                <Bell size={32} color="#FFC107" />
              </div>

              <div className="toggle-options">
                <div className="toggle-option">
                  <label>Send me email notifications</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleToggleChange("emailNotifications")}
                      id="email-toggle"
                    />
                    <label htmlFor="email-toggle" className="toggle-label"></label>
                  </div>
                </div>

                <div className="toggle-option">
                  <label>Send me push notifications</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={() => handleToggleChange("pushNotifications")}
                      id="push-toggle"
                    />
                    <label htmlFor="push-toggle" className="toggle-label"></label>
                  </div>
                </div>

                <div className="toggle-option">
                  <label>Send daily digest of all notifications</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.dailyDigest}
                      onChange={() => handleToggleChange("dailyDigest")}
                      id="digest-toggle"
                    />
                    <label htmlFor="digest-toggle" className="toggle-label"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="notification-group notification-types">
            <div className="notification-header">
              <h3>Notification Types</h3>
            </div>

            <div className="notification-content">
              <div className="toggle-options">
                <div className="toggle-option">
                  <label>Low stock alerts</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.lowStockAlerts}
                      onChange={() => handleToggleChange("lowStockAlerts")}
                      id="stock-toggle"
                    />
                    <label htmlFor="stock-toggle" className="toggle-label"></label>
                  </div>
                </div>

                <div className="toggle-option">
                  <label>Order updates</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderUpdates}
                      onChange={() => handleToggleChange("orderUpdates")}
                      id="order-toggle"
                    />
                    <label htmlFor="order-toggle" className="toggle-label"></label>
                  </div>
                </div>

                <div className="toggle-option">
                  <label>System alerts and updates</label>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notificationSettings.systemAlerts}
                      onChange={() => handleToggleChange("systemAlerts")}
                      id="system-toggle"
                    />
                    <label htmlFor="system-toggle" className="toggle-label"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="section-footer">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default NotificationPreferences
