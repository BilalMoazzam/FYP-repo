"use client"
import { Clock, Trash2, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

const NotificationList = ({ notifications, getIcon, onMarkAsRead, onDelete }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "normal":
      default:
        return "priority-normal"
    }
  }

  const getTypeClass = (type) => {
    switch (type) {
      case "order":
        return "type-order"
      case "alert":
        return "type-alert"
      case "system":
        return "type-system"
      case "shipment":
        return "type-shipment"
      case "inventory":
        return "type-inventory"
      default:
        return ""
    }
  }

  const handleNotificationClick = (id) => {
    onMarkAsRead(id)
  }

  return (
    <div className="notification-list">
      {notifications.length === 0 ? (
        <div className="no-notifications">
          <div className="empty-state">
            <div className="empty-icon">
              <Clock size={48} />
            </div>
            <h3>No notifications</h3>
            <p>You're all caught up! There are no notifications to display.</p>
          </div>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${!notification.isRead ? "unread" : ""}`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <div className={`notification-icon ${getTypeClass(notification.type)}`}>{getIcon(notification.icon)}</div>
            <div className="notification-content">
              <div className="notification-header">
                <h4 className="notification-title">{notification.title}</h4>
                <div className="notification-meta">
                  <span className="notification-time">{notification.timestamp}</span>
                  {!notification.isRead && <span className="notification-badge">New</span>}
                </div>
              </div>
              <p className="notification-description">{notification.description}</p>
              <div className="notification-actions">
                <Link to={notification.link} className="notification-link">
                  View Details <ExternalLink size={14} />
                </Link>
                <button
                  className="notification-delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(notification.id)
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default NotificationList

