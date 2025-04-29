import { ArrowDown, ArrowUp, Box, Clock, DollarSign, Package, ShoppingCart, Truck, Users } from "lucide-react"

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-slate-500">Overview of your supply chain operations</p>
      </div>

      <div className="tabs">
        <div className="tabs-list">
          <button className="tab-trigger active">Overview</button>
          <button className="tab-trigger">Analytics</button>
          <button className="tab-trigger">Reports</button>
          <button className="tab-trigger">Notifications</button>
        </div>

        <div className="tab-content">
          <div className="metrics-grid">
            <MetricCard
              title="Total Orders"
              value="1,263"
              description="Last 30 days"
              icon={<ShoppingCart className="h-5 w-5" />}
              trend="up"
              trendValue="+12.5%"
            />
            <MetricCard
              title="Inventory Items"
              value="3,849"
              description="In stock"
              icon={<Box className="h-5 w-5" />}
              trend="down"
              trendValue="-2.3%"
            />
            <MetricCard
              title="Active Suppliers"
              value="124"
              description="From 12 countries"
              icon={<Truck className="h-5 w-5" />}
              trend="up"
              trendValue="+4.1%"
            />
            <MetricCard
              title="Monthly Revenue"
              value="$84,219"
              description="April 2025"
              icon={<DollarSign className="h-5 w-5" />}
              trend="up"
              trendValue="+18.2%"
            />
          </div>

          <div className="tables-grid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Recent Orders</h3>
                <p className="card-description">Last 5 orders placed in the system</p>
              </div>
              <div className="card-content">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-medium">#ORD-7928</td>
                      <td>Acme Corp</td>
                      <td>
                        <span className="status status-shipped">Shipped</span>
                      </td>
                      <td>$2,385.00</td>
                    </tr>
                    <tr>
                      <td className="font-medium">#ORD-7927</td>
                      <td>TechGrow Inc</td>
                      <td>
                        <span className="status status-processing">Processing</span>
                      </td>
                      <td>$4,829.00</td>
                    </tr>
                    <tr>
                      <td className="font-medium">#ORD-7926</td>
                      <td>Urban Designs</td>
                      <td>
                        <span className="status status-pending">Pending</span>
                      </td>
                      <td>$1,249.00</td>
                    </tr>
                    <tr>
                      <td className="font-medium">#ORD-7925</td>
                      <td>Global Shipping</td>
                      <td>
                        <span className="status status-shipped">Shipped</span>
                      </td>
                      <td>$3,712.00</td>
                    </tr>
                    <tr>
                      <td className="font-medium">#ORD-7924</td>
                      <td>Fresh Foods Ltd</td>
                      <td>
                        <span className="status status-cancelled">Cancelled</span>
                      </td>
                      <td>$892.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Inventory Alerts</h3>
                <p className="card-description">Products requiring attention</p>
              </div>
              <div className="card-content">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Status</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-medium">Microchips R7240</td>
                      <td>
                        <span className="status status-low">Low Stock</span>
                      </td>
                      <td>12 units</td>
                      <td className="action-link">Reorder</td>
                    </tr>
                    <tr>
                      <td className="font-medium">LED Displays 27"</td>
                      <td>
                        <span className="status status-medium">Medium Stock</span>
                      </td>
                      <td>47 units</td>
                      <td className="action-link">View</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Power Supplies 650W</td>
                      <td>
                        <span className="status status-in-stock">In Stock</span>
                      </td>
                      <td>128 units</td>
                      <td className="action-link">View</td>
                    </tr>
                    <tr>
                      <td className="font-medium">USB-C Connectors</td>
                      <td>
                        <span className="status status-low">Low Stock</span>
                      </td>
                      <td>18 units</td>
                      <td className="action-link">Reorder</td>
                    </tr>
                    <tr>
                      <td className="font-medium">Cooling Fans 120mm</td>
                      <td>
                        <span className="status status-medium">Medium Stock</span>
                      </td>
                      <td>56 units</td>
                      <td className="action-link">View</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="widgets-grid">
            <div className="card">
              <div className="card-header-small">
                <h3 className="card-title-small">Recent Activities</h3>
                <Clock className="icon-small" />
              </div>
              <div className="card-content">
                <div className="activities-list">
                  <ActivityItem
                    title="New order received"
                    description="Order #ORD-7928 from Acme Corp"
                    timestamp="10 minutes ago"
                  />
                  <ActivityItem
                    title="Shipment delivered"
                    description="Order #ORD-7895 to Quantum Industries"
                    timestamp="2 hours ago"
                  />
                  <ActivityItem
                    title="Inventory updated"
                    description="42 new items added to warehouse B"
                    timestamp="5 hours ago"
                  />
                  <ActivityItem
                    title="Price adjustment"
                    description="Updated pricing for 16 products"
                    timestamp="Yesterday"
                  />
                  <ActivityItem
                    title="New supplier added"
                    description="Microtech Components Inc. added to suppliers"
                    timestamp="Yesterday"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header-small">
                <h3 className="card-title-small">Top Suppliers</h3>
                <Users className="icon-small" />
              </div>
              <div className="card-content">
                <div className="suppliers-list">
                  <div className="supplier-item">
                    <div className="supplier-name">Tech Components Ltd</div>
                    <div className="supplier-value">$1.2M</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "85%" }}></div>
                  </div>

                  <div className="supplier-item">
                    <div className="supplier-name">Global Manufacturing Inc</div>
                    <div className="supplier-value">$892K</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "73%" }}></div>
                  </div>

                  <div className="supplier-item">
                    <div className="supplier-name">Eastern Electronics</div>
                    <div className="supplier-value">$645K</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "58%" }}></div>
                  </div>

                  <div className="supplier-item">
                    <div className="supplier-name">Advanced Circuits</div>
                    <div className="supplier-value">$512K</div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "42%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header-small">
                <h3 className="card-title-small">Delivery Performance</h3>
                <Package className="icon-small" />
              </div>
              <div className="card-content">
                <div className="performance-value">94.2%</div>
                <p className="performance-label">On-time delivery rate</p>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: "94.2%" }}></div>
                </div>

                <div className="performance-stats">
                  <div className="stat-item">
                    <div className="stat-indicator stat-on-time"></div>
                    <span className="stat-label">On Time</span>
                    <div className="stat-value">94.2%</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-indicator stat-delayed"></div>
                    <span className="stat-label">Delayed</span>
                    <div className="stat-value">4.8%</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-indicator stat-failed"></div>
                    <span className="stat-label">Failed</span>
                    <div className="stat-value">1.0%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value, description, icon, trend, trendValue }) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <div className="metric-trend">
          {trend === "up" ? (
            <ArrowUp className="trend-icon trend-up" />
          ) : trend === "down" ? (
            <ArrowDown className="trend-icon trend-down" />
          ) : null}
          <span className={`trend-value ${trend === "up" ? "trend-up" : trend === "down" ? "trend-down" : ""}`}>
            {trendValue}
          </span>
        </div>
      </div>
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        <p className="metric-title">{title}</p>
        <p className="metric-description">{description}</p>
      </div>
    </div>
  )
}

const ActivityItem = ({ title, description, timestamp }) => {
  return (
    <div className="activity-item">
      <div className="activity-indicator"></div>
      <div className="activity-content">
        <p className="activity-title">{title}</p>
        <p className="activity-description">{description}</p>
        <p className="activity-timestamp">{timestamp}</p>
      </div>
    </div>
  )
}

export default DashboardContent

