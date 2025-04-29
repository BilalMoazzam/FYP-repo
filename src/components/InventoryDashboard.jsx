"use client"

import { useState, useEffect } from "react"
import InventoryStats from "./InventoryStats"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import "../styles/InventoryDashboard.css"

const InventoryDashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalItemsChange: 0,
    lowStockItems: 0,
    lowStockItemsChange: 0,
    outOfStockItems: 0,
    outOfStockItemsChange: 0,
    inventoryValue: 0,
    inventoryValueChange: 0,
  })

  const [categoryData, setCategoryData] = useState([])
  const [stockStatusData, setStockStatusData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock stats data
      setStats({
        totalItems: 485,
        totalItemsChange: 12,
        lowStockItems: 28,
        lowStockItemsChange: 5,
        outOfStockItems: 15,
        outOfStockItemsChange: 3,
        inventoryValue: 24750,
        inventoryValueChange: 8,
      })

      // Mock category data
      setCategoryData([
        { name: "Clothing", value: 250 },
        { name: "Footwear", value: 120 },
        { name: "Accessories", value: 115 },
      ])

      // Mock stock status data
      setStockStatusData([
        { name: "In Stock", value: 442 },
        { name: "Low Stock", value: 28 },
        { name: "Out of Stock", value: 15 },
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="inventory-dashboard">
      {loading ? (
        <div className="loading">Loading dashboard data...</div>
      ) : (
        <>
          <InventoryStats stats={stats} />

          <div className="dashboard-charts">
            <div className="chart-card">
              <h3>Inventory by Category</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <h3>Stock Status</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon add">+</div>
                <div className="activity-details">
                  <p className="activity-text">Added 50 units of T-Shirts to inventory</p>
                  <p className="activity-time">Today, 10:30 AM</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon remove">-</div>
                <div className="activity-details">
                  <p className="activity-text">Removed 15 units of Sneakers from inventory</p>
                  <p className="activity-time">Yesterday, 3:45 PM</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon update">↻</div>
                <div className="activity-details">
                  <p className="activity-text">Updated price of Jeans from $35.99 to $39.99</p>
                  <p className="activity-time">Yesterday, 11:20 AM</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon add">+</div>
                <div className="activity-details">
                  <p className="activity-text">Added new product: Winter Jackets (25 units)</p>
                  <p className="activity-time">Oct 15, 2:15 PM</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon alert">!</div>
                <div className="activity-details">
                  <p className="activity-text">Low stock alert: Hats (5 units remaining)</p>
                  <p className="activity-time">Oct 14, 9:30 AM</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default InventoryDashboard

