import { Truck, ShoppingBag, Shield } from "lucide-react"

const SupplyChainMetrics = ({ metrics }) => {
  const { deliveryRate, fulfillmentRate, blockchainVerification } = metrics

  return (
    <div className="metrics-container">
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon">
            <Truck size={20} />
          </div>
          <div className="metric-title">On-time Delivery rate</div>
        </div>
        <div className="metric-value">{deliveryRate}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${deliveryRate}%` }}></div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon">
            <ShoppingBag size={20} />
          </div>
          <div className="metric-title">Order Fulfillment</div>
        </div>
        <div className="metric-value">{fulfillmentRate}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${fulfillmentRate}%` }}></div>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon">
            <Shield size={20} />
          </div>
          <div className="metric-title">Blockchain verification</div>
        </div>
        <div className="metric-value">{blockchainVerification}%</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${blockchainVerification}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default SupplyChainMetrics