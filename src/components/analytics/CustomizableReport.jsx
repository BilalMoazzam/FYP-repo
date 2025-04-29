"use client"

import { useState, useEffect } from "react"

const CustomizableReport = () => {
  const [reportType, setReportType] = useState("inventory")
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateReport(reportType)
  }, [reportType])

  const generateReport = (type) => {
    setLoading(true)

    // Simulate API call to generate report
    setTimeout(() => {
      let data = []

      switch (type) {
        case "inventory":
          data = [
            { id: 1, item: "Shirts", location: "Warehouse A", quantity: 250, value: "$5000" },
            { id: 2, item: "Pants", location: "Warehouse A", quantity: 150, value: "$4500" },
            { id: 3, item: "Shoes", location: "Warehouse B", quantity: 100, value: "$6000" },
            { id: 4, item: "Hats", location: "Warehouse C", quantity: 75, value: "$1500" },
            { id: 5, item: "Jackets", location: "Warehouse A", quantity: 50, value: "$3000" },
          ]
          break
        case "sales":
          data = [
            { id: 1, product: "Shirts", quantity: 120, revenue: "$2400", profit: "$960" },
            { id: 2, product: "Pants", quantity: 85, revenue: "$2550", profit: "$1020" },
            { id: 3, product: "Shoes", quantity: 65, revenue: "$3900", profit: "$1560" },
            { id: 4, product: "Hats", quantity: 45, revenue: "$900", profit: "$360" },
            { id: 5, product: "Jackets", quantity: 30, revenue: "$1800", profit: "$720" },
          ]
          break
        case "performance":
          data = [
            { id: 1, metric: "Order Fulfillment Rate", value: "98.5%", target: "99%", status: "On Track" },
            { id: 2, metric: "Average Order Value", value: "$85", target: "$80", status: "Exceeding" },
            { id: 3, metric: "Return Rate", value: "3.2%", target: "3%", status: "On Track" },
            { id: 4, metric: "Inventory Turnover", value: "5.8", target: "6", status: "Below Target" },
            { id: 5, metric: "Customer Satisfaction", value: "4.7/5", target: "4.5/5", status: "Exceeding" },
          ]
          break
        default:
          data = []
      }

      setReportData(data)
      setLoading(false)
    }, 500)
  }

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value)
  }

  const renderReportTable = () => {
    if (loading) {
      return <div className="report-loading">Generating report...</div>
    }

    if (reportData.length === 0) {
      return <div className="no-data">No data available</div>
    }

    // Get column headers based on the first item in the data
    const columns = Object.keys(reportData[0]).filter((key) => key !== "id")

    return (
      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportData.map((row) => (
              <tr key={row.id}>
                {columns.map((column, index) => (
                  <td key={index}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="customizable-report">
      <div className="report-controls">
        <div className="report-type-selector">
          <label>Select Report Type:</label>
          <select value={reportType} onChange={handleReportTypeChange}>
            <option value="inventory">Inventory Report</option>
            <option value="sales">Sales Report</option>
            <option value="performance">Performance Metrics</option>
          </select>
        </div>
        <button className="btn btn-generate">Generate Report</button>
      </div>

      {renderReportTable()}
    </div>
  )
}

export default CustomizableReport

