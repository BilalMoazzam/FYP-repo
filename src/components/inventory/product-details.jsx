"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui-components"
import { Edit, Package, DollarSign, TrendingUp, TrendingDown, BarChart3, Shirt } from "lucide-react"

export function ProductDetails({ product, onEdit }) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!product) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <p>Product not found</p>
      </div>
    )
  }

  // Mock stock movements for the specific product
  const stockMovements = [
    {
      id: "1",
      type: "in",
      quantity: 20,
      reason: "New Stock Purchase",
      date: "2024-01-15",
      user: "Ahmad Ali",
      reference: "PO-2024-001",
    },
    {
      id: "2",
      type: "out",
      quantity: 3,
      reason: "Customer Sale",
      date: "2024-01-14",
      user: "Fatima Khan",
      reference: "SO-2024-045",
    },
    {
      id: "3",
      type: "adjustment",
      quantity: -1,
      reason: "Damaged item",
      date: "2024-01-13",
      user: "Hassan Sheikh",
    },
  ]

  const getStatusBadge = () => {
    if (product.quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (product.quantity <= 3) {
      return <Badge style={{ backgroundColor: "#f59e0b", color: "white" }}>Low Stock</Badge>
    } else {
      return <Badge style={{ backgroundColor: "#10b981", color: "white" }}>In Stock</Badge>
    }
  }

  const getMovementIcon = (type) => {
    switch (type) {
      case "in":
        return <TrendingUp size={16} style={{ color: "#10b981" }} />
      case "out":
        return <TrendingDown size={16} style={{ color: "#ef4444" }} />
      case "adjustment":
        return <BarChart3 size={16} style={{ color: "#3b82f6" }} />
      default:
        return <Package size={16} />
    }
  }

  const totalValue = product.quantity * product.price

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "8px" }}>{product.name}</h1>
          <p style={{ color: "#6b7280" }}>SKU: {product.sku}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {getStatusBadge()}
          <Button
            onClick={() => onEdit && onEdit(product)}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Edit size={16} />
            <span>Edit Item</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Package size={32} style={{ color: "#3b82f6" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Current Stock</p>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{product.quantity}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={32} style={{ color: "#10b981" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Price</p>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>Rs. {product.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Shirt size={32} style={{ color: "#8b5cf6" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Category</p>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>{product.category}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={32} style={{ color: "#f59e0b" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Total Value</p>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>Rs. {totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#f3f4f6",
            borderRadius: "6px",
            padding: "4px",
            marginBottom: "16px",
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              backgroundColor: activeTab === "overview" ? "white" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              backgroundColor: activeTab === "inventory" ? "white" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              backgroundColor: activeTab === "history" ? "white" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {activeTab === "overview" && (
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}
              >
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Category</p>
                  <p style={{ fontWeight: "500" }}>{product.category}</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Size</p>
                  <p style={{ fontWeight: "500" }}>{product.size || "N/A"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Color</p>
                  <p style={{ fontWeight: "500" }}>{product.color || "N/A"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Fabric</p>
                  <p style={{ fontWeight: "500" }}>{product.fabric || "N/A"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Supplier</p>
                  <p style={{ fontWeight: "500" }}>{product.supplier || "N/A"}</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280" }}>Last Updated</p>
                  <p style={{ fontWeight: "500" }}>{product.lastUpdated || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "inventory" && (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Current stock levels and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "24px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Current Quantity</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{product.quantity}</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Low Stock Alert</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#f59e0b" }}>3</p>
                </div>
                <div>
                  <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>Total Value</p>
                  <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}>
                    Rs. {totalValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Button onClick={() => onEdit && onEdit(product)}>Update Stock</Button>
                <Button variant="outline">Create Purchase Order</Button>
                <Button variant="outline">Transfer Stock</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "history" && (
          <Card>
            <CardHeader>
              <CardTitle>Stock Movement History</CardTitle>
              <CardDescription>Recent stock movements and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {getMovementIcon(movement.type)}
                          <span style={{ textTransform: "capitalize" }}>{movement.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            color: movement.type === "in" ? "#10b981" : movement.type === "out" ? "#ef4444" : "#3b82f6",
                          }}
                        >
                          {movement.type === "in" ? "+" : ""}
                          {movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell>{movement.reason}</TableCell>
                      <TableCell>{movement.date}</TableCell>
                      <TableCell>{movement.user}</TableCell>
                      <TableCell>{movement.reference || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
