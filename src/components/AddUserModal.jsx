"use client"

import { useState } from "react"
import { X } from "lucide-react"

const AddUserModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    status: "Active",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.role.trim()) newErrors.role = "Role is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
      onClose() // Close modal after successful save
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal user-modal">
        <div className="modal-header">
          <h2>Add New User</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Add a new user to your StockChain AI. They will receive an email invitation.
          </p>

          <form onSubmit={handleSubmit} autoComplete="off">
            {/* Text Inputs */}
            {[
              { label: "Full Name", id: "name", type: "text" },
              { label: "Email", id: "email", type: "email" },
              { label: "Phone Number", id: "phone", type: "text" },
              { label: "Department", id: "department", type: "text" },
            ].map(({ label, id, type }) => (
              <div className="form-group" key={id}>
                <label htmlFor={id}>{label}</label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  className={errors[id] ? "error" : ""}
                />
                {errors[id] && <div className="error-message">{errors[id]}</div>}
              </div>
            ))}

            {/* Role Select */}
            <div className="form-group">
              <label htmlFor="role">Select Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? "error" : ""}
              >
                <option value="">Select a role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Viewer">Viewer</option>
              </select>
              {errors.role && <div className="error-message">{errors.role}</div>}
            </div>

            {/* Buttons */}
            <div className="modal-footer">
              <button type="button" className="btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-save">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUserModal
