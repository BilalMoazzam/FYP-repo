"use client"

import { useState } from "react"
import { Truck, ChevronDown, ChevronUp, MapPin, Calendar, Package, User } from "lucide-react"

const ActiveShipments = ({ shipments }) => {
  const [expandedShipment, setExpandedShipment] = useState(null)

  const toggleShipmentDetails = (shipmentId) => {
    if (expandedShipment === shipmentId) {
      setExpandedShipment(null)
    } else {
      setExpandedShipment(shipmentId)
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "In Transit":
        return "status-in-transit"
      case "On Time":
        return "status-on-time"
      case "Delayed":
        return "status-delayed"
      default:
        return ""
    }
  }

  return (
    <div className="active-shipments">
      {shipments.length === 0 ? (
        <div className="no-shipments">No active shipments found</div>
      ) : (
        <div className="shipments-list">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="shipment-card">
              <div className="shipment-header" onClick={() => toggleShipmentDetails(shipment.id)}>
                <div className="shipment-icon">
                  <Truck size={18} />
                </div>
                <div className="shipment-id">Shipment {shipment.id}</div>
                <div className={`shipment-status ${getStatusClass(shipment.status)}`}>{shipment.status}</div>
                <div className="shipment-toggle">
                  {expandedShipment === shipment.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {expandedShipment === shipment.id && (
                <div className="shipment-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-label">
                        <MapPin size={14} />
                        <span>Origin</span>
                      </div>
                      <div className="detail-value">{shipment.origin}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">
                        <MapPin size={14} />
                        <span>Destination</span>
                      </div>
                      <div className="detail-value">{shipment.destination}</div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-label">
                        <Calendar size={14} />
                        <span>Departure Date</span>
                      </div>
                      <div className="detail-value">{shipment.departureDate}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">
                        <Calendar size={14} />
                        <span>Estimated Arrival</span>
                      </div>
                      <div className="detail-value">{shipment.estimatedArrival}</div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-label">
                        <MapPin size={14} />
                        <span>Current Location</span>
                      </div>
                      <div className="detail-value">{shipment.location}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">
                        <Calendar size={14} />
                        <span>Last Updated</span>
                      </div>
                      <div className="detail-value">{shipment.lastUpdated}</div>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <div className="detail-label">
                        <Package size={14} />
                        <span>Items</span>
                      </div>
                      <div className="detail-value">{shipment.items} units</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">
                        <User size={14} />
                        <span>Carrier</span>
                      </div>
                      <div className="detail-value">{shipment.carrier}</div>
                    </div>
                  </div>

                  <div className="shipment-actions">
                    <button className="btn btn-track">Track Shipment</button>
                    <button className="btn btn-details">View Full Details</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActiveShipments