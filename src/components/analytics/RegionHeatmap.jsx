"use client"

import { useEffect, useRef } from "react"

const RegionHeatmap = ({ data }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data || !data.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Get unique regions and products
    const regions = [...new Set(data.map((item) => item.region))]
    const products = [...new Set(data.map((item) => item.product))]

    // Set canvas dimensions
    const cellWidth = 80
    const cellHeight = 50
    const marginLeft = 100
    const marginTop = 50
    const marginRight = 50
    const marginBottom = 50

    canvas.width = marginLeft + cellWidth * products.length + marginRight
    canvas.height = marginTop + cellHeight * regions.length + marginBottom

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Find min and max sales for color scaling
    const salesValues = data.map((item) => item.sales)
    const minSales = Math.min(...salesValues)
    const maxSales = Math.max(...salesValues)

    // Draw heatmap cells
    data.forEach((item) => {
      const regionIndex = regions.indexOf(item.region)
      const productIndex = products.indexOf(item.product)

      const x = marginLeft + productIndex * cellWidth
      const y = marginTop + regionIndex * cellHeight

      // Calculate color based on sales value (blue gradient)
      const normalizedValue = (item.sales - minSales) / (maxSales - minSales)
      const blue = Math.floor(255 * normalizedValue)
      const green = Math.floor(200 * normalizedValue)

      ctx.fillStyle = `rgb(0, ${green}, ${blue})`
      ctx.fillRect(x, y, cellWidth, cellHeight)

      // Draw sales value text
      ctx.fillStyle = normalizedValue > 0.5 ? "#ffffff" : "#333333"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(item.sales, x + cellWidth / 2, y + cellHeight / 2)
    })

    // Draw region labels (y-axis)
    ctx.fillStyle = "#333333"
    ctx.font = "12px Arial"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    regions.forEach((region, index) => {
      const y = marginTop + index * cellHeight + cellHeight / 2
      ctx.fillText(region, marginLeft - 10, y)
    })

    // Draw product labels (x-axis)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    products.forEach((product, index) => {
      const x = marginLeft + index * cellWidth + cellWidth / 2
      ctx.fillText(product, x, marginTop + regions.length * cellHeight + 10)
    })

    // Draw title
    ctx.fillStyle = "#333333"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText("Sales by Region (Heatmap)", canvas.width / 2, 15)

    // Draw color scale
    const scaleWidth = 200
    const scaleHeight = 20
    const scaleX = canvas.width - scaleWidth - 20
    const scaleY = 15

    const gradient = ctx.createLinearGradient(scaleX, scaleY, scaleX + scaleWidth, scaleY)
    gradient.addColorStop(0, "rgb(0, 0, 0)")
    gradient.addColorStop(0.5, "rgb(0, 100, 128)")
    gradient.addColorStop(1, "rgb(0, 200, 255)")

    ctx.fillStyle = gradient
    ctx.fillRect(scaleX, scaleY, scaleWidth, scaleHeight)

    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 1
    ctx.strokeRect(scaleX, scaleY, scaleWidth, scaleHeight)

    // Draw scale labels
    ctx.fillStyle = "#333333"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"

    ctx.fillText(minSales, scaleX, scaleY + scaleHeight + 5)
    ctx.fillText(maxSales, scaleX + scaleWidth, scaleY + scaleHeight + 5)
    ctx.fillText("Sales Volume", scaleX + scaleWidth / 2, scaleY + scaleHeight + 5)
  }, [data])

  return (
    <div className="heatmap-wrapper">
      <canvas ref={canvasRef} className="heatmap-canvas"></canvas>
    </div>
  )
}

export default RegionHeatmap

