"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, UserPlus } from "lucide-react"

const UserManagementSettings = ({ onSettingsChange }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Admin",
    department: "",
    status: "Active",
  })
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    // Load mock users
    loadMockUsers()
  }, [])

  const loadMockUsers = () => {
    // Mock data for users
    const mockUsers = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        role: "Admin",
        department: "Supply Chain",
        status: "Active",
        lastActive: "2h ago",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "Manager",
        department: "Inventory",
        status: "Active",
        lastActive: "1d ago",
      },
      {
        id: 3,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "Viewer",
        department: "Operations",
        status: "Inactive",
        lastActive: "5d ago",
      },
    ]

    setUsers(mockUsers)
    setLoading(false)
  }

  const handleAddUser = () => {
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
    setEditingUser(null)
    setNewUser({
      name: "",
      email: "",
      role: "Admin",
      department: "",
      status: "Active",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [name]: value,
      })
    } else {
      setNewUser({
        ...newUser,
        [name]: value,
      })
    }
  }

  const handleSaveUser = () => {
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map((user) => (user.id === editingUser.id ? editingUser : user))
      setUsers(updatedUsers)
    } else {
      // Add new user
      const newId = Math.max(0, ...users.map((u) => u.id)) + 1
      const userToAdd = {
        ...newUser,
        id: newId,
        lastActive: "Just now",
      }
      setUsers([...users, userToAdd])
    }

    handleCloseModal()
    onSettingsChange()
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowAddModal(true)
  }

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id)
      setUsers(updatedUsers)
      onSettingsChange()
    }
  }

  const handleToggleStatus = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === "Active" ? "Inactive" : "Active",
        }
      }
      return user
    })

    setUsers(updatedUsers)
    onSettingsChange()
  }

  return (
    <div className="settings-section user-management-settings">
      <div className="section-header">
        <h2>User Management</h2>
      </div>

      <div className="users-table-container">
        {loading ? (
          <div className="loading-indicator">Loading users...</div>
        ) : (
          <table className="users-table">
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No users found
                  </td>
                </tr>
              ) : (
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
                      <span className={`status-badge ${user.status.toLowerCase()}`}>{user.status}</span>
                    </td>
                    <td>{user.lastActive}</td>
                    <td className="actions-cell">
                      <button className="action-btn edit-btn" onClick={() => handleEditUser(user)} title="Edit">
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="add-user-container">
        <button className="add-user-btn" onClick={handleAddUser}>
          <UserPlus size={16} />
          <span>Add User</span>
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select name="role" value={editingUser ? editingUser.role : newUser.role} onChange={handleInputChange}>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={editingUser ? editingUser.department : newUser.department}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editingUser ? editingUser.status : newUser.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveUser}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="section-footer">
        <button className="save-btn" onClick={() => alert("User settings saved!")}>
          Save
        </button>
      </div>
    </div>
  )
}

export default UserManagementSettings
