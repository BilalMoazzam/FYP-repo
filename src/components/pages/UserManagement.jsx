"use client"

import { useState, useEffect } from "react";
import Header from "../layout/Header";
import UserTable from "../UserTable";
import AddUserModal from "../AddUserModal";
import { Search, UserPlus } from "lucide-react";
import "../styles/UserManagement.css";
import axios from "axios";

const API_URL = "http://localhost:3000/api/admin/users"; // Ensure this matches your backend route

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Users");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No token found. Redirecting to login...");
      return;
    }

    axios
      .get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.users || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (Array.isArray(users)) filterUsers();
  }, [searchTerm, selectedFilter, users]);
  const handleDelete = (userId) => {
    // Remove user by ID
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        [user.name, user.email, user.role, user.department]
          .some((field) => field && field.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedFilter === "Active") {
      filtered = filtered.filter((user) => user.status === "Active");
    } else if (selectedFilter === "Inactive") {
      filtered = filtered.filter((user) => user.status === "Inactive");
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setSelectedFilter(e.target.value);
  const handleAddUser = () => setShowAddModal(true);
  const handleCloseModal = () => setShowAddModal(false);

const handleSaveUser = async (newUser) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(API_URL, {
      ...newUser,
      status: "Active",
      lastActive: "Just now",
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const addedUser = {
      ...response.data.user,
      role: newUser.role || "N/A",
      department: newUser.department || "N/A",
      status: "Active",
      lastActive: "Just now",
    };

    setUsers((prev) => [...prev, addedUser]);
  } catch (error) {
    console.error("Failed to save user:", error);
  } finally {
    handleCloseModal();
  }
};



  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`${API_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

const handleToggleStatus = async (userId) => {
  if (!userId) {
    console.error("Cannot toggle status: userId is undefined.");
    return;
  }

  try {
    const user = users.find((u) => u.id === userId);
    if (!user) {
      console.error("User not found with ID:", userId);
      return;
    }

    const updatedStatus = user.status === "Active" ? "Inactive" : "Active";
    const token = localStorage.getItem("authToken");

    const response = await axios.put(`${API_URL}/${userId}`, {
      ...user,
      status: updatedStatus,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedUser = response.data.user || response.data;
    setUsers(users.map((u) => (u.id === userId ? updatedUser : u)));
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};


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
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
              />
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
            <UserTable
  users={users}
  onDelete={handleDelete}
  onToggleStatus={handleToggleStatus}
/>

          )}
        </div>
      </div>

      {showAddModal && <AddUserModal onClose={handleCloseModal} onSave={handleSaveUser} />}
    </div>
  );
};

export default UserManagement;
