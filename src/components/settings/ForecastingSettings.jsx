"use client"

import { useState, useEffect, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const ForecastingSettings = ({ onSettingsChange }) => {
  const [threshold, setThreshold] = useState(50)
  const [forecastData, setForecastData] = useState([])
  const [heatmapData, setHeatmapData] = useState([])
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Generate mock data for forecasting
    generateMockData()
  }, [])

  useEffect(() => {
    // Redraw heatmap when data changes
    if (canvasRef.current && heatmapData.length > 0) {
      drawHeatmap()
    }
  }, [heatmapData])

  const generateMockData = () => {
    // Generate line chart data
    const lineData = []
    for (let i = 0; i < 12; i++) {
      const value = Math.floor(Math.random() * 50) + 30
      lineData.push({
        name: `Month ${i + 1}`,
        value: value,
        forecast: value + (Math.random() * 20 - 10),
      })
    }
    setForecastData(lineData)

    // Generate heatmap data
    const heatData = []
    const categories = ["Category A", "Category B", "Category C", "Category D", "Category E"]
    const regions = ["Region 1", "Region 2", "Region 3", "Region 4", "Region 5"]

    categories.forEach((cat, i) => {
      regions.forEach((reg, j) => {
        heatData.push({
          category: cat,
          region: reg,
          value: Math.floor(Math.random() * 100),
        })
      })
    })
    setHeatmapData(heatData)
    setLoading(false)
  }

  const drawHeatmap = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Get unique categories and regions
    const categories = [...new Set(heatmapData.map((item) => item.category))]
    const regions = [...new Set(heatmapData.map((item) => item.region))]

    // Calculate cell dimensions
    const cellWidth = width / regions.length
    const cellHeight = height / categories.length

    // Find min and max values for color scaling
    const values = heatmapData.map((item) => item.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    // Draw heatmap cells
    heatmapData.forEach((item) => {
      const catIndex = categories.indexOf(item.category)
      const regIndex = regions.indexOf(item.region)

      // Calculate position
      const x = regIndex * cellWidth
      const y = catIndex * cellHeight

      // Calculate color based on value (blue gradient)
      const normalizedValue = (item.value - minValue) / (maxValue - minValue)
      const blue = Math.floor(255 * normalizedValue)
      const green = Math.floor(150 * normalizedValue)

      ctx.fillStyle = `rgb(0, ${green}, ${blue})`
      ctx.fillRect(x, y, cellWidth, cellHeight)

      // Add text
      ctx.fillStyle = normalizedValue > 0.5 ? "white" : "black"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(item.value, x + cellWidth / 2, y + cellHeight / 2)
    })

    // Draw category labels (y-axis)
    ctx.fillStyle = "black"
    ctx.font = "10px Arial"
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"

    categories.forEach((cat, index) => {
      const y = index * cellHeight + cellHeight / 2
      ctx.fillText(cat, width + 5, y)
    })

    // Draw region labels (x-axis)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    regions.forEach((reg, index) => {
      const x = index * cellWidth + cellWidth / 2
      ctx.fillText(reg, x, height + 5)
    })
  }

  const handleThresholdChange = (e) => {
    const newThreshold = Number.parseInt(e.target.value)
    setThreshold(newThreshold)
    onSettingsChange()
  }

  const handleSave = () => {
    // In a real app, this would save the settings to the backend
    console.log("Saving forecasting settings with threshold:", threshold)
    alert("Forecasting settings saved!")
  }

  return (
    <div className="settings-section forecasting-settings">
      <div className="section-header">
        <h2>Forecasting Settings</h2>
      </div>

      <div className="threshold-control">
        <label>Normal Threshold</label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={threshold}
            onChange={handleThresholdChange}
            className="threshold-slider"
          />
          <span className="threshold-value">{threshold}%</span>
        </div>
      </div>

      <div className="forecasting-charts">
        <div className="chart-container">
          {loading ? (
            <div className="chart-loading">Loading chart...</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#FFC107" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Forecast"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-container">
          {loading ? (
            <div className="chart-loading">Loading chart...</div>
          ) : (
            <div className="heatmap-container">
              <canvas ref={canvasRef} width={250} height={150} className="heatmap-canvas" />
            </div>
          )}
        </div>
      </div>

      <div className="section-footer">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default ForecastingSettings
