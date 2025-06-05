"use client"

import { useState, useEffect } from "react"
import { X, BarChart3, Package, ShoppingCart, Users, Bell } from "lucide-react"
import "./styles/DemoModal.css"

const DemoModal = ({ isOpen, onClose, demoType }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open")
      setCurrentSlide(0)
    } else {
      document.body.classList.remove("modal-open")
    }

    return () => {
      document.body.classList.remove("modal-open")
    }
  }, [isOpen])

  const demoData = {
    dashboard: {
      title: "Dashboard Overview",
      slides: [
        {
          title: "Real-time Analytics",
          content: (
            <div className="demo-dashboard">
              <div className="stats-grid">
                <div className="stat-card">
                  <BarChart3 className="stat-icon" />
                  <div className="stat-info">
                    <h3>$125,430</h3>
                    <p>Total Revenue</p>
                    <span className="trend positive">+12.5%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <Package className="stat-icon" />
                  <div className="stat-info">
                    <h3>1,247</h3>
                    <p>Total Products</p>
                    <span className="trend positive">+8.2%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <ShoppingCart className="stat-icon" />
                  <div className="stat-info">
                    <h3>342</h3>
                    <p>Active Orders</p>
                    <span className="trend negative">-3.1%</span>
                  </div>
                </div>
                <div className="stat-card">
                  <Users className="stat-icon" />
                  <div className="stat-info">
                    <h3>89</h3>
                    <p>Active Users</p>
                    <span className="trend positive">+15.7%</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Sales Performance Chart",
          content: (
            <div className="demo-chart">
              <div className="chart-header">
                <h3>Monthly Sales Trend</h3>
                <select className="chart-filter">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="chart-placeholder">
                <div className="chart-bars">
                  <div className="bar" style={{ height: "60%" }}>
                    <span>Jan</span>
                  </div>
                  <div className="bar" style={{ height: "75%" }}>
                    <span>Feb</span>
                  </div>
                  <div className="bar" style={{ height: "45%" }}>
                    <span>Mar</span>
                  </div>
                  <div className="bar" style={{ height: "90%" }}>
                    <span>Apr</span>
                  </div>
                  <div className="bar" style={{ height: "65%" }}>
                    <span>May</span>
                  </div>
                  <div className="bar" style={{ height: "80%" }}>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    inventory: {
      title: "Inventory Management",
      slides: [
        {
          title: "Product Inventory",
          content: (
            <div className="demo-inventory">
              <div className="inventory-header">
                <h3>Current Stock Levels</h3>
                <button className="add-product-btn">+ Add Product</button>
              </div>
              <div className="inventory-table">
                <div className="table-header">
                  <span>Product</span>
                  <span>SKU</span>
                  <span>Stock</span>
                  <span>Status</span>
                </div>
                <div className="table-row">
                  <span>Wireless Headphones</span>
                  <span>WH-001</span>
                  <span>245</span>
                  <span className="status in-stock">In Stock</span>
                </div>
                <div className="table-row">
                  <span>Bluetooth Speaker</span>
                  <span>BS-002</span>
                  <span>12</span>
                  <span className="status low-stock">Low Stock</span>
                </div>
                <div className="table-row">
                  <span>Smart Watch</span>
                  <span>SW-003</span>
                  <span>0</span>
                  <span className="status out-of-stock">Out of Stock</span>
                </div>
                <div className="table-row">
                  <span>Laptop Stand</span>
                  <span>LS-004</span>
                  <span>89</span>
                  <span className="status in-stock">In Stock</span>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Stock Alerts",
          content: (
            <div className="demo-alerts">
              <h3>Stock Alerts & Notifications</h3>
              <div className="alert-list">
                <div className="alert-item critical">
                  <Bell className="alert-icon" />
                  <div className="alert-content">
                    <h4>Critical Stock Level</h4>
                    <p>Bluetooth Speaker (BS-002) - Only 12 units remaining</p>
                    <span className="alert-time">2 hours ago</span>
                  </div>
                </div>
                <div className="alert-item warning">
                  <Bell className="alert-icon" />
                  <div className="alert-content">
                    <h4>Reorder Reminder</h4>
                    <p>Smart Watch (SW-003) - Out of stock, reorder needed</p>
                    <span className="alert-time">5 hours ago</span>
                  </div>
                </div>
                <div className="alert-item info">
                  <Bell className="alert-icon" />
                  <div className="alert-content">
                    <h4>New Stock Arrival</h4>
                    <p>Wireless Headphones (WH-001) - 50 units added</p>
                    <span className="alert-time">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    orders: {
      title: "Order Management",
      slides: [
        {
          title: "Recent Orders",
          content: (
            <div className="demo-orders">
              <div className="orders-header">
                <h3>Order Queue</h3>
                <div className="order-filters">
                  <button className="filter-btn active">All</button>
                  <button className="filter-btn">Pending</button>
                  <button className="filter-btn">Processing</button>
                  <button className="filter-btn">Shipped</button>
                </div>
              </div>
              <div className="orders-list">
                <div className="order-card">
                  <div className="order-header">
                    <span className="order-id">#ORD-2024-001</span>
                    <span className="order-status processing">Processing</span>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>Customer:</strong> John Smith
                    </p>
                    <p>
                      <strong>Items:</strong> 3 products
                    </p>
                    <p>
                      <strong>Total:</strong> $299.99
                    </p>
                    <p>
                      <strong>Date:</strong> Jan 15, 2024
                    </p>
                  </div>
                </div>
                <div className="order-card">
                  <div className="order-header">
                    <span className="order-id">#ORD-2024-002</span>
                    <span className="order-status shipped">Shipped</span>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>Customer:</strong> Sarah Johnson
                    </p>
                    <p>
                      <strong>Items:</strong> 1 product
                    </p>
                    <p>
                      <strong>Total:</strong> $149.99
                    </p>
                    <p>
                      <strong>Date:</strong> Jan 14, 2024
                    </p>
                  </div>
                </div>
                <div className="order-card">
                  <div className="order-header">
                    <span className="order-id">#ORD-2024-003</span>
                    <span className="order-status pending">Pending</span>
                  </div>
                  <div className="order-details">
                    <p>
                      <strong>Customer:</strong> Mike Davis
                    </p>
                    <p>
                      <strong>Items:</strong> 2 products
                    </p>
                    <p>
                      <strong>Total:</strong> $199.99
                    </p>
                    <p>
                      <strong>Date:</strong> Jan 15, 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    settings: {
      title: "Settings & Configuration",
      slides: [
        {
          title: "System Settings",
          content: (
            <div className="demo-settings">
              <div className="settings-nav">
                <div className="nav-item active">General</div>
                <div className="nav-item">Security</div>
                <div className="nav-item">Notifications</div>
                <div className="nav-item">Integrations</div>
              </div>
              <div className="settings-content">
                <div className="setting-group">
                  <h4>Company Information</h4>
                  <div className="setting-item">
                    <label>Company Name</label>
                    <input type="text" value="StockChain AI Demo" readOnly />
                  </div>
                  <div className="setting-item">
                    <label>Business Type</label>
                    <select disabled>
                      <option>E-commerce</option>
                    </select>
                  </div>
                </div>
                <div className="setting-group">
                  <h4>System Preferences</h4>
                  <div className="setting-item checkbox">
                    <input type="checkbox" checked readOnly />
                    <label>Enable real-time notifications</label>
                  </div>
                  <div className="setting-item checkbox">
                    <input type="checkbox" checked readOnly />
                    <label>Auto-backup data daily</label>
                  </div>
                  <div className="setting-item checkbox">
                    <input type="checkbox" readOnly />
                    <label>Enable dark mode</label>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
  }

  const currentDemo = demoData[demoType] || demoData.dashboard
  const totalSlides = currentDemo.slides.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  if (!isOpen) return null

  return (
    <div className="demo-modal-overlay">
      <div className="demo-modal-backdrop" onClick={onClose}></div>
      <div className="demo-modal">
        <div className="demo-modal-header">
          <h2>{currentDemo.title} - Demo Preview</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="demo-modal-content">
          <div className="demo-slide">
            <h3>{currentDemo.slides[currentSlide].title}</h3>
            {currentDemo.slides[currentSlide].content}
          </div>

          {totalSlides > 1 && (
            <div className="demo-navigation">
              <button className="nav-btn" onClick={prevSlide} disabled={currentSlide === 0}>
                Previous
              </button>
              <div className="slide-indicators">
                {currentDemo.slides.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${index === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                  ></span>
                ))}
              </div>
              <button className="nav-btn" onClick={nextSlide} disabled={currentSlide === totalSlides - 1}>
                Next
              </button>
            </div>
          )}
        </div>

        <div className="demo-modal-footer">
          <p>This is a preview of our platform. Sign up to access all features!</p>
          <div className="demo-footer-buttons">
            <button className="demo-signup-btn" onClick={() => (window.location.href = "/signup")}>
              Sign Up Now
            </button>
            <button className="demo-close-btn" onClick={onClose}>
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoModal
