"use client"

import { useState, useEffect } from "react"
import { Edit, Trash2, Plus, Phone, Mail, MapPin } from "lucide-react"
import "../styles/InventorySupplierManagement.css"

const InventorySupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    phone: "",
  })
  const [editSupplier, setEditSupplier] = useState(null)

  // Mock data for suppliers
  const mockSuppliers = [
    {
      id: 1,
      name: "Fashion Inc.",
      contact: "John Smith",
      email: "john@fashioninc.com",
      address: "123 Fashion St, New York, NY",
      phone: "(212) 555-1234",
      itemCount: 175,
    },
    {
      id: 2,
      name: "Denim Co.",
      contact: "Sarah Johnson",
      email: "sarah@denimco.com",
      address: "456 Denim Ave, Los Angeles, CA",
      phone: "(310) 555-5678",
      itemCount: 50,
    },
    {
      id: 3,
      name: "Shoe World",
      contact: "Mike Brown",
      email: "mike@shoeworld.com",
      address: "789 Footwear Blvd, Chicago, IL",
      phone: "(312) 555-9012",
      itemCount: 120,
    },
    {
      id: 4,
      name: "Winter Gear",
      contact: "Lisa Chen",
      email: "lisa@wintergear.com",
      address: "101 Snow Lane, Denver, CO",
      phone: "(720) 555-3456",
      itemCount: 100,
    },
    {
      id: 5,
      name: "Comfort Wear",
      contact: "David Wilson",
      email: "david@comfortwear.com",
      address: "202 Comfort Road, Seattle, WA",
      phone: "(206) 555-7890",
      itemCount: 200,
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSuppliers(mockSuppliers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddSupplier = () => {
    setShowAddModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSupplier({
      ...newSupplier,
      [name]: value,
    })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditSupplier({
      ...editSupplier,
      [name]: value,
    })
  }

  const saveNewSupplier = () => {
    // Generate a new ID
    const newId = Math.max(...suppliers.map((sup) => sup.id), 0) + 1
    const supplierToAdd = { ...newSupplier, id: newId, itemCount: 0 }

    // Update suppliers
    setSuppliers([...suppliers, supplierToAdd])

    // Reset form and close modal
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      address: "",
      phone: "",
    })
    setShowAddModal(false)
  }

  const handleEditSupplier = (supplier) => {
    setEditSupplier(supplier)
    setShowEditModal(true)
  }

  const saveEditSupplier = () => {
    const updatedSuppliers = suppliers.map((supplier) => (supplier.id === editSupplier.id ? editSupplier : supplier))

    setSuppliers(updatedSuppliers)
    setShowEditModal(false)
  }

  const handleDeleteSupplier = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== id)
      setSuppliers(updatedSuppliers)
    }
  }

  return (
    <div className="inventory-supplier-management">
      <div className="supplier-header">
        <h2>Suppliers</h2>
        <button className="btn btn-add" onClick={handleAddSupplier}>
          <Plus size={18} />
          <span>Add Supplier</span>
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading suppliers...</div>
      ) : (
        <div className="supplier-cards">
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <div className="supplier-card" key={supplier.id}>
                <div className="supplier-card-header">
                  <h3>{supplier.name}</h3>
                  <div className="supplier-actions">
                    <button className="action-btn edit-btn" onClick={() => handleEditSupplier(supplier)}>
                      <Edit size={16} />
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDeleteSupplier(supplier.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="supplier-card-body">
                  <div className="supplier-info">
                    <p>
                      <span className="info-label">Contact:</span> {supplier.contact}
                    </p>
                    <p>
                      <Mail size={14} className="info-icon" />
                      <a href={`mailto:${supplier.email}`}>{supplier.email}</a>
                    </p>
                    <p>
                      <Phone size={14} className="info-icon" />
                      <a href={`tel:${supplier.phone}`}>{supplier.phone}</a>
                    </p>
                    <p>
                      <MapPin size={14} className="info-icon" />
                      {supplier.address}
                    </p>
                  </div>
                  <div className="supplier-stats">
                    <div className="stat">
                      <span className="stat-value">{supplier.itemCount}</span>
                      <span className="stat-label">Items</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No suppliers found</div>
          )}
        </div>
      )}

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Supplier</h2>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Supplier Name</label>
                <input type="text" name="name" value={newSupplier.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input type="text" name="contact" value={newSupplier.contact} onChange={handleInputChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={newSupplier.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" name="phone" value={newSupplier.phone} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={newSupplier.address} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveNewSupplier}>
                Save Supplier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Supplier Modal */}
      {showEditModal && editSupplier && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Supplier</h2>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Supplier ID</label>
                <input type="text" value={editSupplier.id} disabled />
              </div>
              <div className="form-group">
                <label>Supplier Name</label>
                <input type="text" name="name" value={editSupplier.name} onChange={handleEditInputChange} required />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contact"
                  value={editSupplier.contact}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editSupplier.email}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={editSupplier.phone}
                    onChange={handleEditInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={editSupplier.address} onChange={handleEditInputChange} required />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={saveEditSupplier}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventorySupplierManagement

