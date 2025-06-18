"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OrderDashboard } from "../orders/OrderDashboard";
import { Modal } from "../ui-components";
import "../styles/OrderManagement.css";

const OrderManagement = ({
  inventory: initialInventory = [],
  customers: initialCustomers = [],
}) => {
  const location = useLocation();
  const { selectedProduct: locationSelectedProduct } = location.state || {};

  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState(initialInventory);
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedProducts, setSelectedProducts] = useState(() => {
    const stored = localStorage.getItem("selectedProducts");
    return stored ? JSON.parse(stored) : [];
  });

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (locationSelectedProduct) {
      const alreadyExists = selectedProducts.some(
        (p) => p.sku === locationSelectedProduct.sku
      );
      if (!alreadyExists) {
        const updated = [...selectedProducts, locationSelectedProduct];
        setSelectedProducts(updated);
        localStorage.setItem("selectedProducts", JSON.stringify(updated));
      }
    }
  }, [locationSelectedProduct]);

  const handleCreateOrderFromProduct = (product) => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      orderNumber: `#ORD-${String(orders.length + 1).padStart(3, "0")}`,
      orderDate: new Date().toISOString().split("T")[0],
      orderDetails: product.name,
      customer: product.id,
      items: [product.sku || "N/A"],
      total: product.price,
      status: product.status,
      paymentStatus: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleClearSelected = () => {
    setSelectedProducts([]);
    localStorage.removeItem("selectedProducts");
  };
  const handleBuyNow = (product) => {
  console.log("Buying product:", product);
  // Add actual logic: e.g., create order, show toast, navigate, etc.
};

  return (
    <div className="order-management">
      <main className="order-main-content">
        <OrderDashboard
            orders={orders}
            customers={customers}
            inventory={inventory}
            handleBuyNow={handleBuyNow}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            onCreateOrder={handleCreateOrderFromProduct}
            onEditOrder={(o) => setEditingOrder(o)}
            onDeleteOrder={(id) =>
              setOrders((prev) => prev.filter((o) => o.id !== id))
            }
            onViewOrder={(o) => {
              setSelectedOrder(o);
              setShowOrderDetails(true);
            }}
            onUpdateOrderStatus={(id, status) => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === id
                    ? {
                        ...o,
                        status,
                        ...(status === "Delivered" && {
                          deliveredDate: new Date().toISOString().split("T")[0],
                        }),
                        ...(status === "Cancelled" && {
                          cancelledDate: new Date().toISOString().split("T")[0],
                        }),
                      }
                    : o
                )
              );
            }}
        />
      </main>

      {showOrderDetails && selectedOrder && (
        <Modal
          isOpen={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          title="Order Details"
          size="xlarge"
        >
          {/* Optional: Render order details */}
        </Modal>
      )}
    </div>
  );
};

export default OrderManagement;
