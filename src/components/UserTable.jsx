"use client"

import React from "react"
import { MoreVertical, Edit, Trash2 } from "lucide-react"

const UserTable = ({ users, onDelete, onToggleStatus }) => {
  const [activeDropdown, setActiveDropdown] = React.useState(null)

  const toggleDropdown = (userId) => {
    if (activeDropdown === userId) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(userId)
    }
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  React.useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = () => {
      closeDropdown()
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleDropdownClick = (e) => {
    // Prevent the click from propagating to the document
    e.stopPropagation()
  }

  const getStatusClass = (status) => {
    return status === "Active" ? "status-active" : "status-inactive"
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Role</th>
            <th>Department</th>
            <th>Status</th>
            <th>Last Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td className="user-cell">
                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>{user.department}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(user.status)}`}>{user.status}</span>
                </td>
                <td>{user.lastActive}</td>
                <td className="actions-cell">
                  <div className="dropdown-container">
                    <button
                      className="action-btn dropdown-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleDropdown(user.id)
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === user.id && (
                      <div className="dropdown-menu" onClick={handleDropdownClick}>
                        <button className="dropdown-item" onClick={() => onToggleStatus(user.id)}>
                          <Edit size={14} />
                          <span>{user.status === "Active" ? "Deactivate" : "Activate"}</span>
                        </button>
                        <button className="dropdown-item delete" onClick={() => onDelete(user.id)}>
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable

