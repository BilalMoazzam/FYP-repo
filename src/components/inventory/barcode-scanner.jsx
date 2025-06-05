"use client"

import { useState, useRef, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Alert,
  AlertDescription,
  Badge,
} from "../ui-components"
import { Camera, Scan, Search, Package, XCircle, Upload, Eye, Edit, Plus, ArrowRight } from "lucide-react"

export function BarcodeScanner({ inventory = [], onNavigateToInventory, onEditProduct, onAddProduct }) {
  const [isScanning, setIsScanning] = useState(false)
  const [manualBarcode, setManualBarcode] = useState("")
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef(null)

  const startCamera = async () => {
    try {
      setError("")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setIsScanning(true)
      }
    } catch (err) {
      setError("Camera access denied. Please use manual input or upload an image.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsScanning(false)
  }

  const processBarcode = (barcode) => {
    setIsProcessing(true)

    // Search in current inventory
    const foundProduct = inventory.find(
      (item) => item.sku === barcode || item.id === barcode || (item.barcode && item.barcode === barcode),
    )

    setTimeout(() => {
      setScanResult({
        barcode,
        product: foundProduct,
        found: !!foundProduct,
        scannedAt: new Date().toLocaleString(),
      })
      setIsProcessing(false)
    }, 800)
  }

  const handleManualSubmit = (e) => {
    e.preventDefault()
    if (manualBarcode.trim()) {
      processBarcode(manualBarcode.trim())
      setManualBarcode("")
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setError("Processing barcode image...")
      setTimeout(() => {
        setError("")
        // Simulate random barcode from image
        const randomBarcode =
          "SK" +
          Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")
        processBarcode(randomBarcode)
      }, 1500)
    }
  }

  const simulateBarcodeScan = () => {
    if (inventory.length > 0) {
      const randomProduct = inventory[Math.floor(Math.random() * inventory.length)]
      processBarcode(randomProduct.sku || randomProduct.id)
    } else {
      processBarcode("SK001")
    }
  }

  const handleViewInInventory = () => {
    if (onNavigateToInventory) {
      onNavigateToInventory(scanResult.product)
    }
  }

  const handleEditProduct = () => {
    if (onEditProduct && scanResult.product) {
      onEditProduct(scanResult.product)
    }
  }

  const handleAddNewProduct = () => {
    if (onAddProduct) {
      onAddProduct({ barcode: scanResult.barcode })
    }
  }

  const clearResult = () => {
    setScanResult(null)
    setError("")
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      "In Stock": { bg: "#10b981", color: "white" },
      "Low Stock": { bg: "#f59e0b", color: "white" },
      "Out of Stock": { bg: "#ef4444", color: "white" },
    }
    const style = statusMap[status] || { bg: "#6b7280", color: "white" }
    return <Badge style={{ backgroundColor: style.bg, color: style.color }}>{status}</Badge>
  }

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#3b82f6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Scan size={40} style={{ color: "white" }} />
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "8px", color: "#1f2937" }}>Barcode Scanner</h1>
        <p style={{ color: "#6b7280", fontSize: "16px" }}>Scan or enter a barcode to find products in your inventory</p>
      </div>

      {/* Scan Result */}
      {scanResult && (
        <Card style={{ marginBottom: "24px", border: scanResult.found ? "2px solid #10b981" : "2px solid #ef4444" }}>
          <CardContent style={{ padding: "24px" }}>
            {scanResult.found ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
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
                    <Package size={24} style={{ color: "#16a34a" }} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#16a34a" }}>
                      ✅ Product Found!
                    </h3>
                    <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>
                      Scanned at {scanResult.scannedAt}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: "600" }}>
                    {scanResult.product.name}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "14px" }}>
                    <div>
                      <span style={{ color: "#6b7280" }}>SKU:</span>{" "}
                      <span style={{ fontWeight: "500" }}>{scanResult.product.sku || scanResult.product.id}</span>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280" }}>Category:</span>{" "}
                      <span style={{ fontWeight: "500" }}>{scanResult.product.category}</span>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280" }}>Price:</span>{" "}
                      <span style={{ fontWeight: "500" }}>Rs. {scanResult.product.price.toLocaleString()}</span>
                    </div>
                    <div>
                      <span style={{ color: "#6b7280" }}>Stock:</span>{" "}
                      <span style={{ fontWeight: "500" }}>{scanResult.product.quantity}</span>
                    </div>
                    {scanResult.product.size && (
                      <div>
                        <span style={{ color: "#6b7280" }}>Size:</span>{" "}
                        <span style={{ fontWeight: "500" }}>{scanResult.product.size}</span>
                      </div>
                    )}
                    {scanResult.product.color && (
                      <div>
                        <span style={{ color: "#6b7280" }}>Color:</span>{" "}
                        <span style={{ fontWeight: "500" }}>{scanResult.product.color}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: "12px" }}>{getStatusBadge(scanResult.product.status)}</div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Button
                    onClick={handleViewInInventory}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    <Eye size={16} />
                    View in Inventory
                    <ArrowRight size={16} />
                  </Button>
                  <Button
                    onClick={handleEditProduct}
                    variant="outline"
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Edit size={16} />
                    Edit
                  </Button>
                  <Button onClick={clearResult} variant="outline">
                    Scan Again
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
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
                    <Search size={24} style={{ color: "#dc2626" }} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#dc2626" }}>
                      ❌ Product Not Found
                    </h3>
                    <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>
                      Barcode: {scanResult.barcode}
                    </p>
                  </div>
                </div>

                <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                  This barcode is not in your inventory. Would you like to add it as a new product?
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Button onClick={handleAddNewProduct} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Plus size={16} />
                    Add New Product
                  </Button>
                  <Button onClick={clearResult} variant="outline">
                    Scan Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Scanner Interface */}
      {!scanResult && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
          {/* Camera Scanner */}
          <Card>
            <CardHeader>
              <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Camera size={20} />
                Camera Scanner
              </CardTitle>
              <CardDescription>Point your camera at a barcode to scan</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert style={{ marginBottom: "16px" }}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div style={{ position: "relative", marginBottom: "16px" }}>
                <video
                  ref={videoRef}
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "12px",
                    objectFit: "cover",
                    display: isScanning ? "block" : "none",
                  }}
                />

                {!isScanning && (
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px dashed #d1d5db",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Camera size={64} style={{ color: "#9ca3af", marginBottom: "16px" }} />
                      <p style={{ color: "#6b7280", fontSize: "16px", fontWeight: "500" }}>
                        Camera preview will appear here
                      </p>
                      <p style={{ color: "#9ca3af", fontSize: "14px" }}>Click "Start Camera" to begin scanning</p>
                    </div>
                  </div>
                )}

                {isScanning && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      border: "3px solid #ef4444",
                      width: "200px",
                      height: "100px",
                      borderRadius: "8px",
                      opacity: 0.8,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#ef4444",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Align barcode here
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                {!isScanning ? (
                  <Button
                    onClick={startCamera}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: "#10b981",
                      padding: "12px 24px",
                    }}
                  >
                    <Camera size={18} />
                    Start Camera
                  </Button>
                ) : (
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px" }}
                  >
                    <XCircle size={18} />
                    Stop Camera
                  </Button>
                )}
                <Button
                  onClick={simulateBarcodeScan}
                  variant="outline"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Scan size={16} />
                  Demo Scan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Manual Input & File Upload */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Manual Input */}
            <Card>
              <CardHeader>
                <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Search size={20} />
                  Manual Entry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit}>
                  <Input
                    value={manualBarcode}
                    onChange={(e) => setManualBarcode(e.target.value)}
                    placeholder="Enter barcode or SKU"
                    style={{ fontFamily: "monospace", marginBottom: "16px", fontSize: "16px", padding: "12px" }}
                  />
                  <Button
                    type="submit"
                    disabled={!manualBarcode.trim() || isProcessing}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <div
                          style={{
                            width: "16px",
                            height: "16px",
                            border: "2px solid #ffffff",
                            borderTop: "2px solid transparent",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={16} />
                        Search Product
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Upload size={20} />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  id="barcode-upload"
                />
                <label
                  htmlFor="barcode-upload"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px",
                    border: "2px dashed #d1d5db",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backgroundColor: "#f9fafb",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#3b82f6"
                    e.target.style.backgroundColor = "#eff6ff"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#d1d5db"
                    e.target.style.backgroundColor = "#f9fafb"
                  }}
                >
                  <Upload size={32} style={{ color: "#6b7280", marginBottom: "8px" }} />
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Upload barcode image</span>
                  <span style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>JPG, PNG up to 10MB</span>
                </label>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
