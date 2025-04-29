"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import "../styles/InventoryCategoryManagement.css"

const InventoryCategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [editCategory, setEditCategory] = useState(null)

  // Mock data for categories
  const mockCategories = [
    { id: 1, name: "Clothing", description: "All types of clothing items", itemCount: 250 },
    { id: 2, name: "Footwear", description: "Shoes, boots, and other footwear", itemCount: 120 },
    { id: 3, name: "Accessories", description: "Hats, gloves, scarves, and other accessories", itemCount: 115 },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddCategory = () => {
    setShowAddModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCategory({
      ...newCategory,
      [name]: value,
    })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditCategory({
      ...editCategory,
      [name]: value,
    })
  }

  const saveNewCategory = () => {
    // Generate a new ID
    const newId = Math.max(...categories.map((cat) => cat.id), 0) + 1
    const categoryToAdd = { ...newCategory, id: newId, itemCount: 0 }

    // Update categories
    setCategories([...categories, categoryToAdd])

    // Reset form and close modal
    setNewCategory({ name: "", description: "" })
    setShowAddModal(false)
  }

  const handleEditCategory = (category) => {
    setEditCategory(category)
    setShowEditModal(true)
  }

  const saveEditCategory = () => {
    const updatedCategories = categories.map((category) => (category.id === editCategory.id ? editCategory : category))

    setCategories(updatedCategories)
    setShowEditModal(false)
  }

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((category) => category.id !== id)
      setCategories(updatedCategories)
    }
  }

  return (
    <div className="inventory-category-management">
      <div className="category-header">
        <h2>Categories</h2>
        <button className="btn btn-add" onClick={handleAddCategory}>
          <Plus size={18} />
          <span>Add Category</span>
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading categories...</div>
      ) : (
        <div className="category-table-container">
          <table className="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.itemCount}</td>
                    <td className="actions">
                      <button className="action-btn edit-btn" onClick={() => handleEditCategory(category)}>
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete-btn" onClick={() => handleDeleteCategory(category.id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Category</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Category Name</label>
                <input type="text" name="name" value={newCategory.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={newCategory.description} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveNewCategory}>
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editCategory && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Category</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Category ID</label>
                <input type="text" value={editCategory.id} disabled />
              </div>
              <div className="form-group">
                <label>Category Name</label>
                <input type="text" name="name" value={editCategory.name} onChange={handleEditInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editCategory.description}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveEditCategory}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryCategoryManagement

