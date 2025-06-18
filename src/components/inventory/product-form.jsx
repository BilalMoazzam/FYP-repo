"use client"

import { useState, useEffect } from "react"
import { Modal, FormGroup, Input, Button } from "../ui-components"
import { Save } from "lucide-react"

export function ProductForm({ isOpen, onClose, onSave, product }) {
  const initialData = {
    id: "",
    name: "",
    category: "",
    size: "",
    color: "",
    fabric: "",
    quantity: 0,
    price: 0,
    supplier: "",
    status: "In Stock",
  }

  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (product) setFormData(product)
    else setFormData(initialData)
  }, [product, isOpen])

  const categories = [
    "Men Shalwar Kameez",
    "Women Shalwar Kameez",
    "Children Shalwar Kameez"
  ]

  const sizes = {
    "Men Shalwar Kameez": ["S", "M", "L", "XL", "XXL", "XXXL"],
    "Women Shalwar Kameez": ["XS", "S", "M", "L", "XL", "XXL"],
    "Children Shalwar Kameez": [
      "2-3 Years", "4-5 Years", "6-7 Years",
      "8-9 Years", "10-11 Years", "12-13 Years"
    ]
  }

  const colors = [
    "White", "Black", "Navy Blue", "Royal Blue", "Sky Blue",
    "Green", "Dark Green", "Red", "Maroon", "Pink", "Purple",
    "Yellow", "Orange", "Brown", "Grey", "Cream", "Beige",
    "Golden", "Silver", "Multi Color"
  ]

  const fabrics = [
    "Cotton", "Lawn", "Linen", "Silk", "Chiffon", "Georgette",
    "Khaddar", "Karandi", "Viscose", "Poly Cotton", "Pure Cotton", "Cambric"
  ]

  const suppliers = [
    "Local Tailor", "Wholesale Market", "Fabric House", "Designer Brand",
    "Online Supplier", "Direct Import", "Other"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === "quantity" || field === "price" ? parseFloat(value) || 0 : value,
    }))

    if (field === "category") {
      setFormData(prev => ({ ...prev, size: "" }))
    }

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.size) newErrors.size = "Size is required"
    if (!formData.color) newErrors.color = "Color is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.quantity < 0) newErrors.quantity = "Quantity cannot be negative"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateProductName = (category, size, color, fabric) => {
    const short = category.split(" ")[0] || "Product"
    return `${short} ${fabric || "Cotton"} Shalwar Kameez - ${color} - ${size}`
  }

  const generateSKU = (category, size, color) => {
    const catCode = category?.charAt(0) || "X"
    const sizeCode = size?.replace(/[^A-Z0-9]/g, "").substring(0, 2) || "00"
    const colorCode = color?.substring(0, 3).toUpperCase() || "XXX"
    const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
    return `SK${catCode}${sizeCode}${colorCode}${rand}`
  }

  const determineStatus = (qty) => {
    if (qty === 0) return "Out of Stock"
    if (qty <= 3) return "Low Stock"
    return "In Stock"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      const productName = generateProductName(formData.category, formData.size, formData.color, formData.fabric)

      const dataToSave = {
        ...formData,
        name: productName,
        id: formData.id || `INV${Date.now().toString().slice(-6)}`,
        sku: product?.sku || generateSKU(formData.category, formData.size, formData.color),
        status: determineStatus(formData.quantity),
        lastUpdated: new Date().toISOString().split("T")[0]
      }

      try {
        await onSave(dataToSave)
        handleClose()
      } catch (err) {
        console.error("Error saving product:", err)
      }
    }
    setIsSubmitting(false)
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  const isEditing = !!product

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Product" : "Add New Product"}
      size="medium"
    >
      <div style={{ padding: "24px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <FormGroup label="Category *" error={errors.category}>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                style={dropdownStyle(errors.category)}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup label="Status">
              <Input value={determineStatus(formData.quantity)} disabled />
            </FormGroup>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <FormGroup label="Size *" error={errors.size}>
              <select
                value={formData.size}
                onChange={(e) => handleInputChange("size", e.target.value)}
                style={dropdownStyle(errors.size)}
                disabled={!formData.category}
              >
                <option value="">Select Size</option>
                {(sizes[formData.category] || []).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Color *" error={errors.color}>
              <select
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                style={dropdownStyle(errors.color)}
              >
                <option value="">Select Color</option>
                {colors.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </FormGroup>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <FormGroup label="Quantity *" error={errors.quantity}>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                min="0"
              />
            </FormGroup>

            <FormGroup label="Price (Rs.) *" error={errors.price}>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                min="0"
              />
            </FormGroup>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
            <FormGroup label="Fabric">
              <select
                value={formData.fabric}
                onChange={(e) => handleInputChange("fabric", e.target.value)}
                style={dropdownStyle()}
              >
                <option value="">Select Fabric</option>
                {fabrics.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </FormGroup>

            <FormGroup label="Supplier">
              <select
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
                style={dropdownStyle()}
              >
                <option value="">Select Supplier</option>
                {suppliers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </FormGroup>
          </div>

          {(formData.category && formData.size && formData.color) && (
            <div style={{
              padding: "12px",
              backgroundColor: "#f3f4f6",
              borderRadius: "6px",
              marginTop: "20px"
            }}>
              <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                <strong>Product Name:</strong> {generateProductName(formData.category, formData.size, formData.color, formData.fabric)}<br />
                <strong>SKU:</strong> {generateSKU(formData.category, formData.size, formData.color)}
              </p>
            </div>
          )}

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb"
          }}>
            <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: isSubmitting ? 0.7 : 1
            }}>
              {isSubmitting ? (
                <>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid #ffffff",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>{isEditing ? "Update Product" : "Add Product"}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
      <style>{`@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
    </Modal>
  )
}

function dropdownStyle(error = false) {
  return {
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "white"
  }
}