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
import { Edit, Package, User, MapPin, CreditCard, Truck, Calendar, FileText, Phone, Mail } from "lucide-react"

export function OrderDetails({ order, onEdit, onUpdateStatus }) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!order) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <p>Order not found</p>
      </div>
    )
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: { backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" },
      Processing: { backgroundColor: "#dbeafe", color: "#1e40af", border: "1px solid #bfdbfe" },
      Shipped: { backgroundColor: "#e0e7ff", color: "#3730a3", border: "1px solid #c7d2fe" },
      Delivered: { backgroundColor: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" },
      Cancelled: { backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" },
    }

    const style = statusStyles[status] || statusStyles.Pending

    return (
      <Badge
        style={{
          ...style,
          padding: "6px 12px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {status}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status) => {
    const statusStyles = {
      Paid: { backgroundColor: "#dcfce7", color: "#166534" },
      Pending: { backgroundColor: "#fef3c7", color: "#92400e" },
      Refunded: { backgroundColor: "#fee2e2", color: "#991b1b" },
    }

    const style = statusStyles[status] || statusStyles.Pending

    return (
      <Badge
        style={{
          ...style,
          padding: "4px 8px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {status}
      </Badge>
    )
  }

  const handleStatusChange = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(order.id, newStatus)
    }
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "8px" }}>{order.orderNumber}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {getStatusBadge(order.status)}
            {getPaymentStatusBadge(order.paymentStatus)}
            <span style={{ color: "#6b7280", fontSize: "14px" }}>Order ID: {order.id}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            onClick={() => onEdit && onEdit(order)}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
            disabled={order.status === "Delivered" || order.status === "Cancelled"}
          >
            <Edit size={16} />
            <span>Edit Order</span>
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
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Total Items</p>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{order.items.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CreditCard size={32} style={{ color: "#10b981" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Order Total</p>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>Rs. {order.total.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={32} style={{ color: "#8b5cf6" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Order Date</p>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>{order.orderDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Truck size={32} style={{ color: "#f59e0b" }} />
              <div>
                <p style={{ fontSize: "14px", color: "#6b7280" }}>Delivery Date</p>
                <p style={{ fontSize: "18px", fontWeight: "bold" }}>{order.deliveryDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Update */}
      {order.status !== "Delivered" && order.status !== "Cancelled" && (
        <Card style={{ marginBottom: "24px" }}>
          <CardHeader>
            <CardTitle>Update Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={order.status === status ? "default" : "outline"}
                  onClick={() => handleStatusChange(status)}
                  disabled={order.status === status}
                  style={{ minWidth: "100px" }}
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
              backgroundColor: activeTab === "items" ? "white" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => setActiveTab("items")}
          >
            Items
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              backgroundColor: activeTab === "customer" ? "white" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => setActiveTab("customer")}
          >
            Customer
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px 16px",
              backgroundColor: activeTab === "shipping" ? "white" : "transparent",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping
          </button>
        </div>

        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Subtotal:</span>
                    <span style={{ fontWeight: "500" }}>Rs. {order.subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Shipping:</span>
                    <span style={{ fontWeight: "500" }}>
                      {order.shipping === 0 ? "Free" : `Rs. ${order.shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7280" }}>Tax:</span>
                    <span style={{ fontWeight: "500" }}>Rs. {order.tax.toLocaleString()}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: "1px solid #e5e7eb",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    <span>Total:</span>
                    <span>Rs. {order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Method</span>
                    <p style={{ fontWeight: "500", margin: "4px 0 0 0" }}>{order.paymentMethod}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Status</span>
                    <div style={{ marginTop: "4px" }}>{getPaymentStatusBadge(order.paymentStatus)}</div>
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Tracking Number</span>
                      <p style={{ fontWeight: "500", margin: "4px 0 0 0", fontFamily: "monospace" }}>
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}
                  {order.deliveredDate && (
                    <div>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Delivered Date</span>
                      <p style={{ fontWeight: "500", margin: "4px 0 0 0" }}>{order.deliveredDate}</p>
                    </div>
                  )}
                  {order.cancelledDate && (
                    <div>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Cancelled Date</span>
                      <p style={{ fontWeight: "500", margin: "4px 0 0 0" }}>{order.cancelledDate}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "items" && (
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Products included in this order</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <p style={{ fontWeight: "500", margin: 0 }}>{item.productName}</p>
                        </div>
                      </TableCell>
                      <TableCell style={{ fontFamily: "monospace", fontSize: "14px" }}>{item.sku}</TableCell>
                      <TableCell style={{ fontWeight: "500" }}>{item.quantity}</TableCell>
                      <TableCell style={{ fontWeight: "500" }}>Rs. {item.price.toLocaleString()}</TableCell>
                      <TableCell style={{ fontWeight: "500" }}>Rs. {item.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "customer" && (
          <Card>
            <CardHeader>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={20} />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "600" }}>Contact Details</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <User size={16} style={{ color: "#6b7280" }} />
                      <span style={{ fontWeight: "500" }}>{order.customerName}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Mail size={16} style={{ color: "#6b7280" }} />
                      <span>{order.customerEmail}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Phone size={16} style={{ color: "#6b7280" }} />
                      <span>{order.customerPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "600" }}>Customer ID</h4>
                  <p style={{ fontFamily: "monospace", fontSize: "14px", color: "#6b7280" }}>{order.customerId}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "shipping" && (
          <Card>
            <CardHeader>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={20} />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "600" }}>Shipping Address</h4>
                  <p style={{ color: "#374151", lineHeight: "1.5" }}>{order.shippingAddress}</p>
                </div>

                <div>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "600" }}>Delivery Information</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Expected Delivery:</span>
                      <p style={{ fontWeight: "500", margin: "2px 0 0 0" }}>{order.deliveryDate}</p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Tracking Number:</span>
                        <p style={{ fontWeight: "500", margin: "2px 0 0 0", fontFamily: "monospace" }}>
                          {order.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {order.notes && (
                <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
                  <h4
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "16px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FileText size={16} />
                    Order Notes
                  </h4>
                  <p
                    style={{
                      color: "#374151",
                      lineHeight: "1.5",
                      backgroundColor: "#f9fafb",
                      padding: "12px",
                      borderRadius: "6px",
                    }}
                  >
                    {order.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
