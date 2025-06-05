"use client"

import { useState } from "react"
import { Modal, FormGroup, Input, Button } from "../ui-components"
import { Save } from "lucide-react"

export function ProductForm({ isOpen, onClose, onSave, product = null }) {
  const [formData, setFormData] = useState(
    product || {
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
    },
  )
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Clothing specific options
  const categories = ["Men Shalwar Kameez", "Women Shalwar Kameez", "Children Shalwar Kameez"]

  const sizes = {
    "Men Shalwar Kameez": ["S", "M", "L", "XL", "XXL", "XXXL"],
    "Women Shalwar Kameez": ["XS", "S", "M", "L", "XL", "XXL"],
    "Children Shalwar Kameez": ["2-3 Years", "4-5 Years", "6-7 Years", "8-9 Years", "10-11 Years", "12-13 Years"],
  }

  const colors = [
    "White",
    "Black",
    "Navy Blue",
    "Royal Blue",
    "Sky Blue",
    "Green",
    "Dark Green",
    "Red",
    "Maroon",
    "Pink",
    "Purple",
    "Yellow",
    "Orange",
    "Brown",
    "Grey",
    "Cream",
    "Beige",
    "Golden",
    "Silver",
    "Multi Color",
  ]

  const fabrics = [
    "Cotton",
    "Lawn",
    "Linen",
    "Silk",
    "Chiffon",
    "Georgette",
    "Khaddar",
    "Karandi",
    "Viscose",
    "Poly Cotton",
    "Pure Cotton",
    "Cambric",
  ]

  const suppliers = [
    "Local Tailor",
    "Wholesale Market",
    "Fabric House",
    "Designer Brand",
    "Online Supplier",
    "Direct Import",
    "Other",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "quantity" || field === "price" ? Number.parseFloat(value) || 0 : value,
    }))

    // Clear size when category changes
    if (field === "category") {
      setFormData((prev) => ({ ...prev, size: "" }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
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
    const categoryShort = category.split(" ")[0] // Men, Women, Children
    return `${categoryShort} ${fabric || "Cotton"} Shalwar Kameez - ${color} - ${size}`
  }

  const generateSKU = (category, size, color) => {
    const categoryCode = category.charAt(0) // M, W, C
    const sizeCode = size.replace(/[^A-Z0-9]/g, "").substring(0, 2)
    const colorCode = color.substring(0, 3).toUpperCase()
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `SK${categoryCode}${sizeCode}${colorCode}${randomNum}`
  }

  const determineStatus = (quantity) => {
    if (quantity === 0) return "Out of Stock"
    if (quantity <= 3) return "Low Stock"
    return "In Stock"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      const productName = product
        ? formData.name
        : generateProductName(formData.category, formData.size, formData.color, formData.fabric)

      const dataToSave = {
        ...formData,
        name: productName,
        id: product ? product.id : `INV${Date.now().toString().slice(-6)}`,
        sku: product ? product.sku : generateSKU(formData.category, formData.size, formData.color),
        status: determineStatus(formData.quantity),
        lastUpdated: new Date().toISOString().split("T")[0],
      }

      try {
        await onSave(dataToSave)
        onClose()

        // Reset form if adding new product
        if (!product) {
          setFormData({
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
          })
        }
      } catch (error) {
        console.error("Error saving product:", error)
      }
    }

    setIsSubmitting(false)
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  // Different form layouts for Add vs Edit
  const isEditing = !!product

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? "Edit Item" : "Add New Shalwar Kameez"}
      size="medium"
    >
      <div style={{ padding: "24px" }}>
        <form onSubmit={handleSubmit}>
          {isEditing ? (
            // Simple Edit Form - Only essential fields
            <>
              <FormGroup label="Quantity" error={errors.quantity}>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="0"
                  min="0"
                  error={errors.quantity}
                  autoFocus
                />
              </FormGroup>

              <FormGroup label="Price (Rs.)" error={errors.price}>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0"
                  min="0"
                  error={errors.price}
                />
              </FormGroup>

              <div
                style={{
                  padding: "12px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "6px",
                  marginBottom: "20px",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                  <strong>Item:</strong> {formData.name}
                  <br />
                  <strong>Status will be:</strong> {determineStatus(formData.quantity)}
                </p>
              </div>
            </>
          ) : (
            // Detailed Add Form - All clothing specific fields
            <>
              {/* Category */}
              <FormGroup label="Category *" error={errors.category}>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: `1px solid ${errors.category ? "#ef4444" : "#d1d5db"}`,
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "white",
                  }}
                  autoFocus
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormGroup>

              {/* Size and Color Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <FormGroup label="Size *" error={errors.size}>
                  <select
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: `1px solid ${errors.size ? "#ef4444" : "#d1d5db"}`,
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                    disabled={!formData.category}
                  >
                    <option value="">Select Size</option>
                    {formData.category &&
                      sizes[formData.category]?.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                  </select>
                </FormGroup>

                <FormGroup label="Color *" error={errors.color}>
                  <select
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: `1px solid ${errors.color ? "#ef4444" : "#d1d5db"}`,
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </div>

              {/* Fabric and Supplier Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <FormGroup label="Fabric">
                  <select
                    value={formData.fabric}
                    onChange={(e) => handleInputChange("fabric", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Fabric</option>
                    {fabrics.map((fabric) => (
                      <option key={fabric} value={fabric}>
                        {fabric}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup label="Supplier">
                  <select
                    value={formData.supplier}
                    onChange={(e) => handleInputChange("supplier", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier} value={supplier}>
                        {supplier}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </div>

              {/* Quantity and Price Row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <FormGroup label="Quantity" error={errors.quantity}>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    placeholder="0"
                    min="0"
                    error={errors.quantity}
                  />
                </FormGroup>

                <FormGroup label="Price (Rs.) *" error={errors.price}>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0"
                    min="0"
                    error={errors.price}
                  />
                </FormGroup>
              </div>

              {/* Preview */}
              {formData.category && formData.size && formData.color && (
                <div
                  style={{
                    padding: "12px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "6px",
                    marginBottom: "20px",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                    <strong>Product Name:</strong>{" "}
                    {generateProductName(formData.category, formData.size, formData.color, formData.fabric)}
                    <br />
                    <strong>SKU:</strong> {generateSKU(formData.category, formData.size, formData.color)}
                    <br />
                    <strong>Status:</strong> {determineStatus(formData.quantity)}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Form Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                <>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>{isEditing ? "Update Item" : "Add Item"}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Modal>
  )
}
