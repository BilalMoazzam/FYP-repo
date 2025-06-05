import "../styles/OrderManagement.css"

const OrderManagement = () => {
  return (
    <div className="order-management">
      <div className="page-header">
        <h1>Order Management</h1>
        <p>Track and manage customer orders and shipments</p>
      </div>

      <div className="order-content">
        <div className="order-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <div className="stat-value">89</div>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-card">
            <h3>Shipped Orders</h3>
            <div className="stat-value">65</div>
          </div>
          <div className="stat-card">
            <h3>Delivered Orders</h3>
            <div className="stat-value">12</div>
          </div>
        </div>

        <div className="order-table-section">
          <div className="table-header">
            <h2>Recent Orders</h2>
            <button className="create-order-btn">Create New Order</button>
          </div>

          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-001</td>
                  <td>John Doe</td>
                  <td>2024-01-15</td>
                  <td>$299.99</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-002</td>
                  <td>Jane Smith</td>
                  <td>2024-01-14</td>
                  <td>$149.50</td>
                  <td>
                    <span className="status shipped">Shipped</span>
                  </td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td>#ORD-003</td>
                  <td>Bob Johnson</td>
                  <td>2024-01-13</td>
                  <td>$89.99</td>
                  <td>
                    <span className="status delivered">Delivered</span>
                  </td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderManagement
