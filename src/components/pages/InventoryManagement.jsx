"use client";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InventoryDashboard } from "../inventory/InventoryDashboard";
import { ProductDetails } from "../inventory/product-details";
import { ProductForm } from "../inventory/product-form";
import { Modal } from "../ui-components";

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [orderDraftItems, setOrderDraftItems] = useState([]);
  const navigate = useNavigate();

  // ✅ Correct function to use when adding product to order
  const handleAddToOrder = (product) => {
  // 1. Add or update array in localStorage
  const existing = localStorage.getItem("selectedProductFromInventory");
  const parsed = existing ? JSON.parse(existing) : [];
  const alreadyExists = parsed.some((p) => p.sku === product.sku);
  if (!alreadyExists) {
    parsed.push(product);
    localStorage.setItem("selectedProductFromInventory", JSON.stringify(parsed));
  }
  // 2. Navigate to orders page
  navigate("/orders", { replace: false });
};


  const addToOrderDraft = (product) => {
    // Save to localStorage
    localStorage.setItem(
      "selectedProductFromInventory",
      JSON.stringify(product)
    );

    // Navigate to order page (same route, forced update)
    navigate("/orders?add=true&time=" + new Date().getTime());
  };

  const handleCreateOrderFromProduct = (product) => {
    navigate("/orders", { state: { selectedProduct: product } });
  };

  const handleAddProduct = (productData = null) => {
    setEditingProduct(productData || null);
    setShowProductForm(true);
  };

  const handleAddToCart = (product) => {
    const existing = localStorage.getItem("selectedProductFromInventory");
    const parsed = existing ? JSON.parse(existing) : [];

    const alreadyExists = parsed.some((p) => p.sku === product.sku);
    if (!alreadyExists) {
      parsed.push(product);
      localStorage.setItem(
        "selectedProductFromInventory",
        JSON.stringify(parsed)
      );
    }

    // optional: navigate to order page if needed
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct && editingProduct.id) {
      setInventory((prev) =>
        prev.map((item) => (item.id === editingProduct.id ? productData : item))
      );
    } else {
      setInventory((prev) => [...prev, productData]);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setInventory((prev) => prev.filter((item) => item.id !== productId));
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        const mapped = data.map((p) => ({
          id: p.id ?? p._id,
          name: p.name,
          sku: p.sku || "",
          price: p.price ?? 0,
          quantity: p.stock ?? 0,
          size: Array.isArray(p.sizes)
            ? p.sizes.join(", ")
            : Array.isArray(p.size)
            ? p.size.join(", ")
            : p.size || "N/A",
          color: Array.isArray(p.colors)
            ? p.colors.join(", ")
            : Array.isArray(p.color)
            ? p.color.join(", ")
            : p.color || "N/A",
          category: p.category || "N/A",
          supplier: p.supplier || "N/A",
          status: (p.stock ?? 0) === 0 ? "Out of Stock" : "In Stock",
          imageUrl: p.imageUrl || "",
          lastUpdated: p.updatedAt
            ? new Date(p.updatedAt).toLocaleDateString()
            : "N/A",
        }));

        setInventory(mapped);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Failed to load inventory data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500 text-lg">
          Loading inventory data...
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)] text-red-600 text-lg">
          Error: {error}
        </div>
      );
    }

    return (
      <InventoryDashboard
        inventory={inventory}
        onAddItem={handleAddProduct}
        onEditItem={handleEditProduct}
        onDeleteItem={handleDeleteProduct}
        onViewDetails={handleViewDetails}
        onCreateOrder={handleCreateOrderFromProduct}
        onAddToOrder={handleAddToOrder}
        
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>{renderContent()}</main>

      <ProductForm
        isOpen={showProductForm}
        onClose={() => setShowProductForm(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {showProductDetails && selectedProduct && (
        <Modal
          isOpen={showProductDetails}
          onClose={() => setShowProductDetails(false)}
          title="Product Details"
          size="xlarge"
        >
          <ProductDetails
            product={selectedProduct}
            onEdit={(product) => {
              setShowProductDetails(false);
              handleEditProduct(product);
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default InventoryManagement;
