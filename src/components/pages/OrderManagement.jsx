"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import { Search, Filter, Plus, Upload, ChevronDown } from "lucide-react"
import "../styles/OrderManagement.css"

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedOrders, setSelectedOrders] = useState([])

  // Mock data for orders
  const mockOrders = [
    { id: "#8701", customerName: "Aqsa Khan", date: "08/11/2021", category: "Clothing", items: 5, status: "Fulfilled" },
    {
      id: "#8702",
      customerName: "Kevin Parson",
      date: "08/22/2021",
      category: "Clothing",
      items: 1,
      status: "Fulfilled",
    },
    { id: "#8703", customerName: "Ahmad Ali", date: "09/01/2021", category: "Clothing", items: 4, status: "Pending" },
    {
      id: "#8704",
      customerName: "Zain Hassan",
      date: "08/11/2021",
      category: "Clothing",
      items: 2,
      status: "Fulfilled",
    },
    {
      id: "#8705",
      customerName: "Olivia Cooper",
      date: "12/01/2024",
      category: "Clothing",
      items: 4,
      status: "Unfulfilled",
    },
    {
      id: "#8706",
      customerName: "Zohaib Shokat",
      date: "03/09/2024",
      category: "Clothing",
      items: 1,
      status: "Pending",
    },
    {
      id: "#8707",
      customerName: "Ghazala Jawad",
      date: "11/11/2024",
      category: "Clothing",
      items: 3,
      status: "Fulfilled",
    },
    {
      id: "#8708",
      customerName: "Abdul Moiz",
      date: "11/21/2024",
      category: "Clothing",
      items: 6,
      status: "Fulfilled",
    },
    {
      id: "#8709",
      customerName: "Saad Naweed",
      date: "05/16/2024",
      category: "Clothing",
      items: 3,
      status: "Unfulfilled",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setFilteredOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterOrders()
  }, [searchTerm, activeTab, orders])

  const filterOrders = () => {
    let filtered = orders

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by tab
    if (activeTab === "monitored") {
      filtered = filtered.filter((order) => order.status === "Fulfilled")
    } else if (activeTab === "test") {
      filtered = filtered.filter((order) => order.status === "Pending")
    }

    setFilteredOrders(filtered)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleAddOrder = () => {
    // Implement add order functionality
    console.log("Add order clicked")
  }

  const handleOrderSelect = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Fulfilled":
        return "status-fulfilled"
      case "Pending":
        return "status-pending"
      case "Unfulfilled":
        return "status-unfulfilled"
      default:
        return ""
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Fulfilled":
        return "+"
      case "Pending":
        return "+"
      case "Unfulfilled":
        return "x"
      default:
        return ""
    }
  }

  return (
    <div className="order-management">
      <Header
        title="Order"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Order", active: true },
        ]}
      />

      <div className="order-container">
        <div className="order-actions">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
          </div>

          <div className="action-buttons">
            <button className="btn btn-import">
              <Upload size={18} />
              <span>Import</span>
            </button>
            <button className="btn btn-add" onClick={handleAddOrder}>
              <Plus size={18} />
              <span>Add Order</span>
            </button>
          </div>
        </div>

        <div className="order-tabs">
          <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => handleTabChange("all")}>
            View all
          </button>
          <button
            className={`tab ${activeTab === "monitored" ? "active" : ""}`}
            onClick={() => handleTabChange("monitored")}
          >
            Monitored
          </button>
          <button className={`tab ${activeTab === "test" ? "active" : ""}`} onClick={() => handleTabChange("test")}>
            Test
          </button>
        </div>

        <div className="filters-section">
          <button className="btn btn-filter">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading order data...</div>
        ) : (
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    />
                  </th>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleOrderSelect(order.id)}
                        />
                      </td>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.date}</td>
                      <td>{order.category}</td>
                      <td>{order.items}</td>
                      <td>
                        <span className={`status ${getStatusClass(order.status)}`}>
                          <span className="status-icon">{getStatusIcon(order.status)}</span>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn dropdown-btn">
                          <ChevronDown size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderManagement

