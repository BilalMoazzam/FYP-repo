import { Package, AlertTriangle, XCircle, TrendingUp } from "lucide-react"
import "../styles/InventoryStats.css"

const InventoryStats = ({ stats }) => {
  return (
    <div className="inventory-stats">
      <div className="stat-card">
        <div className="stat-icon total">
          <Package size={24} />
        </div>
        <div className="stat-info">
          <h3>Total Items</h3>
          <p className="stat-value">{stats.totalItems}</p>
          <p className="stat-change positive">+{stats.totalItemsChange}% from last month</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon low">
          <AlertTriangle size={24} />
        </div>
        <div className="stat-info">
          <h3>Low Stock Items</h3>
          <p className="stat-value">{stats.lowStockItems}</p>
          <p className="stat-change negative">+{stats.lowStockItemsChange}% from last month</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon out">
          <XCircle size={24} />
        </div>
        <div className="stat-info">
          <h3>Out of Stock</h3>
          <p className="stat-value">{stats.outOfStockItems}</p>
          <p className="stat-change negative">+{stats.outOfStockItemsChange}% from last month</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon value">
          <TrendingUp size={24} />
        </div>
        <div className="stat-info">
          <h3>Inventory Value</h3>
          <p className="stat-value">${stats.inventoryValue.toLocaleString()}</p>
          <p className="stat-change positive">+{stats.inventoryValueChange}% from last month</p>
        </div>
      </div>
    </div>
  )
}

export default InventoryStats

