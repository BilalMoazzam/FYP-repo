import { DollarSign, ShoppingBag, Activity } from "lucide-react"

const MetricsCards = ({ metrics }) => {
  const { totalSales, bestSellingProduct, inventoryHealth } = metrics

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="metrics-cards">
      <div className="metric-card sales">
        <div className="metric-icon">
          <DollarSign size={24} />
        </div>
        <div className="metric-content">
          <h4>Total Sales</h4>
          <div className="metric-value">{formatCurrency(totalSales)}</div>
        </div>
      </div>

      <div className="metric-card product">
        <div className="metric-icon">
          <ShoppingBag size={24} />
        </div>
        <div className="metric-content">
          <h4>Best-Selling Product</h4>
          <div className="metric-value">{bestSellingProduct}</div>
        </div>
      </div>

      <div className="metric-card inventory">
        <div className="metric-icon">
          <Activity size={24} />
        </div>
        <div className="metric-content">
          <h4>Inventory Health</h4>
          <div className="metric-value">{inventoryHealth}% Healthy</div>
        </div>
      </div>
    </div>
  )
}

export default MetricsCards

