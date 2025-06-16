"use client";

import { useState } from "react";
import {
  Package,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "../ui-components";

export function InventoryDashboard({
  inventory,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onViewDetails,
  onAddToOrder, 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Calculate stats
  const LOW_STOCK_THRESHOLD = 9;

  const totalProducts = inventory.length;
  const lowStockItems = inventory.filter(
    (item) => item.status === "Low Stock"
  ).length;
  const outOfStockItems = inventory.filter(
    (item) => item.status === "Out of Stock"
  ).length;
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getItemStatus = (item) => {
    if (item.quantity === 0) return "Out of Stock";
    if (item.quantity <= LOW_STOCK_THRESHOLD) return "Low Stock";
    return "In Stock";
  };

  const filteredInventory = inventory.filter((item) => {
    const status = getItemStatus(item);

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.size &&
        item.size.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.color &&
        item.color.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStatus = !statusFilter || status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      "In Stock": {
        backgroundColor: "#dcfce7",
        color: "#166534",
        border: "1px solid #bbf7d0",
      },
      "Low Stock": {
        backgroundColor: "#fef3c7",
        color: "#92400e",
        border: "1px solid #fde68a",
      },
      "Out of Stock": {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
        border: "1px solid #fecaca",
      },
    };

    return (
      <span
        style={{
          ...styles[status],
          padding: "8px 18px",
          borderRadius: "12px",
          fontSize: "11px",
          fontWeight: "600",
        }}
      >
        {status}
      </span>
    );
  };

  const handleEdit = (item) => {
    onEditItem(item);
  };

  const handleDelete = (itemId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      onDeleteItem(itemId);
    }
  };

  const handleView = (item) => {
    onViewDetails(item);
  };

  const handleAddToOrder = (product) => {
  onAddToOrder(product); // passes to InventoryManagement.jsx to navigate to order page
};

  return (
    <div style={{ padding: "24px" }}>
      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Total Items
              </p>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                {totalProducts.toLocaleString()}
              </p>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#eff6ff",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Package size={24} style={{ color: "#3b82f6" }} />
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Low Stock Items
              </p>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                {lowStockItems}
              </p>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#fef3c7",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={24} style={{ color: "#f59e0b" }} />
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Out of Stock
              </p>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                {outOfStockItems}
              </p>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#fee2e2",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingDown size={24} style={{ color: "#ef4444" }} />
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                Total Value
              </p>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#1f2937",
                }}
              >
                Rs. {totalValue.toLocaleString()}
              </p>
            </div>
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#dcfce7",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DollarSign size={24} style={{ color: "#16a34a" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Table Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: "600",
                color: "#1f2937",
              }}
            >
              Shalwar Kameez Inventory
            </h2>
            <p
              style={{
                margin: "4px 0 0 0",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              Manage your clothing inventory for men, women, and children
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                }}
              />
              <input
                type="text"
                placeholder="Search by name, size, color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: "40px",
                  paddingRight: "12px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  width: "220px",
                  outline: "none",
                }}
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "white",
              }}
            >
              <option value="">All Categories</option>
              <option value="Men">Men Shalwar Kameez</option>
              <option value="Women">Women Shalwar Kameez</option>
              <option value="Child">Children Shalwar Kameez</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "white",
              }}
            >
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            {/* Add Product Button */}
            <button
              onClick={onAddItem}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
            >
              <Plus size={16} />
              Add New Item
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f9fafb" }}>
              <tr>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Product Details
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Category
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Size & Color
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Stock
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "12px 24px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#374151",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td style={{ padding: "16px 24px" }}>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#1f2937",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        style={{
                          margin: "2px 0 0 0",
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        {item.sku ? `SKU: ${item.sku}` : `ID: ${item.id}`}
                      </p>
                      {item.fabric && (
                        <p
                          style={{
                            margin: "2px 0 0 0",
                            fontSize: "12px",
                            color: "#6b7280",
                          }}
                        >
                          Fabric: {item.fabric}
                        </p>
                      )}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  >
                    {item.category}
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: "500",
                        }}
                      >
                        Size: {item.size || "N/A"}
                      </p>
                      <p
                        style={{
                          margin: "2px 0 0 0",
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        Color: {item.color || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      fontSize: "14px",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      fontSize: "14px",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    Rs. {item.price.toFixed(0)}
                  </td>
                  <td style={{ padding: "0 10px" }}>
                    {getStatusBadge(item.status)}
                  </td>
                  <td style={{ padding: "0 10px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => handleView(item)}
                        style={{
                          padding: "6px",
                          border: "none",
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          cursor: "pointer",
                          color: "#6b7280",
                          transition: "color 0.2s",
                        }}
                        title="View Details"
                        onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                        onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{
                          padding: "6px",
                          border: "none",
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          cursor: "pointer",
                          color: "#6b7280",
                          transition: "color 0.2s",
                        }}
                        title="Edit"
                        onMouseEnter={(e) => (e.target.style.color = "#10b981")}
                        onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          padding: "6px",
                          border: "none",
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          cursor: "pointer",
                          color: "#6b7280",
                          transition: "color 0.2s",
                        }}
                        title="Delete"
                        onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
                        onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => handleAddToOrder(item)} // <-- this function must be passed as a prop
                        style={{
                          padding: "6px",
                          border: "none",
                          backgroundColor: "transparent",
                          borderRadius: "4px",
                          cursor: "pointer",
                          color: "#6b7280",
                          transition: "color 0.2s",
                        }}
                        title="Add to Order"
                        onMouseEnter={(e) => (e.target.style.color = "#f59e0b")} // amber
                        onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-shopping-cart-plus"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="6" cy="19" r="2" />
                          <circle cx="17" cy="19" r="2" />
                          <path d="M17 17H6V3H4" />
                          <path d="M6 5l14 1-1 7H6" />
                          <path d="M15 10h4m-2 -2v4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInventory.length === 0 && (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "#6b7280",
              }}
            >
              <Package
                size={48}
                style={{ margin: "0 auto 16px", opacity: 0.3 }}
              />
              <p style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>
                No items found
              </p>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
                {searchTerm || categoryFilter || statusFilter
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first Shalwar Kameez"}
              </p>
              {!searchTerm && !categoryFilter && !statusFilter && (
                <button
                  onClick={onAddItem}
                  style={{
                    marginTop: "16px",
                    padding: "8px 16px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Add Your First Item
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
