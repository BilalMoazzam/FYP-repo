import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getContract } from "../../lib/blockchain";
import { ethers } from "ethers";
import "../styles/BlockchainTransaction.css";

export default function BlockchainTransactionPage() {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [statusLog, setStatusLog] = useState([]);

  const BLOCKCHAIN_KEY = 'blockchainSelectedProducts';

useEffect(() => {
  const existing = JSON.parse(localStorage.getItem(BLOCKCHAIN_KEY)) || [];

  if (state?.product) {
    const isDuplicate = existing.some(p => p.id === state.product.id);
    if (!isDuplicate) {
      const updated = [...existing, state.product];
      localStorage.setItem(BLOCKCHAIN_KEY, JSON.stringify(updated));
      setProducts(updated);
    } else {
      setProducts(existing);
    }
  } else {
    setProducts(existing);
  }
}, [state?.product?.id]);

const removeProduct = (id) => {
  const existing = JSON.parse(localStorage.getItem(BLOCKCHAIN_KEY)) || [];
  const indexToRemove = existing.findIndex(p => p.id === id);
  const updated = [...existing.slice(0, indexToRemove), ...existing.slice(indexToRemove + 1)];
  localStorage.setItem(BLOCKCHAIN_KEY, JSON.stringify(updated));
  setProducts(updated);
};


  const loadTransactions = async () => {
    try {
      setLoading(true);
      const contract = await getContract();
      const count = await contract.getTransactionCount();
      const txCount = count.toNumber ? count.toNumber() : parseInt(count);

      const allTx = [];
      for (let i = 0; i < txCount; i++) {
        const tx = await contract.getTransaction(i);
        const structured = {
          txId: tx.txId,
          from: tx.fromEntity,
          to: tx.toEntity,
          type: tx.txType,
          description: tx.description,
          quantity: tx.quantity.toString(),
          status: tx.status,
          timestamp: new Date(tx.timestamp.toNumber() * 1000).toLocaleString(),
        };
        allTx.push(structured);
      }

      setTransactions(allTx.reverse());
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handlePayment = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected.");
        return;
      }

      setIsPaying(true);
      setPaymentStatus("🔄 Connecting MetaMask...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      let accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (!accounts || accounts.length === 0) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      }

      const signer = await provider.getSigner();
      const contract = await getContract(signer);

      for (const product of products) {
        const tx = await contract.recordTransaction(
          "tx-" + Date.now(),
          "User",
          "Shop",
          "Purchase",
          product?.name || "Unnamed Product",
          1,
          "Confirmed"
        );

        await tx.wait();

        setStatusLog((prev) => [
          {
            time: new Date().toLocaleString(),
            status: "Accepted",
            product,
          },
          ...prev,
        ]);
      }

      setPaymentStatus("✅ All payments confirmed and transactions recorded!");
      await loadTransactions();

      localStorage.removeItem("selectedProducts");
      setProducts([]);

    } catch (err) {
      console.error("Payment failed:", err);
      setPaymentStatus("❌ Payment failed or denied.");
      products.forEach((product) => {
        setStatusLog((prev) => [
          {
            time: new Date().toLocaleString(),
            status: "Declined",
            product,
          },
          ...prev,
        ]);
      });
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="bt-container">
      <h1 className="bt-heading">Blockchain Transactions</h1>

      {products.length > 0 && (
        <div className="bt-section bt-product-payment">
          <h3 className="bt-subheading">🛍️ Selected Products</h3>
          <table className="bt-detail-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>SKU</th>
                <th>ID</th>
                <th>Size</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.sku || "N/A"}</td>
                  <td>{product.id || "N/A"}</td>
                  <td>{product.size || "Standard"}</td>
                  <td>{product.status || "In Stock"}</td>
                  <td>
                    <button onClick={() => removeProduct(product.id)} className="remove-from-order-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bt-payment-method">
            <h4 className="bt-subheading">💳 Payment Method</h4>
            <p>Payment via <strong>MetaMask Wallet</strong></p>

            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="bt-pay-btn"
            >
              {isPaying ? "Processing..." : "Confirm & Pay for All"}
            </button>

            {paymentStatus && (
              <p className={`bt-status-message ${paymentStatus.startsWith("✅") ? "success" : "error"}`}>
                {paymentStatus}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="bt-section">
        <h3 className="bt-subheading">📜 Blockchain Transaction History</h3>
        {loading && <p className="bt-loading">Loading transactions...</p>}

        {!loading && transactions.length > 0 && (
          <div className="bt-table-wrapper">
            <table className="bt-transaction-table">
              <thead>
                <tr>
                  <th>Tx ID</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr key={idx}>
                    <td>{tx.txId}</td>
                    <td>{tx.from}</td>
                    <td>{tx.to}</td>
                    <td>{tx.type}</td>
                    <td>{tx.description}</td>
                    <td>{tx.quantity}</td>
                    <td className={tx.status === "Confirmed" ? "bt-status-success" : "bt-status-failed"}>
                      {tx.status}
                    </td>
                    <td>{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bt-section">
        <h3 className="bt-subheading">📦 Payment Status Log</h3>
        <div className="bt-table-wrapper">
          <table className="bt-transaction-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Status</th>
                <th>Name</th>
                <th>ID</th>
                <th>Size</th>
                <th>Price</th>
                <th>SKU</th>
              </tr>
            </thead>
            <tbody>
              {statusLog.length === 0 ? (
                <tr><td colSpan="7">No payment log available yet.</td></tr>
              ) : (
                statusLog.map((log, index) => (
                  <tr key={index}>
                    <td>{log.time}</td>
                    <td className={log.status === "Accepted" ? "bt-status-success" : "bt-status-failed"}>
                      {log.status}
                    </td>
                    <td>{log.product.name}</td>
                    <td>{log.product.id || "N/A"}</td>
                    <td>{log.product.size || "N/A"}</td>
                    <td>Rs. {log.product.price}</td>
                    <td>{log.product.sku || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
