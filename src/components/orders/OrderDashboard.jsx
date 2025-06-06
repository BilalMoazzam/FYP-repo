"use client"

import { useState } from "react"
import { ShoppingCart, Clock, Truck, CheckCircle, Plus, Search, Eye, Edit, Trash2 } from "lucide-react"

export function OrderDashboard({
  orders = [],
  customers = [],
  inventory = [],
  onCreateOrder,
  onEditOrder,
  onDeleteOrder,
  onViewOrder,
  onUpdateOrderStatus,
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  // Calculate statistics
  const totalOrders = orders.length
  const pendingOrders = orders.filter((order) => order.status === "Pending").length
  const processingOrders = orders.filter((order) => order.status === "Processing").length
  const shippedOrders = orders.filter((order) => order.status === "Shipped").length
  const deliveredOrders = orders.filter((order) => order.status === "Delivered").length
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled").length

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.total, 0)

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = !statusFilter || order.status === statusFilter
    const matchesDate = !dateFilter || order.orderDate >= dateFilter

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: { backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" },
      Processing: { backgroundColor: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe" },
      Shipped: { backgroundColor: "#e0e7ff", color: "#3730a3", border: "1px solid #c7d2fe" },
      Delivered: { backgroundColor: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" },
      Cancelled: { backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" },
    }

    const style = statusStyles[status] || statusStyles.Pending

    return (
      <span
        style={{
          ...style,
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "500",
          display: "inline-block",
        }}
      >
        {status}
      </span>
    )
  }

  const getPaymentStatusBadge = (status) => {
    const statusStyles = {
      Paid: { backgroundColor: "#dcfce7", color: "#166534" },
      Pending: { backgroundColor: "#fef3c7", color: "#92400e" },
      Refunded: { backgroundColor: "#fee2e2", color: "#991b1b" },
    }

    const style = statusStyles[status] || statusStyles.Pending

    return (
      <span
        style={{
          ...style,
          padding: "2px 8px",
          borderRadius: "8px",
          fontSize: "11px",
          fontWeight: "500",
        }}
      >
        {status}
      </span>
    )
  }

  const handleStatusChange = (orderId, newStatus) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus)
    }
  }

  return (
    <div className="order-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Order Management</h1>
            <p>Track and manage customer orders and shipments</p>
          </div>
          <button className="create-order-btn" onClick={onCreateOrder}>
            <Plus size={20} />
            <span>Create New Order</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <div className="stat-value">{totalOrders}</div>
            <div className="stat-revenue">Rs. {totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Orders</h3>
            <div className="stat-value">{pendingOrders}</div>
            <div className="stat-sub">Processing: {processingOrders}</div>
          </div>
        </div>

        <div className="stat-card shipped">
          <div className="stat-icon">
            <Truck size={24} />
          </div>
          <div className="stat-content">
            <h3>Shipped Orders</h3>
            <div className="stat-value">{shippedOrders}</div>
            <div className="stat-sub">In Transit</div>
          </div>
        </div>

        <div className="stat-card delivered">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>Completed</h3>
            <div className="stat-value">{deliveredOrders}</div>
            <div className="stat-sub">Cancelled: {cancelledOrders}</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-section">
        {/* Table Header with Filters */}
        <div className="table-header">
          <div className="table-title">
            <h2>Recent Orders ({filteredOrders.length})</h2>
          </div>

          <div className="table-filters">
            {/* Search */}
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Date Filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-date"
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td className="order-details">
                    <div className="order-number">{order.orderNumber}</div>
                    <div className="order-id">ID: {order.id}</div>
                    {order.trackingNumber && <div className="tracking-number">Track: {order.trackingNumber}</div>}
                  </td>

                  <td className="customer-info">
                    <div className="customer-name">{order.customerName}</div>
                    <div className="customer-email">{order.customerEmail}</div>
                    <div className="customer-phone">{order.customerPhone}</div>
                  </td>

                  <td className="order-items">
                    <div className="items-count">{order.items.length} item(s)</div>
                    <div className="items-preview">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="item-preview">
                          {item.quantity}x {item.productName.split(" - ")[0]}
                        </div>
                      ))}
                      {order.items.length > 2 && <div className="more-items">+{order.items.length - 2} more</div>}
                    </div>
                  </td>

                  <td className="order-total">
                    <div className="total-amount">Rs. {order.total.toLocaleString()}</div>
                    <div className="subtotal">Subtotal: Rs. {order.subtotal.toLocaleString()}</div>
                  </td>

                  <td className="order-status">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                      disabled={order.status === "Delivered" || order.status === "Cancelled"}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    {order.deliveryDate && <div className="delivery-date">Due: {order.deliveryDate}</div>}
                  </td>

                  <td className="payment-status">
                    {getPaymentStatusBadge(order.paymentStatus)}
                    <div className="payment-method">{order.paymentMethod}</div>
                  </td>

                  <td className="order-date">
                    <div className="date">{order.orderDate}</div>
                    {order.deliveredDate && <div className="delivered-date">Delivered: {order.deliveredDate}</div>}
                    {order.cancelledDate && <div className="cancelled-date">Cancelled: {order.cancelledDate}</div>}
                  </td>

                  <td className="order-actions">
                    <div className="action-buttons">
                      <button className="action-btn view" onClick={() => onViewOrder(order)} title="View Order Details">
                        <Eye size={16} />
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => onEditOrder(order)}
                        title="Edit Order"
                        disabled={order.status === "Delivered" || order.status === "Cancelled"}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => onDeleteOrder(order.id)}
                        title="Delete Order"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="empty-state">
              <ShoppingCart size={48} />
              <h3>No orders found</h3>
              <p>
                {searchTerm || statusFilter || dateFilter
                  ? "Try adjusting your search or filters"
                  : "Create your first order to get started"}
              </p>
              {!searchTerm && !statusFilter && !dateFilter && (
                <button className="create-order-btn" onClick={onCreateOrder}>
                  <Plus size={16} />
                  Create First Order
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
