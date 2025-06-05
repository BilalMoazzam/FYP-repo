"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import MetricsCards from "../analytics/MetricsCards"
import SalesChart from "../analytics/SalesChart"
import InventoryChart from "../analytics/InventoryChart"
import RegionHeatmap from "../analytics/RegionHeatmap"
import CustomizableReport from "../analytics/CustomizableReport"
import ExportReports from "../analytics/ExportReports"
import { RefreshCw } from "lucide-react"
import "../styles/AnalyticsReport.css"

const AnalyticsReport = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    bestSellingProduct: "",
    inventoryHealth: 0,
  })

  const [salesData, setSalesData] = useState([])
  const [inventoryData, setInventoryData] = useState([])
  const [regionData, setRegionData] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("month")
  const [lastUpdated, setLastUpdated] = useState("")

  useEffect(() => {
    // Simulate API call to fetch analytics data
    fetchAnalyticsData()
  }, [dateRange])

  const fetchAnalyticsData = () => {
    setLoading(true)

    // In a real app, this would be an API call with the dateRange parameter
    setTimeout(() => {
      // Mock data for metrics
      setMetrics({
        totalSales: 234600,
        bestSellingProduct: "Shirts",
        inventoryHealth: 85,
      })

      // Mock data for sales chart
      const mockSalesData = generateSalesData(dateRange)
      setSalesData(mockSalesData)

      // Mock data for inventory chart
      const mockInventoryData = generateInventoryData(dateRange)
      setInventoryData(mockInventoryData)

      // Mock data for region heatmap
      const mockRegionData = generateRegionData()
      setRegionData(mockRegionData)

      // Set last updated timestamp
      const now = new Date()
      setLastUpdated(now.toLocaleString())

      setLoading(false)
    }, 1000)
  }

  const generateSalesData = (range) => {
    const data = []
    let days = 30

    if (range === "week") {
      days = 7
    } else if (range === "year") {
      days = 12 // Months in a year
    }

    for (let i = 0; i < days; i++) {
      const value = Math.floor(Math.random() * 10000) + 5000

      if (range === "year") {
        // For yearly data, use month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        data.push({
          name: monthNames[i],
          value: value,
        })
      } else {
        // For weekly or monthly data, use day numbers
        data.push({
          name: `Day ${i + 1}`,
          value: value,
        })
      }
    }

    return data
  }

  const generateInventoryData = (range) => {
    const data = []
    let days = 30

    if (range === "week") {
      days = 7
    } else if (range === "year") {
      days = 12 // Months in a year
    }

    for (let i = 0; i < days; i++) {
      const value = Math.floor(Math.random() * 500) + 300

      if (range === "year") {
        // For yearly data, use month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        data.push({
          name: monthNames[i],
          value: value,
        })
      } else {
        // For weekly or monthly data, use day numbers
        data.push({
          name: `Day ${i + 1}`,
          value: value,
        })
      }
    }

    return data
  }

  const generateRegionData = () => {
    const regions = ["North", "South", "East", "West", "Central"]
    const products = ["Shirts", "Pants", "Shoes", "Accessories", "Jackets", "Hats"]

    const data = []

    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < products.length; j++) {
        data.push({
          region: regions[i],
          product: products[j],
          sales: Math.floor(Math.random() * 1000) + 100,
        })
      }
    }

    return data
  }

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value)
  }

  const handleRefresh = () => {
    fetchAnalyticsData()
  }

  return (
    <div className="analytics-report">
      <Header
        title="Analytics and Reports"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Analytics and Reports", active: true },
        ]}
      />

      <div className="analytics-container">
        <div className="analytics-header">
          <div className="header-left">
            <h2>Analytics and Reports</h2>
            <p className="last-updated">
              Last updated: {lastUpdated}
              <button className="btn-refresh" onClick={handleRefresh}>
                <RefreshCw size={14} />
              </button>
            </p>
          </div>
          <div className="header-right">
            <div className="date-range-selector">
              <label>Date Range:</label>
              <select value={dateRange} onChange={handleDateRangeChange}>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading analytics data...</div>
        ) : (
          <>
            <MetricsCards metrics={metrics} />

            <div className="section">
              <div className="section-header">
                <h3>Analytics & Graphs</h3>
              </div>
              <div className="charts-grid">
                <div className="chart-container">
                  <SalesChart data={salesData} dateRange={dateRange} />
                </div>
                <div className="chart-container">
                  <InventoryChart data={inventoryData} dateRange={dateRange} />
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <h3>Sales by Region (Heatmap)</h3>
              </div>
              <div className="heatmap-container">
                <RegionHeatmap data={regionData} />
              </div>
            </div>

            <div className="section">
              <div className="section-header">
                <h3>Customizable Report</h3>
              </div>
              <CustomizableReport />
            </div>

            <div className="section">
              <div className="section-header">
                <h3>Export Reports</h3>
              </div>
              <ExportReports />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AnalyticsReport
