"use client"

import { useState, useEffect } from "react"
import { Modal, FormGroup, Input, Button } from "../ui-components"
import { Save, Plus, Trash2, Search, User, Package } from "lucide-react"

export function OrderForm({ isOpen, onClose, onSave, order = null, inventory = [], customers = [] }) {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    deliveryDate: "",
    paymentMethod: "Cash on Delivery",
    items: [],
    notes: "",
  })

  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [showCustomerSearch, setShowCustomerSearch] = useState(false)
  const [showProductSearch, setShowProductSearch] = useState(false)
  const [customerSearchTerm, setCustomerSearchTerm] = useState("")
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (order) {
      setFormData({
        customerId: order.customerId || "",
        customerName: order.customerName || "",
        customerEmail: order.customerEmail || "",
        customerPhone: order.customerPhone || "",
        shippingAddress: order.shippingAddress || "",
        deliveryDate: order.deliveryDate || "",
        paymentMethod: order.paymentMethod || "Cash on Delivery",
        items: order.items || [],
        notes: order.notes || "",
      })

      const customer = customers.find((c) => c.id === order.customerId)
      if (customer) {
        setSelectedCustomer(customer)
      }
    } else {
      // Reset form for new order
      setFormData({
        customerId: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
        deliveryDate: "",
        paymentMethod: "Cash on Delivery",
        items: [],
        notes: "",
      })
      setSelectedCustomer(null)
    }
  }, [order, customers])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer)
    setFormData((prev) => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress: customer.address,
    }))
    setShowCustomerSearch(false)
    setCustomerSearchTerm("")
  }

  const handleAddProduct = (product) => {
    const existingItem = formData.items.find((item) => item.productId === product.id)

    if (existingItem) {
      // Update quantity if product already exists
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, product.quantity),
                total: (item.quantity + 1) * item.price,
              }
            : item,
        ),
      }))
    } else {
      // Add new product
      const newItem = {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        quantity: 1,
        price: product.price,
        total: product.price,
        availableStock: product.quantity,
      }

      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }))
    }

    setShowProductSearch(false)
    setProductSearchTerm("")
  }

  const handleItemQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
      return
    }

    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.min(newQuantity, item.availableStock),
              total: Math.min(newQuantity, item.availableStock) * item.price,
            }
          : item,
      ),
    }))
  }

  const handleRemoveItem = (productId) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }))
  }

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0)
    const shipping = subtotal > 5000 ? 0 : 200 // Free shipping over Rs. 5000
    const tax = Math.round(subtotal * 0.05) // 5% tax
    const total = subtotal + shipping + tax

    return { subtotal, shipping, tax, total }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required"
    if (!formData.customerEmail.trim()) newErrors.customerEmail = "Customer email is required"
    if (!formData.customerPhone.trim()) newErrors.customerPhone = "Customer phone is required"
    if (!formData.shippingAddress.trim()) newErrors.shippingAddress = "Shipping address is required"
    if (!formData.deliveryDate) newErrors.deliveryDate = "Delivery date is required"
    if (formData.items.length === 0) newErrors.items = "At least one item is required"

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.customerEmail && !emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format"
    }

    // Validate delivery date (should be in future)
    const today = new Date().toISOString().split("T")[0]
    if (formData.deliveryDate && formData.deliveryDate < today) {
      newErrors.deliveryDate = "Delivery date should be in the future"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      const { subtotal, shipping, tax, total } = calculateTotals()

      const orderData = {
        ...formData,
        subtotal,
        shipping,
        tax,
        total,
        status: order ? order.status : "Pending",
        paymentStatus: order ? order.paymentStatus : "Pending",
        ...(order && { id: order.id, orderNumber: order.orderNumber, orderDate: order.orderDate }),
      }

      try {
        await onSave(orderData)
        onClose()
      } catch (error) {
        console.error("Error saving order:", error)
      }
    }

    setIsSubmitting(false)
  }

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()),
  )

  const filteredProducts = inventory.filter(
    (product) =>
      product.quantity > 0 &&
      (product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(productSearchTerm.toLowerCase())),
  )

  const { subtotal, shipping, tax, total } = calculateTotals()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={order ? "Edit Order" : "Create New Order"} size="xlarge">
      <div style={{ padding: "24px" }}>
        <form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <User size={20} />
              Customer Information
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", marginBottom: "16px" }}>
              <FormGroup label="Customer" error={errors.customerName}>
                <div style={{ position: "relative" }}>
                  <Input
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Enter customer name or search existing"
                    error={errors.customerName}
                  />
                  {selectedCustomer && (
                    <div
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500",
                      }}
                    >
                      ✓ Selected
                    </div>
                  )}
                </div>
              </FormGroup>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCustomerSearch(!showCustomerSearch)}
                style={{ alignSelf: "end", height: "42px" }}
              >
                <Search size={16} />
                Search Customers
              </Button>
            </div>

            {showCustomerSearch && (
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  marginBottom: "16px",
                }}
              >
                <Input
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                  placeholder="Search customers..."
                  style={{ marginBottom: "12px" }}
                />
                <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      style={{
                        padding: "12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        cursor: "pointer",
                        backgroundColor: "white",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                    >
                      <div style={{ fontWeight: "500" }}>{customer.name}</div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {customer.email} • {customer.phone}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>{customer.address}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <FormGroup label="Email" error={errors.customerEmail}>
                <Input
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                  placeholder="customer@email.com"
                  error={errors.customerEmail}
                />
              </FormGroup>

              <FormGroup label="Phone" error={errors.customerPhone}>
                <Input
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                  placeholder="+92-300-1234567"
                  error={errors.customerPhone}
                />
              </FormGroup>
            </div>

            <FormGroup label="Shipping Address" error={errors.shippingAddress}>
              <textarea
                value={formData.shippingAddress}
                onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                placeholder="Enter complete shipping address"
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: `1px solid ${errors.shippingAddress ? "#ef4444" : "#d1d5db"}`,
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </FormGroup>
          </div>

          {/* Order Items */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
            >
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Package size={20} />
                Order Items ({formData.items.length})
              </h3>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowProductSearch(!showProductSearch)}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Plus size={16} />
                Add Product
              </Button>
            </div>

            {errors.items && <p style={{ color: "#ef4444", fontSize: "14px", marginBottom: "16px" }}>{errors.items}</p>}

            {showProductSearch && (
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  marginBottom: "16px",
                }}
              >
                <Input
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  style={{ marginBottom: "12px" }}
                />
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleAddProduct(product)}
                      style={{
                        padding: "12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        cursor: "pointer",
                        backgroundColor: "white",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: "500" }}>{product.name}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            SKU: {product.sku} • Stock: {product.quantity}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: "500" }}>Rs. {product.price.toLocaleString()}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{product.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Items List */}
            {formData.items.length > 0 && (
              <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ backgroundColor: "#f9fafb" }}>
                    <tr>
                      <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: "600" }}>
                        Product
                      </th>
                      <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: "600" }}>
                        Quantity
                      </th>
                      <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: "600" }}>
                        Price
                      </th>
                      <th style={{ padding: "12px", textAlign: "right", fontSize: "12px", fontWeight: "600" }}>
                        Total
                      </th>
                      <th style={{ padding: "12px", textAlign: "center", fontSize: "12px", fontWeight: "600" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.items.map((item) => (
                      <tr key={item.productId} style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: "12px" }}>
                          <div style={{ fontWeight: "500", fontSize: "14px" }}>{item.productName}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            SKU: {item.sku} • Available: {item.availableStock}
                          </div>
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <input
                            type="number"
                            min="1"
                            max={item.availableStock}
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemQuantityChange(item.productId, Number.parseInt(e.target.value) || 0)
                            }
                            style={{
                              width: "60px",
                              padding: "4px 8px",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              textAlign: "center",
                            }}
                          />
                        </td>
                        <td style={{ padding: "12px", textAlign: "right", fontWeight: "500" }}>
                          Rs. {item.price.toLocaleString()}
                        </td>
                        <td style={{ padding: "12px", textAlign: "right", fontWeight: "500" }}>
                          Rs. {item.total.toLocaleString()}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.productId)}
                            style={{
                              padding: "4px",
                              border: "none",
                              backgroundColor: "transparent",
                              color: "#ef4444",
                              cursor: "pointer",
                              borderRadius: "4px",
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {formData.items.length > 0 && (
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ marginBottom: "16px" }}>Order Summary</h3>
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? "Free" : `Rs. ${shipping.toLocaleString()}`}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span>Tax (5%):</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontWeight: "600",
                    paddingTop: "12px",
                    borderTop: "1px solid #d1d5db",
                  }}
                >
                  <span>Total:</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ marginBottom: "16px" }}>Order Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <FormGroup label="Delivery Date" error={errors.deliveryDate}>
                <Input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                  error={errors.deliveryDate}
                  min={new Date().toISOString().split("T")[0]}
                />
              </FormGroup>

              <FormGroup label="Payment Method">
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
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
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Mobile Payment">Mobile Payment</option>
                </select>
              </FormGroup>
            </div>

            <FormGroup label="Order Notes">
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Any special instructions or notes for this order..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </FormGroup>
          </div>

          {/* Form Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || formData.items.length === 0}
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
                  <span>{order ? "Update Order" : "Create Order"}</span>
                </>
              )}
            </Button>
          </div>
        </form>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Modal>
  )
}
