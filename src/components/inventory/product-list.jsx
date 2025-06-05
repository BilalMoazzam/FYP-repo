"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui-components"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

export function ProductList({ inventory = [], onAddItem, onEditItem, onDeleteItem, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Stock":
        return <Badge style={{ backgroundColor: "#10b981", color: "white" }}>In Stock</Badge>
      case "Low Stock":
        return <Badge style={{ backgroundColor: "#f59e0b", color: "white" }}>Low Stock</Badge>
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredProducts = inventory.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.size && product.size.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.color && product.color.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    const matchesStatus = !statusFilter || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <CardTitle>Shalwar Kameez Inventory</CardTitle>
            <CardDescription>Manage your clothing inventory for men, women, and children</CardDescription>
          </div>
          <Button onClick={onAddItem} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Plus size={16} />
            <span>Add New Item</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
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
              <Input
                placeholder="Search by name, size, color..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: "40px" }}
              />
            </div>

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
                minWidth: "180px",
              }}
            >
              <option value="">All Categories</option>
              <option value="Men Shalwar Kameez">Men Shalwar Kameez</option>
              <option value="Women Shalwar Kameez">Women Shalwar Kameez</option>
              <option value="Children Shalwar Kameez">Children Shalwar Kameez</option>
            </select>

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
                minWidth: "140px",
              }}
            >
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size & Color</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <p style={{ margin: 0, fontWeight: "500", fontSize: "14px" }}>{product.name}</p>
                      <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#6b7280" }}>SKU: {product.sku}</p>
                      {product.fabric && (
                        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#6b7280" }}>
                          Fabric: {product.fabric}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div>
                      <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>Size: {product.size || "N/A"}</p>
                      <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#6b7280" }}>
                        Color: {product.color || "N/A"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell style={{ fontWeight: "500" }}>{product.quantity}</TableCell>
                  <TableCell style={{ fontWeight: "500" }}>Rs. {product.price.toFixed(0)}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails && onViewDetails(product)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onEditItem && onEditItem(product)} title="Edit">
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteItem && onDeleteItem(product.id)}
                        title="Delete"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "#6b7280" }}>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: "500" }}>No items found</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "14px" }}>
              {searchTerm || categoryFilter || statusFilter
                ? "Try adjusting your search or filters"
                : "Get started by adding your first Shalwar Kameez"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
