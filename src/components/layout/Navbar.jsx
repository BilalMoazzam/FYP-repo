"use client"

import { useState } from "react"
import {
  Package,
  Bell,
  FileText,
  Scan,
  FolderPlus,
} from "lucide-react"

export function Navbar({ onMenuClick, activeView, setActiveView }) {
  const [showNotifications, setShowNotifications] = useState(false)

  const menuItems = [
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "scanner", label: "Barcode Scanner", icon: Scan },
    { id: "categories", label: "Categories", icon: FolderPlus },
    { id: "reports", label: "Reports", icon: FileText },
  ]

  return (
    <nav
      style={{
        height: "64px",
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",  
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: activeView === item.id ? "#eff6ff" : "transparent",
                  color: activeView === item.id ? "#3b82f6" : "#6b7280",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (activeView !== item.id) {
                    e.target.style.backgroundColor = "#f9fafb"
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeView !== item.id) {
                    e.target.style.backgroundColor = "transparent"
                  }
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: "relative",
              padding: "8px",
              border: "none",
              backgroundColor: "transparent",
              borderRadius: "6px",
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            <Bell size={20} />
            <span
              style={{
                position: "absolute",
                top: "4px",
                right: "4px",
                width: "8px",
                height: "8px",
                backgroundColor: "#ef4444",
                borderRadius: "50%",
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "8px",
                width: "320px",
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                zIndex: 1001,
              }}
            >
              <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>Notifications</h3>
              </div>
              <div style={{ padding: "8px" }}>
                <div style={{ padding: "12px", borderRadius: "6px", marginBottom: "8px", backgroundColor: "#fef2f2" }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>Low Stock Alert</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}>5 items are running low</p>
                </div>
                <div style={{ padding: "12px", borderRadius: "6px", backgroundColor: "#f0f9ff" }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>New Order</p>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}>Order #1234 received</p>
                </div>
              </div>
            </div>
          )}
        </div>
    </nav>
  )
}
