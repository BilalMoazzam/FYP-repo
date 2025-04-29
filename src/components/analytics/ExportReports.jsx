"use client"

import { useState } from "react"
import { Download } from "lucide-react"

const ExportReports = () => {
  const [exportFormat, setExportFormat] = useState("pdf")
  const [exportType, setExportType] = useState("inventory")
  const [exporting, setExporting] = useState(false)

  const handleExportFormatChange = (e) => {
    setExportFormat(e.target.value)
  }

  const handleExportTypeChange = (e) => {
    setExportType(e.target.value)
  }

  const handleExport = () => {
    setExporting(true)

    // Simulate export process
    setTimeout(() => {
      // In a real app, this would trigger a download
      console.log(`Exporting ${exportType} report as ${exportFormat}`)

      // Create a mock download
      const element = document.createElement("a")
      element.setAttribute("href", "data:text/plain;charset=utf-8,")
      element.setAttribute("download", `${exportType}_report.${exportFormat}`)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      setExporting(false)

      // Show success message (in a real app, you'd use a toast notification)
      alert(
        `${exportType.charAt(0).toUpperCase() + exportType.slice(1)} report has been exported as ${exportFormat.toUpperCase()}`,
      )
    }, 1500)
  }

  return (
    <div className="export-reports">
      <div className="export-options">
        <div className="export-option">
          <label>Report Type:</label>
          <select value={exportType} onChange={handleExportTypeChange}>
            <option value="inventory">Inventory Report</option>
            <option value="sales">Sales Report</option>
            <option value="performance">Performance Report</option>
            <option value="financial">Financial Report</option>
          </select>
        </div>

        <div className="export-option">
          <label>Format:</label>
          <select value={exportFormat} onChange={handleExportFormatChange}>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="xlsx">Excel</option>
          </select>
        </div>
      </div>

      <div className="export-actions">
        <button className="btn btn-export" onClick={handleExport} disabled={exporting}>
          {exporting ? (
            <>
              <div className="spinner"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Export Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ExportReports

