"use client"

import { useState, useEffect } from "react"
import { OrderDashboard } from "../orders/OrderDashboard"
import { OrderForm } from "../orders/OrderForm"
import { OrderDetails } from "../orders/OrderDetails"
import { Modal } from "../ui-components"
import "../styles/OrderManagement.css"

const OrderManagement = () => {
  const [activeView, setActiveView] = useState("orders")
  const [orders, setOrders] = useState([])
  const [inventory, setInventory] = useState([])
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal states
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Mock inventory data (from previous inventory system)
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
      status: "In Stock",
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
      status: "Low Stock",
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
      status: "Out of Stock",
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
      status: "In Stock",
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
      status: "In Stock",
    },
  ]

  // Mock customers data
  const mockCustomers = [
    {
      id: "CUST001",
      name: "Ahmad Ali",
      email: "ahmad.ali@email.com",
      phone: "+92-300-1234567",
      address: "123 Main Street, Lahore, Pakistan",
      city: "Lahore",
    },
    {
      id: "CUST002",
      name: "Fatima Khan",
      email: "fatima.khan@email.com",
      phone: "+92-301-2345678",
      address: "456 Garden Town, Karachi, Pakistan",
      city: "Karachi",
    },
    {
      id: "CUST003",
      name: "Hassan Sheikh",
      email: "hassan.sheikh@email.com",
      phone: "+92-302-3456789",
      address: "789 Blue Area, Islamabad, Pakistan",
      city: "Islamabad",
    },
    {
      id: "CUST004",
      name: "Ayesha Malik",
      email: "ayesha.malik@email.com",
      phone: "+92-303-4567890",
      address: "321 Gulberg, Lahore, Pakistan",
      city: "Lahore",
    },
    {
      id: "CUST005",
      name: "Muhammad Usman",
      email: "m.usman@email.com",
      phone: "+92-304-5678901",
      address: "654 Defence, Karachi, Pakistan",
      city: "Karachi",
    },
  ]

  // Mock orders data
  const mockOrders = [
    {
      id: "ORD001",
      orderNumber: "#ORD-001",
      customerId: "CUST001",
      customerName: "Ahmad Ali",
      customerEmail: "ahmad.ali@email.com",
      customerPhone: "+92-300-1234567",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-20",
      status: "Pending",
      paymentStatus: "Paid",
      paymentMethod: "Cash on Delivery",
      shippingAddress: "123 Main Street, Lahore, Pakistan",
      items: [
        {
          productId: "SK001",
          productName: "Men Cotton Shalwar Kameez - White - L",
          sku: "SKLWHI001",
          quantity: 2,
          price: 2500,
          total: 5000,
        },
        {
          productId: "SK004",
          productName: "Men Khaddar Shalwar Kameez - Brown - XL",
          sku: "SKLBRO004",
          quantity: 1,
          price: 2800,
          total: 2800,
        },
      ],
      subtotal: 7800,
      shipping: 200,
      tax: 390,
      total: 8390,
      notes: "Please deliver between 2-5 PM",
    },
    {
      id: "ORD002",
      orderNumber: "#ORD-002",
      customerId: "CUST002",
      customerName: "Fatima Khan",
      customerEmail: "fatima.khan@email.com",
      customerPhone: "+92-301-2345678",
      orderDate: "2024-01-14",
      deliveryDate: "2024-01-19",
      status: "Shipped",
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
      shippingAddress: "456 Garden Town, Karachi, Pakistan",
      items: [
        {
          productId: "SK002",
          productName: "Women Lawn Shalwar Kameez - Pink - M",
          sku: "SKLPIN002",
          quantity: 1,
          price: 3200,
          total: 3200,
        },
        {
          productId: "SK005",
          productName: "Women Silk Shalwar Kameez - Golden - L",
          sku: "SKLGOL005",
          quantity: 1,
          price: 4500,
          total: 4500,
        },
      ],
      subtotal: 7700,
      shipping: 250,
      tax: 385,
      total: 8335,
      trackingNumber: "TRK123456789",
      notes: "Handle with care - silk fabric",
    },
    {
      id: "ORD003",
      orderNumber: "#ORD-003",
      customerId: "CUST003",
      customerName: "Hassan Sheikh",
      customerEmail: "hassan.sheikh@email.com",
      customerPhone: "+92-302-3456789",
      orderDate: "2024-01-13",
      deliveryDate: "2024-01-18",
      status: "Delivered",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      shippingAddress: "789 Blue Area, Islamabad, Pakistan",
      items: [
        {
          productId: "SK001",
          productName: "Men Cotton Shalwar Kameez - White - L",
          sku: "SKLWHI001",
          quantity: 1,
          price: 2500,
          total: 2500,
        },
      ],
      subtotal: 2500,
      shipping: 150,
      tax: 125,
      total: 2775,
      deliveredDate: "2024-01-18",
      notes: "",
    },
    {
      id: "ORD004",
      orderNumber: "#ORD-004",
      customerId: "CUST004",
      customerName: "Ayesha Malik",
      customerEmail: "ayesha.malik@email.com",
      customerPhone: "+92-303-4567890",
      orderDate: "2024-01-12",
      deliveryDate: "2024-01-17",
      status: "Processing",
      paymentStatus: "Pending",
      paymentMethod: "Cash on Delivery",
      shippingAddress: "321 Gulberg, Lahore, Pakistan",
      items: [
        {
          productId: "SK002",
          productName: "Women Lawn Shalwar Kameez - Pink - M",
          sku: "SKLPIN002",
          quantity: 2,
          price: 3200,
          total: 6400,
        },
      ],
      subtotal: 6400,
      shipping: 200,
      tax: 320,
      total: 6920,
      notes: "Customer requested pink color specifically",
    },
    {
      id: "ORD005",
      orderNumber: "#ORD-005",
      customerId: "CUST005",
      customerName: "Muhammad Usman",
      customerEmail: "m.usman@email.com",
      customerPhone: "+92-304-5678901",
      orderDate: "2024-01-11",
      deliveryDate: "2024-01-16",
      status: "Cancelled",
      paymentStatus: "Refunded",
      paymentMethod: "Bank Transfer",
      shippingAddress: "654 Defence, Karachi, Pakistan",
      items: [
        {
          productId: "SK004",
          productName: "Men Khaddar Shalwar Kameez - Brown - XL",
          sku: "SKLBRO004",
          quantity: 1,
          price: 2800,
          total: 2800,
        },
      ],
      subtotal: 2800,
      shipping: 250,
      tax: 140,
      total: 3190,
      cancelledDate: "2024-01-12",
      cancelReason: "Customer changed mind",
      notes: "Refund processed on 2024-01-13",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setInventory(mockInventory)
      setCustomers(mockCustomers)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateOrder = () => {
    setEditingOrder(null)
    setShowOrderForm(true)
  }

  const handleEditOrder = (order) => {
    setEditingOrder(order)
    setShowOrderForm(true)
  }

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      // Update existing order
      setOrders((prev) => prev.map((order) => (order.id === editingOrder.id ? orderData : order)))
    } else {
      // Add new order
      const newOrder = {
        ...orderData,
        id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
        orderNumber: `#ORD-${String(orders.length + 1).padStart(3, "0")}`,
        orderDate: new Date().toISOString().split("T")[0],
      }
      setOrders((prev) => [newOrder, ...prev])

      // Update inventory quantities
      orderData.items.forEach((item) => {
        setInventory((prev) =>
          prev.map((product) =>
            product.id === item.productId
              ? {
                  ...product,
                  quantity: Math.max(0, product.quantity - item.quantity),
                  status:
                    product.quantity - item.quantity === 0
                      ? "Out of Stock"
                      : product.quantity - item.quantity <= 3
                        ? "Low Stock"
                        : "In Stock",
                }
              : product,
          ),
        )
      })
    }
  }

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId))
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              ...(newStatus === "Delivered" && { deliveredDate: new Date().toISOString().split("T")[0] }),
              ...(newStatus === "Cancelled" && { cancelledDate: new Date().toISOString().split("T")[0] }),
            }
          : order,
      ),
    )
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading order data...</p>
        </div>
      )
    }

    switch (activeView) {
      case "orders":
        return (
          <OrderDashboard
            orders={orders}
            customers={customers}
            inventory={inventory}
            onCreateOrder={handleCreateOrder}
            onEditOrder={handleEditOrder}
            onDeleteOrder={handleDeleteOrder}
            onViewOrder={handleViewOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )

      default:
        return (
          <OrderDashboard
            orders={orders}
            customers={customers}
            inventory={inventory}
            onCreateOrder={handleCreateOrder}
            onEditOrder={handleEditOrder}
            onDeleteOrder={handleDeleteOrder}
            onViewOrder={handleViewOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )
    }
  }

  return (
    <div className="order-management">
      

      <main className="order-main-content">{renderContent()}</main>

      {/* Order Form Modal */}
      <OrderForm
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        onSave={handleSaveOrder}
        order={editingOrder}
        inventory={inventory}
        customers={customers}
      />

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <Modal isOpen={showOrderDetails} onClose={() => setShowOrderDetails(false)} title="Order Details" size="xlarge">
          <OrderDetails
            order={selectedOrder}
            onEdit={(order) => {
              setShowOrderDetails(false)
              handleEditOrder(order)
            }}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </Modal>
      )}
    </div>
  )
}

export default OrderManagement
