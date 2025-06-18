"use client";

import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Clock,
  Truck,
  CheckCircle,
  Plus,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OrderDashboard({
  orders = [],
  customers = [],
  inventory = [],
  selectedProduct = null,
  onCreateOrder,
  onEditOrder,
  onDeleteOrder,
  onViewOrder,
  onUpdateOrderStatus,
  setSelectedProduct,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const [selectedProducts, setSelectedProducts] = useState(() => {
    const stored = localStorage.getItem("selectedProducts");
    return stored ? JSON.parse(stored) : [];
  });

  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate("/inventory");
  };

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    const localProductList = localStorage.getItem(
      "selectedProductFromInventory"
    );
    if (!localProductList) return;

    const parsedList = JSON.parse(localProductList);
    const updated = [...selectedProducts, ...parsedList];
    setSelectedProducts(updated);
    localStorage.setItem("selectedProducts", JSON.stringify(updated));
    localStorage.removeItem("selectedProductFromInventory");
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;

    const alreadyExists = selectedProducts.some(
      (p) => p.sku === selectedProduct.sku
    );
    if (alreadyExists) {
      setSelectedProduct(null);
      return;
    }

    const updated = [...selectedProducts, selectedProduct];
    setSelectedProducts(updated);
    localStorage.setItem("selectedProducts", JSON.stringify(updated));
    setSelectedProduct(null);
  }, [selectedProduct]);

  const handleClearSelected = () => {
    setSelectedProducts([]);
    localStorage.removeItem("selectedProducts");
  };

  const draftOrderTotal = selectedProducts.reduce(
    (sum, p) => sum + (p.price || 0),
    0
  );
  const draftOrder = selectedProducts.length
    ? {
        status: "Draft",
        total: draftOrderTotal,
      }
    : null;

  // 🧮 Summary Values (including draft)
  const totalOrders = orders.length + selectedProducts.length;
  const pendingOrders =
    orders.filter((o) => o.status === "Pending").length +
    selectedProducts.length;

  const processingOrders = orders.filter(
    (o) => o.status === "Processing"
  ).length;

  const shippedOrders = orders.filter((o) => o.status === "Shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

  const totalRevenue =
    orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0) +
    selectedProducts.reduce((sum, p) => sum + (p.price || 0), 0);

  const trimmedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredOrders = orders.filter((o) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();

    const matchesSearch =
      o.orderNumber?.toLowerCase().includes(trimmedSearchTerm) ||
      o.customerName?.toLowerCase().includes(trimmedSearchTerm) ||
      o.customerEmail?.toLowerCase().includes(trimmedSearchTerm);

    const matchesStatus = !statusFilter || o.status === statusFilter;

    const matchesDate =
      !dateFilter || new Date(o.orderDate) >= new Date(dateFilter);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleRemoveFromOrder = (indexToRemove) => {
    const updated = selectedProducts.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedProducts(updated);
    localStorage.setItem("selectedProducts", JSON.stringify(updated));
    console.log("❌ Removed product at index:", indexToRemove);
  };

  const handleAddToOrder = (product) => {
    const alreadyExists = selectedProducts.some((p) => p.sku === product.sku);
    if (alreadyExists) {
      console.log("⚠️ Product already exists in selected list:", product.name);
      return;
    }

    const updated = [...selectedProducts, product];
    setSelectedProducts(updated);
    localStorage.setItem("selectedProducts", JSON.stringify(updated));
    console.log("🛒 Product manually added via button:", product);
  };
  const handleBuyNow = (product) => {
  navigate("/blockchain-transaction", { state: { product } });
};

  return (
    <div className="order-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Order Management</h1>
            <p>Track and manage customer orders and shipments</p>
          </div>
          <button className="create-order-btn" onClick={handleCreateOrder}>
            <Plus size={20} />
            <span>Create New Order</span>
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <div className="stat-value">{totalOrders}</div>
            <div className="stat-revenue">
              Rs. {totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Orders</h3>
            <div className="stat-value">
              {pendingOrders}
              {draftOrder && (
                <span className="text-yellow-600 text-sm ml-2">(Draft)</span>
              )}
            </div>
            <div className="stat-sub">Processing: {processingOrders}</div>
          </div>
        </div>

        <div className="stat-card shipped">
          <div className="stat-icon">
            <Truck size={24} />
          </div>
          <div className="stat-content">
            <h3>Shipped Orders</h3>
            <div className="stat-value">{shippedOrders}</div>
            <div className="stat-sub">In Transit</div>
          </div>
        </div>

        <div className="stat-card delivered">
          <div className="stat-icon">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>Completed</h3>
            <div className="stat-value">{deliveredOrders}</div>
            <div className="stat-sub">Cancelled: {cancelledOrders}</div>
          </div>
        </div>
      </div>

      <div className="orders-table-section">
        <div className="table-header">
          <h2>
            Recent Orders ({filteredOrders.length + selectedProducts.length})
          </h2>

          <div className="table-filters">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-date"
            />
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="clear-selected-btn-1">
            <button
              className="clear-selected-btn-2"
              onClick={handleClearSelected}
            >
              🚫 Clear Selected Products
            </button>
          </div>
        )}

        <div className="table-container order-table-1">
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
            className="w-full text-sm text-left text-gray-700 dark:text-gray-300 order-page-data-from-inventory-page"
          >
            <thead className="text-xs text-left text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
              <tr className="rounded-md font-bold-1">
                <td className="px-4 py-3">Order Details</td>
                <td className="px-4 py-3">Customer</td>
                <td className="px-4 py-3">Category</td>
                <td className="px-4 py-3">Total</td>
                <td className="px-4 py-3">Status</td>
                <td className="px-4 py-3">Order Items</td>
                <td className="px-4 py-3">Date</td>
                <td className="px-4 py-3">Actions</td>
              </tr>
            </thead>

            <tbody className="order-page-data-from-inventory-page">
              {selectedProducts.map((product, index) => (
                <tr
                  key={`${product.sku}-${index}`}
                  className="bg-yellow-50 font-medium rounded-lg shadow-sm hover:bg-yellow-100 transition duration-150"
                >
                  <td className="px-4 py-4">{product.name}</td>
                  <td className="px-4 py-4">{product.customerName || "N/A"}</td>
                  <td className="px-4 py-4">{product.category || "Demo"}</td>
                  <td className="px-4 py-4">Rs. {product.price}</td>
                  <td className="px-4 py-4">
                    {product.status || "Out of Stock"}
                  </td>
                  <td className="px-4 py-4">{product.stock || product.sku}</td>
                  <td className="px-4 py-4">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="action-btn-space">
                    <button
                      onClick={() => handleRemoveFromOrder(index)}
                      className="remove-from-order-btn"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => handleBuyNow(product)}
                      className="buy-from-order-btn"
                    >
                      Buy Now
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-4 py-3">{order.orderDetails}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.items.join(", ")}</td>
                  <td className="px-4 py-3">Rs. {order.total}</td>
                  <td className="px-4 py-3">{order.status}</td>
                  <td className="px-4 py-3">{order.paymentStatus}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onViewOrder && onViewOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && selectedProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
