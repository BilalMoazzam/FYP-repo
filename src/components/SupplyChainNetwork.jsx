"use client"

import { useEffect, useRef } from "react"

const SupplyChainNetwork = ({ networkData }) => {
  const canvasRef = useRef(null)

  // Node type colors
  const nodeColors = {
    manufacturer: "#4CAF50", // Green
    warehouse: "#2196F3", // Blue
    distribution: "#FF9800", // Orange
    retail: "#9C27B0", // Purple
  }

  useEffect(() => {
    if (!networkData.length) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections first (so they appear behind nodes)
    ctx.strokeStyle = "#ccc"
    ctx.lineWidth = 2

    networkData.forEach((node) => {
      if (node.connections && node.connections.length) {
        node.connections.forEach((targetId) => {
          const targetNode = networkData.find((n) => n.id === targetId)
          if (targetNode) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(targetNode.x, targetNode.y)
            ctx.stroke()
          }
        })
      }
    })

    // Draw nodes
    networkData.forEach((node) => {
      // Draw node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, 15, 0, 2 * Math.PI)
      ctx.fillStyle = nodeColors[node.type] || "#999"
      ctx.fill()

      // Draw node label
      ctx.font = "12px Arial"
      ctx.fillStyle = "#333"
      ctx.textAlign = "center"
      ctx.fillText(node.name, node.x, node.y + 30)
    })

    // Add legend
    const legendX = 20
    let legendY = canvas.height - 100

    Object.entries(nodeColors).forEach(([type, color]) => {
      // Draw legend circle
      ctx.beginPath()
      ctx.arc(legendX, legendY, 8, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()

      // Draw legend text
      ctx.font = "12px Arial"
      ctx.fillStyle = "#333"
      ctx.textAlign = "left"
      ctx.fillText(type.charAt(0).toUpperCase() + type.slice(1), legendX + 15, legendY + 4)

      legendY += 20
    })
  }, [networkData])

  return (
    <div className="network-container">
      <canvas ref={canvasRef} className="network-canvas"></canvas>
    </div>
  )
}

export default SupplyChainNetwork