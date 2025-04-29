"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import { Search, Filter, Plus, Download, Upload, Edit, Trash2, Eye } from "lucide-react"
import "../styles/InventoryManagement.css"

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    supplier: "",
    status: "In Stock",
  })
  const [editItem, setEditItem] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  // Mock data for inventory
  const mockInventory = [
    {
      id: "INV001",
      name: "T-Shirt",
      category: "Clothing",
      quantity: 100,
      price: 19.99,
      supplier: "Fashion Inc.",
      status: "In Stock",
    },
    {
      id: "INV002",
      name: "Jeans",
      category: "Clothing",
      quantity: 50,
      price: 39.99,
      supplier: "Denim Co.",
      status: "In Stock",
    },
    {
      id: "INV003",
      name: "Sneakers",
      category: "Footwear",
      quantity: 30,
      price: 59.99,
      supplier: "Shoe World",
      status: "Low Stock",
    },
    {
      id: "INV004",
      name: "Hoodie",
      category: "Clothing",
      quantity: 75,
      price: 29.99,
      supplier: "Fashion Inc.",
      status: "In Stock",
    },
    {
      id: "INV005",
      name: "Socks",
      category: "Accessories",
      quantity: 200,
      price: 4.99,
      supplier: "Comfort Wear",
      status: "In Stock",
    },
    {
      id: "INV006",
      name: "Hat",
      category: "Accessories",
      quantity: 5,
      price: 14.99,
      supplier: "Headwear Co.",
      status: "Low Stock",
    },
    {
      id: "INV007",
      name: "Jacket",
      category: "Clothing",
      quantity: 0,
      price: 79.99,
      supplier: "Winter Gear",
      status: "Out of Stock",
    },
    {
      id: "INV008",
      name: "Gloves",
      category: "Accessories",
      quantity: 25,
      price: 9.99,
      supplier: "Winter Gear",
      status: "In Stock",
    },
  ]



  const filterInventory = () => {
    let filtered = inventory

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by tab
    if (activeTab === "low") {
      filtered = filtered.filter((item) => item.status === "Low Stock")
    } else if (activeTab === "out") {
      filtered = filtered.filter((item) => item.status === "Out of Stock")
    }

    setFilteredInventory(filtered)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleAddItem = () => {
    setShowAddModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewItem({
      ...newItem,
      [name]: name === "quantity" || name === "price" ? Number.parseFloat(value) : value,
    })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditItem({
      ...editItem,
      [name]: name === "quantity" || name === "price" ? Number.parseFloat(value) : value,
    })
  }

  const saveNewItem = () => {
    // Generate a new ID
    const newId = `INV${String(inventory.length + 1).padStart(3, "0")}`
    const itemToAdd = { ...newItem, id: newId }

    // Update inventory
    setInventory([...inventory, itemToAdd])

    // Reset form and close modal
    setNewItem({
      id: "",
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      supplier: "",
      status: "In Stock",
    })
    setShowAddModal(false)
  }

  const handleEditItem = (item) => {
    setEditItem(item)
    setShowEditModal(true)
  }

  const saveEditItem = () => {
    const updatedInventory = inventory.map((item) => (item.id === editItem.id ? editItem : item))

    setInventory(updatedInventory)
    setShowEditModal(false)
  }

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedInventory = inventory.filter((item) => item.id !== id)
      setInventory(updatedInventory)
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "In Stock":
        return "status-in-stock"
      case "Low Stock":
        return "status-low-stock"
      case "Out of Stock":
        return "status-out-of-stock"
      default:
        return ""
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setInventory(mockInventory);
      setFilteredInventory(mockInventory);
      setLoading(false);
    }, 1000);
  }, [mockInventory]);
  

  useEffect(() => {
    filterInventory()
  }, [searchTerm, activeTab, inventory, filterInventory])

  return (
    <div className="inventory-management">
      <Header
        title="Inventory Management"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Inventory Management", active: true },
        ]}
      />

      <div className="inventory-container">
        <div className="inventory-actions">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search inventory..." value={searchTerm} onChange={handleSearch} />
          </div>

          <div className="action-buttons">
            <button className="btn btn-filter">
              <Filter size={18} />
              <span>Filters</span>
            </button>
            <button className="btn btn-import">
              <Upload size={18} />
              <span>Import</span>
            </button>
            <button className="btn btn-export">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button className="btn btn-add" onClick={handleAddItem}>
              <Plus size={18} />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        <div className="inventory-tabs">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => handleTabChange("all")}>
            All Items
          </button>
          <button className={`tab ${activeTab === "low" ? "active" : ""}`} onClick={() => handleTabChange("low")}>
            Low Stock
          </button>
          <button className={`tab ${activeTab === "out" ? "active" : ""}`} onClick={() => handleTabChange("out")}>
            Out of Stock
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading inventory data...</div>
        ) : (
          <div className="inventory-table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.supplier}</td>
                      <td>
                        <span className={`status ${getStatusClass(item.status)}`}>{item.status}</span>
                      </td>
                      <td className="actions">
                        <button className="action-btn view-btn">
                          <Eye size={16} />
                        </button>
                        <button className="action-btn edit-btn" onClick={() => handleEditItem(item)}>
                          <Edit size={16} />
                        </button>
                        <button className="action-btn delete-btn" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No inventory items found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Inventory Item</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Item Name</label>
                <input type="text" name="name" value={newItem.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={newItem.category} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input type="text" name="supplier" value={newItem.supplier} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={newItem.status} onChange={handleInputChange} required>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveNewItem}>
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && editItem && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Inventory Item</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Item ID</label>
                <input type="text" value={editItem.id} disabled />
              </div>
              <div className="form-group">
                <label>Item Name</label>
                <input type="text" name="name" value={editItem.name} onChange={handleEditInputChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={editItem.category} onChange={handleEditInputChange} required>
                  <option value="">Select Category</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editItem.quantity}
                    onChange={handleEditInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={editItem.price}
                    onChange={handleEditInputChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={editItem.supplier}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={editItem.status} onChange={handleEditInputChange} required>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveEditItem}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryManagement

