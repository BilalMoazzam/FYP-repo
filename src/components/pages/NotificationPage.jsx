"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import NotificationList from "../NotificationList"
import { Bell, CheckCircle, AlertTriangle, Info, Truck } from "lucide-react"
import "../styles/NotificationPage.css"

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock data for notifications
  const mockNotifications = [
    {
      id: 1,
      type: "order",
      title: "New Order #38278",
      description: "A new order has been placed worth pending confirmation",
      timestamp: "2 mins ago",
      isRead: false,
      priority: "normal",
      icon: "shopping-cart",
      link: "/orders/38278",
    },
    {
      id: 2,
      type: "alert",
      title: "Low Stock Alert",
      description: "Item ID: TShirt-101 is below threshold level",
      timestamp: "10 mins ago",
      isRead: false,
      priority: "high",
      icon: "alert",
      link: "/inventory",
    },
    {
      id: 3,
      type: "system",
      title: "System Update",
      description: "System maintenance scheduled tonight at 2 AM",
      timestamp: "1 hour ago",
      isRead: true,
      priority: "normal",
      icon: "info",
      link: "/settings",
    },
    {
      id: 4,
      type: "shipment",
      title: "Delayed Shipment",
      description: "Order #34567 shipment has been delayed",
      timestamp: "3 hours ago",
      isRead: false,
      priority: "medium",
      icon: "truck",
      link: "/orders/34567",
    },
    {
      id: 5,
      type: "inventory",
      title: "Inventory Restocked",
      description: "50 units of Microchips R7240 added to inventory",
      timestamp: "5 hours ago",
      isRead: true,
      priority: "normal",
      icon: "package",
      link: "/inventory",
    },
    {
      id: 6,
      type: "alert",
      title: "Security Alert",
      description: "Unusual login attempt detected from IP 192.168.1.45",
      timestamp: "1 day ago",
      isRead: true,
      priority: "high",
      icon: "alert",
      link: "/settings/security",
    },
    {
      id: 7,
      type: "system",
      title: "Blockchain Verification",
      description: "Transaction #TXN72345 has been verified",
      timestamp: "1 day ago",
      isRead: true,
      priority: "normal",
      icon: "check",
      link: "/blockchain",
    },
    {
      id: 8,
      type: "order",
      title: "Order Fulfilled",
      description: "Order #38150 has been successfully fulfilled",
      timestamp: "2 days ago",
      isRead: true,
      priority: "normal",
      icon: "check",
      link: "/orders/38150",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications)
      setFilteredNotifications(mockNotifications)
      setLoading(false)

      // Count unread notifications
      const unread = mockNotifications.filter((notification) => !notification.isRead).length
      setUnreadCount(unread)
    }, 1000)
  }, [])

  useEffect(() => {
    filterNotifications(activeFilter)
  }, [activeFilter, notifications])

  const filterNotifications = (filter) => {
    let filtered = [...notifications]

    switch (filter) {
      case "unread":
        filtered = filtered.filter((notification) => !notification.isRead)
        break
      case "order":
        filtered = filtered.filter((notification) => notification.type === "order")
        break
      case "alert":
        filtered = filtered.filter((notification) => notification.type === "alert")
        break
      case "system":
        filtered = filtered.filter((notification) => notification.type === "system")
        break
      case "shipment":
        filtered = filtered.filter((notification) => notification.type === "shipment")
        break
      case "inventory":
        filtered = filtered.filter((notification) => notification.type === "inventory")
        break
      default:
        // "all" - no filtering needed
        break
    }

    setFilteredNotifications(filtered)
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id && !notification.isRead) {
        return { ...notification, isRead: true }
      }
      return notification
    })

    setNotifications(updatedNotifications)

    // Update unread count
    const unread = updatedNotifications.filter((notification) => !notification.isRead).length
    setUnreadCount(unread)
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => {
      return { ...notification, isRead: true }
    })

    setNotifications(updatedNotifications)
    setUnreadCount(0)
  }

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter((notification) => notification.id !== id)
    setNotifications(updatedNotifications)

    // Update unread count
    const unread = updatedNotifications.filter((notification) => !notification.isRead).length
    setUnreadCount(unread)
  }

  const getNotificationIcon = (iconType) => {
    switch (iconType) {
      case "shopping-cart":
        return <Bell size={20} />
      case "alert":
        return <AlertTriangle size={20} />
      case "info":
        return <Info size={20} />
      case "truck":
        return <Truck size={20} />
      case "package":
        return <Bell size={20} />
      case "check":
        return <CheckCircle size={20} />
      default:
        return <Bell size={20} />
    }
  }

  return (
    <div className="notification-page">
      <Header
        title="Notifications"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Notifications", active: true },
        ]}
      />

      <div className="notification-container">
        <div className="notification-header">
          <h2>View and manage notifications</h2>
          {unreadCount > 0 && (
            <button className="btn btn-read-all" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        <div className="notification-content">
          <div className="notification-sidebar">
            <div className="filter-header">
              <h3>Filter</h3>
            </div>
            <div className="filter-options">
              <button
                className={`filter-option ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => handleFilterChange("all")}
              >
                All Notifications
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>
              <button
                className={`filter-option ${activeFilter === "unread" ? "active" : ""}`}
                onClick={() => handleFilterChange("unread")}
              >
                Unread
                {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
              </button>
              <div className="filter-divider"></div>
              <button
                className={`filter-option ${activeFilter === "order" ? "active" : ""}`}
                onClick={() => handleFilterChange("order")}
              >
                Orders
              </button>
              <button
                className={`filter-option ${activeFilter === "alert" ? "active" : ""}`}
                onClick={() => handleFilterChange("alert")}
              >
                Alerts
              </button>
              <button
                className={`filter-option ${activeFilter === "system" ? "active" : ""}`}
                onClick={() => handleFilterChange("system")}
              >
                System
              </button>
              <button
                className={`filter-option ${activeFilter === "shipment" ? "active" : ""}`}
                onClick={() => handleFilterChange("shipment")}
              >
                Shipments
              </button>
              <button
                className={`filter-option ${activeFilter === "inventory" ? "active" : ""}`}
                onClick={() => handleFilterChange("inventory")}
              >
                Inventory
              </button>
            </div>
          </div>

          <div className="notification-main">
            <div className="notification-list-header">
              <h3>Recent Notifications</h3>
              <div className="notification-actions">
                <select className="notification-sort">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading notifications...</div>
            ) : (
              <NotificationList
                notifications={filteredNotifications}
                getIcon={getNotificationIcon}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
