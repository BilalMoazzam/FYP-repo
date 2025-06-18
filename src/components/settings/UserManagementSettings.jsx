"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, UserPlus, MoreVertical } from "lucide-react"

const UserManagementSettings = ({ onSettingsChange = () => {} }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false) // no loading from mock data now
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Admin",
    department: "",
    status: "Active",
  })
  const [editingUser, setEditingUser] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    // No mock data loading, so no initial load here

    // Close dropdown on outside click
    const handleClickOutside = () => setActiveDropdown(null)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const toggleDropdown = (userId) => {
    setActiveDropdown((prev) => (prev === userId ? null : userId))
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
      setEditingUser({ ...editingUser, [name]: value })
    } else {
      setNewUser({ ...newUser, [name]: value })
    }
  }

  const handleSaveUser = () => {
    if (editingUser) {
      const updated = users.map((u) => (u.id === editingUser.id ? editingUser : u))
      setUsers(updated)
    } else {
      const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1
      setUsers([...users, { ...newUser, id: newId, lastActive: "Just now" }])
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
      setUsers(users.filter((u) => u.id !== id))
      onSettingsChange()
    }
  }

  const handleToggleStatus = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
    )
    setUsers(updated)
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
                  <td colSpan="6">No users found</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div>{user.name}</div>
                        <div className="text-muted text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastActive}</td>
                    <td>
                      <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="action-btn"
                          onClick={() => toggleDropdown(user.id)}
                        >
                          <MoreVertical size={16} />
                        </button>

                        {activeDropdown === user.id && (
                          <div className="dropdown-menu">
                            <button onClick={() => handleToggleStatus(user.id)}>
                              <Edit size={14} />
                              {user.status === "Active" ? "Deactivate" : "Activate"}
                            </button>
                            <button className="delete" onClick={() => handleDeleteUser(user.id)}>
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
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
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={editingUser ? editingUser.role : newUser.role}
                  onChange={handleInputChange}
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={editingUser ? editingUser.department : newUser.department}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={editingUser ? editingUser.status : newUser.status}
                  onChange={handleInputChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
              <button className="save-btn" onClick={handleSaveUser}>Save</button>
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
