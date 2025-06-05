"use client"

import { useState, useEffect } from "react"
import "../styles/Dashboard.css"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0,
      lowStockProducts: 0,
      pendingOrders: 0,
    },
    recentOrders: [],
    lowStockAlerts: [],
    salesChart: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setDashboardData((prev) => ({ ...prev, loading: true, error: null }))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock data for testing
      setDashboardData({
        stats: {
          totalProducts: 150,
          totalOrders: 89,
          totalUsers: 25,
          totalRevenue: 45230,
          lowStockProducts: 8,
          pendingOrders: 12,
        },
        recentOrders: [
          {
            _id: "1",
            orderNumber: "ORD-001",
            customer: { name: "John Doe" },
            totals: { total: 299.99 },
            status: "Pending",
          },
          {
            _id: "2",
            orderNumber: "ORD-002",
            customer: { name: "Jane Smith" },
            totals: { total: 149.5 },
            status: "Shipped",
          },
          {
            _id: "3",
            orderNumber: "ORD-003",
            customer: { name: "Bob Johnson" },
            totals: { total: 89.99 },
            status: "Delivered",
          },
        ],
        lowStockAlerts: [
          {
            _id: "1",
            name: "Wireless Headphones",
            sku: "WH-001",
            stock: { current: 5 },
          },
          {
            _id: "2",
            name: "USB Cable",
            sku: "USB-002",
            stock: { current: 3 },
          },
          {
            _id: "3",
            name: "Phone Case",
            sku: "PC-003",
            stock: { current: 2 },
          },
        ],
        salesChart: [
          { _id: { month: 1, year: 2024 }, revenue: 15000 },
          { _id: { month: 2, year: 2024 }, revenue: 18000 },
          { _id: { month: 3, year: 2024 }, revenue: 22000 },
          { _id: { month: 4, year: 2024 }, revenue: 19000 },
          { _id: { month: 5, year: 2024 }, revenue: 25000 },
        ],
        loading: false,
        error: null,
      })
    } catch (error) {
      console.error("Dashboard data loading error:", error)
      setDashboardData((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard data",
      }))
    }
  }

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className={`dashboard-stat-card ${color}`}>
      <div className="dashboard-stat-icon">{icon}</div>
      <div className="dashboard-stat-content">
        <h3>{title}</h3>
        <div className="dashboard-stat-value">{value}</div>
        {trend && (
          <div className={`dashboard-stat-trend ${trend.type}`}>
            {trend.type === "up" ? "↗" : "↘"} {trend.value}%
          </div>
        )}
      </div>
    </div>
  )

  const LoadingSpinner = () => (
    <div className="dashboard-loading-container">
      <div className="dashboard-loading-spinner">
        <div className="dashboard-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    </div>
  )

  if (dashboardData.loading) {
    return <LoadingSpinner />
  }

  if (dashboardData.error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error-message">
          <h3>Error Loading Dashboard</h3>
          <p>{dashboardData.error}</p>
          <button onClick={loadDashboardData} className="dashboard-retry-btn">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, User!</h1>
        <p>Here's what's happening with your supply chain today.</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <StatCard
          title="Total Products"
          value={dashboardData.stats.totalProducts.toLocaleString()}
          icon="📦"
          color="blue"
          trend={{ type: "up", value: 12 }}
        />
        <StatCard
          title="Total Orders"
          value={dashboardData.stats.totalOrders.toLocaleString()}
          icon="🛒"
          color="green"
          trend={{ type: "up", value: 8 }}
        />
        <StatCard
          title="Total Revenue"
          value={`$${dashboardData.stats.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="purple"
          trend={{ type: "up", value: 15 }}
        />
        <StatCard
          title="Active Users"
          value={dashboardData.stats.totalUsers.toLocaleString()}
          icon="👥"
          color="orange"
          trend={{ type: "up", value: 5 }}
        />
      </div>

      {/* Alerts Section */}
      {(dashboardData.stats.lowStockProducts > 0 || dashboardData.stats.pendingOrders > 0) && (
        <div className="dashboard-alerts-section">
          <h2>Alerts & Notifications</h2>
          <div className="dashboard-alerts-grid">
            {dashboardData.stats.lowStockProducts > 0 && (
              <div className="dashboard-alert-card warning">
                <div className="dashboard-alert-icon">⚠️</div>
                <div className="dashboard-alert-content">
                  <h3>Low Stock Alert</h3>
                  <p>{dashboardData.stats.lowStockProducts} products are running low</p>
                  <button className="dashboard-alert-btn">View Details</button>
                </div>
              </div>
            )}
            {dashboardData.stats.pendingOrders > 0 && (
              <div className="dashboard-alert-card info">
                <div className="dashboard-alert-icon">📋</div>
                <div className="dashboard-alert-content">
                  <h3>Pending Orders</h3>
                  <p>{dashboardData.stats.pendingOrders} orders need attention</p>
                  <button className="dashboard-alert-btn">View Orders</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="dashboard-content-grid">
        {/* Recent Orders */}
        <div className="dashboard-content-card">
          <div className="dashboard-card-header">
            <h2>Recent Orders</h2>
            <button className="dashboard-view-all-btn">View All</button>
          </div>
          <div className="dashboard-card-content">
            {dashboardData.recentOrders.length > 0 ? (
              <div className="dashboard-orders-list">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order._id} className="dashboard-order-item">
                    <div className="dashboard-order-info">
                      <div className="dashboard-order-number">#{order.orderNumber}</div>
                      <div className="dashboard-order-customer">{order.customer.name}</div>
                    </div>
                    <div className="dashboard-order-details">
                      <div className="dashboard-order-amount">${order.totals.total.toFixed(2)}</div>
                      <div className={`dashboard-order-status ${order.status.toLowerCase()}`}>{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <p>No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="dashboard-content-card">
          <div className="dashboard-card-header">
            <h2>Low Stock Alerts</h2>
            <button className="dashboard-view-all-btn">View All</button>
          </div>
          <div className="dashboard-card-content">
            {dashboardData.lowStockAlerts.length > 0 ? (
              <div className="dashboard-stock-alerts-list">
                {dashboardData.lowStockAlerts.slice(0, 5).map((product) => (
                  <div key={product._id} className="dashboard-stock-alert-item">
                    <div className="dashboard-product-info">
                      <div className="dashboard-product-name">{product.name}</div>
                      <div className="dashboard-product-sku">SKU: {product.sku}</div>
                    </div>
                    <div className="dashboard-stock-info">
                      <div className="dashboard-current-stock">{product.stock.current}</div>
                      <div className="dashboard-stock-status low">Low Stock</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-empty-state">
                <p>All products are well stocked</p>
              </div>
            )}
          </div>
        </div>

        {/* Sales Chart */}
        <div className="dashboard-content-card dashboard-full-width">
          <div className="dashboard-card-header">
            <h2>Sales Overview</h2>
            <div className="dashboard-chart-controls">
              <button className="dashboard-chart-btn active">Monthly</button>
              <button className="dashboard-chart-btn">Weekly</button>
              <button className="dashboard-chart-btn">Daily</button>
            </div>
          </div>
          <div className="dashboard-card-content">
            <div className="dashboard-sales-chart">
              {dashboardData.salesChart.length > 0 ? (
                <div className="dashboard-chart-bars">
                  {dashboardData.salesChart.map((data, index) => (
                    <div key={index} className="dashboard-chart-bar">
                      <div
                        className="dashboard-bar"
                        style={{
                          height: `${(data.revenue / Math.max(...dashboardData.salesChart.map((d) => d.revenue))) * 100}%`,
                        }}
                      ></div>
                      <div className="dashboard-bar-label">
                        {data._id.month}/{data._id.year}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty-chart">
                  <p>No sales data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
