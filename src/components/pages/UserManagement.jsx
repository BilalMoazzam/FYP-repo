"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import UserTable from "../UserTable"
import AddUserModal from "../AddUserModal"
import { Search, UserPlus } from "lucide-react"
import "../styles/UserManagement.css"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("All Users")

  // Mock data for users
  const mockUsers = [
    {
      id: 1,
      name: "Raj Mohan",
      email: "raj.mohan@stockchain.com",
      role: "Admin",
      department: "Supply Chain",
      status: "Active",
      lastActive: "2 hours ago",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Sarah Kim",
      email: "sarah.kim@stockchain.com",
      role: "Manager",
      department: "Inventory",
      status: "Active",
      lastActive: "5 hours ago",
      phone: "+1 (555) 987-6543",
    },
    {
      id: 3,
      name: "John Peterson",
      email: "john.peterson@stockchain.com",
      role: "Viewer",
      department: "Operations",
      status: "Inactive",
      lastActive: "1 day ago",
      phone: "+1 (555) 456-7890",
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@stockchain.com",
      role: "Manager",
      department: "Logistics",
      status: "Active",
      lastActive: "3 hours ago",
      phone: "+1 (555) 234-5678",
    },
    {
      id: 5,
      name: "David Chen",
      email: "david.chen@stockchain.com",
      role: "Viewer",
      department: "Finance",
      status: "Active",
      lastActive: "12 hours ago",
      phone: "+1 (555) 876-5432",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterUsers()
  }, [searchTerm, selectedFilter, users])

  const filterUsers = () => {
    let filtered = users

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.department.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (selectedFilter === "Active") {
      filtered = filtered.filter((user) => user.status === "Active")
    } else if (selectedFilter === "Inactive") {
      filtered = filtered.filter((user) => user.status === "Inactive")
    }

    setFilteredUsers(filtered)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value)
  }

  const handleAddUser = () => {
    setShowAddModal(true)
  }

  const handleCloseModal = () => {
    setShowAddModal(false)
  }

  const handleSaveUser = (newUser) => {
    // Generate a new ID
    const newId = Math.max(...users.map((user) => user.id), 0) + 1
    const userToAdd = { ...newUser, id: newId, lastActive: "Just now" }

    // Update users
    setUsers([...users, userToAdd])
    setShowAddModal(false)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
    }
  }

  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        const newStatus = user.status === "Active" ? "Inactive" : "Active"
        return { ...user, status: newStatus }
      }
      return user
    })
    setUsers(updatedUsers)
  }

  return (
    <div className="user-management">
      <Header
        title="User Management"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "User Management", active: true },
        ]}
      />

      <div className="user-management-container">
        <div className="user-management-header">
          <h2>Manage user access and permissions</h2>
          <button className="btn btn-add" onClick={handleAddUser}>
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        </div>

        <div className="user-management-content">
          <div className="user-management-filters">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search users..." value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="filter-dropdown">
              <select value={selectedFilter} onChange={handleFilterChange}>
                <option value="All Users">All Users</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading user data...</div>
          ) : (
            <UserTable users={filteredUsers} onDelete={handleDeleteUser} onToggleStatus={handleToggleStatus} />
          )}
        </div>
      </div>

      {showAddModal && <AddUserModal onClose={handleCloseModal} onSave={handleSaveUser} />}
    </div>
  )
}

export default UserManagement

