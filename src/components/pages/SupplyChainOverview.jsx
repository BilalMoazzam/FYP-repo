"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import SupplyChainMetrics from "../SupplyChainMetrics"
import SupplyChainNetwork from "../SupplyChainNetwork"
import ActiveShipments from "../ActiveShipments"
import "../styles/SupplyChainOverview.css"

const SupplyChainOverview = () => {
  const [metrics, setMetrics] = useState({
    deliveryRate: 0,
    fulfillmentRate: 0,
    blockchainVerification: 0,
  })

  const [networkData, setNetworkData] = useState([])
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch supply chain data
    const fetchSupplyChainData = async () => {
      try {
        // In a real app, these would be API calls
        // Simulate loading delay
        setTimeout(() => {
          // Mock metrics data
          setMetrics({
            deliveryRate: 94.2,
            fulfillmentRate: 98.5,
            blockchainVerification: 100,
          })

          // Mock network data - represents nodes in the supply chain
          setNetworkData([
            { id: 1, name: "Factory", type: "manufacturer", x: 50, y: 100, connections: [2, 3] },
            { id: 2, name: "Warehouse A", type: "warehouse", x: 200, y: 50, connections: [4] },
            { id: 3, name: "Warehouse B", type: "warehouse", x: 200, y: 150, connections: [4] },
            { id: 4, name: "Distribution", type: "distribution", x: 350, y: 100, connections: [5] },
            { id: 5, name: "Retail", type: "retail", x: 500, y: 100, connections: [] },
          ])

          // Mock shipments data
          setShipments([
            {
              id: "#45782",
              origin: "Factory",
              destination: "Retail Store",
              departureDate: "2025-04-01",
              estimatedArrival: "2025-04-05",
              status: "In Transit",
              location: "Distribution Center",
              lastUpdated: "2025-04-03 14:30",
              items: 24,
              carrier: "FastShip Logistics",
            },
            {
              id: "#45783",
              origin: "Warehouse A",
              destination: "Retail Store",
              departureDate: "2025-04-02",
              estimatedArrival: "2025-04-04",
              status: "On Time",
              location: "En Route to Destination",
              lastUpdated: "2025-04-03 16:45",
              items: 12,
              carrier: "Express Delivery",
            },
            {
              id: "#45784",
              origin: "Factory",
              destination: "Warehouse B",
              departureDate: "2025-03-30",
              estimatedArrival: "2025-04-02",
              status: "Delayed",
              location: "Customs Clearance",
              lastUpdated: "2025-04-03 09:15",
              items: 36,
              carrier: "Global Transport Inc.",
            },
          ])

          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching supply chain data:", error)
        setLoading(false)
      }
    }

    fetchSupplyChainData()
  }, [])

  return (
    <div className="supply-chain-overview">
      <Header
        title="Supply Chain Overview"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Supply Chain Overview", active: true },
        ]}
      />

      <div className="supply-chain-container">
        {loading ? (
          <div className="loading">Loading supply chain data...</div>
        ) : (
          <>
            <SupplyChainMetrics metrics={metrics} />

            <div className="section">
              <h2 className="section-title">Supply Chain Network</h2>
              <div className="section-content">
                <SupplyChainNetwork networkData={networkData} />
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">Active Shipments</h2>
              <div className="section-content">
                <ActiveShipments shipments={shipments} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SupplyChainOverview
