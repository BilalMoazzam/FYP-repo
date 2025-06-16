"use client";

import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Edit, Trash2 } from "lucide-react";

const UserTable = ({ users = [], onDelete, onToggleStatus }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const toggleDropdown = (userId) => {
    setActiveDropdown((prev) => (prev === userId ? null : userId));
  };

  const handleClickOutside = (event) => {
    const dropdownRef = dropdownRefs.current[activeDropdown];
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const getStatusClass = (status) =>
    status === "Active" ? "status-active" : "status-inactive";

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
            users.map((user, index) => {
              const userId = user.id || user._id || `user-${index}`;
              return (
                <tr key={userId}>
                  <td className="user-cell">
                    <div className="user-info">
                      <div className="user-name">{user.name || "Unnamed"}</div>
                      <div className="user-email">{user.email || "No Email"}</div>
                    </div>
                  </td>
                  <td>{user.role || "N/A"}</td>
                  <td>{user.department || "N/A"}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(user.status)}`}>
                      {user.status || "Unknown"}
                    </span>
                  </td>
                  <td>{user.lastActive || "N/A"}</td>
                  <td className="actions-cell-1">
                    <div className="dropdown-container" ref={(el) => (dropdownRefs.current[userId] = el)}>
                      <button
                        className="action-btn dropdown-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(userId);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeDropdown === userId && (
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item"
                            onClick={() => onToggleStatus(userId)}
                          >
                            <Edit size={14} />
                            <span>
                              {user.status === "Active" ? "Deactivate" : "Activate"}
                            </span>
                          </button>
                          <button
                            className="dropdown-item delete"
                            onClick={() => onDelete(userId)}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
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
  );
};

export default UserTable;
