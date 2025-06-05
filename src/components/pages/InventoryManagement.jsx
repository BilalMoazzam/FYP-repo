"use client"

import { useState, useEffect } from "react"
import { Navbar } from "../layout/Navbar"
import { InventoryDashboard } from "../inventory/InventoryDashboard"
import { BarcodeScanner } from "../inventory/barcode-scanner"
import { CategoryManager } from "../inventory/category-manager"
import { ProductDetails } from "../inventory/product-details"
import { ProductForm } from "../inventory/product-form"
import { Modal } from "../ui-components"

const InventoryManagement = () => {
  const [activeView, setActiveView] = useState("inventory")
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showProductForm, setShowProductForm] = useState(false)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  

  // Mock data
  const mockInventory = [
    {
      id: "SK001",
      name: "Men Cotton Shalwar Kameez - White - L",
      sku: "SKLWHI001",
      category: "Men Shalwar Kameez",
      size: "L",
      color: "White",
      fabric: "Cotton",
      quantity: 25,
      price: 2500,
      supplier: "Local Tailor",
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "SK002",
      name: "Women Lawn Shalwar Kameez - Pink - M",
      sku: "SKLPIN002",
      category: "Women Shalwar Kameez",
      size: "M",
      color: "Pink",
      fabric: "Lawn",
      quantity: 3,
      price: 3200,
      supplier: "Fabric House",
      status: "Low Stock",
      lastUpdated: "2024-01-14",
    },
    {
      id: "SK003",
      name: "Children Cotton Shalwar Kameez - Navy Blue - 6-7 Years",
      sku: "SKNAVB003",
      category: "Children Shalwar Kameez",
      size: "6-7 Years",
      color: "Navy Blue",
      fabric: "Cotton",
      quantity: 0,
      price: 1800,
      supplier: "Wholesale Market",
      status: "Out of Stock",
      lastUpdated: "2024-01-13",
    },
    {
      id: "SK004",
      name: "Men Khaddar Shalwar Kameez - Brown - XL",
      sku: "SKLBRO004",
      category: "Men Shalwar Kameez",
      size: "XL",
      color: "Brown",
      fabric: "Khaddar",
      quantity: 15,
      price: 2800,
      supplier: "Designer Brand",
      status: "In Stock",
      lastUpdated: "2024-01-12",
    },
    {
      id: "SK005",
      name: "Women Silk Shalwar Kameez - Golden - L",
      sku: "SKLGOL005",
      category: "Women Shalwar Kameez",
      size: "L",
      color: "Golden",
      fabric: "Silk",
      quantity: 8,
      price: 4500,
      supplier: "Direct Import",
      status: "In Stock",
      lastUpdated: "2024-01-11",
    },
    {
      id: "SK006",
      name: "Children Lawn Shalwar Kameez - Sky Blue - 8-9 Years",
      sku: "SKLSKY006",
      category: "Children Shalwar Kameez",
      size: "8-9 Years",
      color: "Sky Blue",
      fabric: "Lawn",
      quantity: 2,
      price: 2200,
      supplier: "Local Tailor",
      status: "Low Stock",
      lastUpdated: "2024-01-10",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInventory(mockInventory)
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddProduct = (productData = null) => {
    setEditingProduct(null)
  
    if (productData && productData.barcode) {
      // Pre-fill the product form with the scanned barcode
      setEditingProduct({ barcode: productData.barcode })
    }
  
    setShowProductForm(true)
  }
  
  // Save product to inventory
  const handleSaveProduct = (productData) => {
    if (editingProduct && editingProduct.id) {
      // Edit existing product
      setInventory((prev) =>
        prev.map((item) => (item.id === editingProduct.id ? productData : item))
      )
    } else {
      // Add new product
      setInventory((prev) => [...prev, productData])
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

 

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setInventory((prev) => prev.filter((item) => item.id !== productId))
    }
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setShowProductDetails(true)
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 64px)",
            fontSize: "18px",
            color: "#6b7280",
          }}
        >
          Loading inventory data...
        </div>
      )
    }

    switch (activeView) {
      case "dashboard":
        return (
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>Dashboard</h1>
            <p style={{ color: "#6b7280", marginBottom: "32px" }}>Welcome to your inventory management dashboard</p>
            <InventoryDashboard
              inventory={inventory}
              onAddItem={handleAddProduct}
              onEditItem={handleEditProduct}
              onDeleteItem={handleDeleteProduct}
              onViewDetails={handleViewDetails}
            />
          </div>
        )

      case "inventory":
        return (
          <InventoryDashboard
            inventory={inventory}
            onAddItem={handleAddProduct}
            onEditItem={handleEditProduct}
            onDeleteItem={handleDeleteProduct}
            onViewDetails={handleViewDetails}
          />
        )

      case "scanner":
        return (
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
              Barcode Scanner
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "32px" }}>
              Scan product barcodes to quickly lookup inventory information
            </p>
            <BarcodeScanner />
          </div>
        )

      case "categories":
        return (
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
              Category Management
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "32px" }}>
              Organize your products with categories and subcategories
            </p>
            <CategoryManager />
          </div>
        )

      case "analytics":
        return (
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>Analytics</h1>
            <p style={{ color: "#6b7280", marginBottom: "32px" }}>
              View detailed analytics and insights about your inventory
            </p>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "48px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "18px", color: "#6b7280" }}>Analytics dashboard coming soon...</p>
            </div>
          </div>
        )

      case "reports":
        return (
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>Reports</h1>
            <p style={{ color: "#6b7280", marginBottom: "32px" }}>Generate and export inventory reports</p>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "48px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "18px", color: "#6b7280" }}>Reports section coming soon...</p>
            </div>
          </div>
        )

      case "users":
        return (
          <div style={{ padding: "24px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1f2937", marginBottom: "8px" }}>
              User Management
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "32px" }}>Manage user accounts and permissions</p>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                padding: "48px",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "18px", color: "#6b7280" }}>User management coming soon...</p>
            </div>
          </div>
        )

      default:
        return (
          <InventoryDashboard
            inventory={inventory}
            onAddItem={handleAddProduct}
            onEditItem={handleEditProduct}
            onDeleteItem={handleDeleteProduct}
            onViewDetails={handleViewDetails}
          />
        )
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        
      }}
    >
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      <main>{renderContent()}</main>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <Modal
          isOpen={showProductDetails}
          onClose={() => setShowProductDetails(false)}
          title="Product Details"
          size="xlarge"
        >
          <ProductDetails
            product={selectedProduct}
            onEdit={(product) => {
              setShowProductDetails(false)
              handleEditProduct(product)
            }}
          />
        </Modal>
      )}
    </div>
  )
}

export default InventoryManagement
