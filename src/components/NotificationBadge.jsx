"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import "../styles/NotificationBadge.css"

const NotificationBadge = () => {
  const [unreadCount, setUnreadCount] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo, we'll use mock data
    const recentNotifications = [
      {
        id: 1,
        title: "New Order #38278",
        timestamp: "2 mins ago",
        isRead: false,
        type: "order",
      },
      {
        id: 2,
        title: "Low Stock Alert",
        timestamp: "10 mins ago",
        isRead: false,
        type: "alert",
      },
      {
        id: 3,
        title: "System Update",
        timestamp: "1 hour ago",
        isRead: true,
        type: "system",
      },
    ]

    setNotifications(recentNotifications)
    const count = recentNotifications.filter((n) => !n.isRead).length
    setUnreadCount(count)
  }, [])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleClickOutside = (e) => {
    if (showDropdown && !e.target.closest(".notification-badge-container")) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [showDropdown])

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, isRead: true }
      }
      return notification
    })

    setNotifications(updatedNotifications)
    const count = updatedNotifications.filter((n) => !n.isRead).length
    setUnreadCount(count)
  }

  const getTypeClass = (type) => {
    switch (type) {
      case "order":
        return "type-order"
      case "alert":
        return "type-alert"
      case "system":
        return "type-system"
      default:
        return ""
    }
  }

  return (
    <div className="notification-badge-container">
      <button className="notification-badge-button" onClick={toggleDropdown}>
        <Bell size={20} />
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="dropdown-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && <button className="mark-all-read">Mark all as read</button>}
          </div>
          <div className="dropdown-content">
            {notifications.length === 0 ? (
              <div className="no-notifications-dropdown">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`dropdown-item ${!notification.isRead ? "unread" : ""}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`item-icon ${getTypeClass(notification.type)}`}>
                    <Bell size={16} />
                  </div>
                  <div className="item-content">
                    <div className="item-title">{notification.title}</div>
                    <div className="item-time">{notification.timestamp}</div>
                  </div>
                  {!notification.isRead && <div className="item-indicator"></div>}
                </div>
              ))
            )}
          </div>
          <div className="dropdown-footer">
            <a href="/notifications" className="view-all">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBadge

