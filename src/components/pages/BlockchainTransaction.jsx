import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getContract } from "../../lib/blockchain";
import { ethers } from "ethers";

export default function BlockchainTransactionPage() {
  const { state } = useLocation();
  const product = state?.product;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const contract = await getContract();

      const count = await contract.getTransactionCount();
      const txCount = count.toNumber ? count.toNumber() : count;

      const allTx = [];
      for (let i = 0; i < txCount; i++) {
        try {
          const tx = await contract.getTransaction(i);
          allTx.push({
            txId: tx.txId,
            from: tx.fromEntity,
            to: tx.toEntity,
            type: tx.txType,
            description: tx.description,
            quantity: tx.quantity.toString(),
            status: tx.status,
            timestamp: new Date(tx.timestamp.toNumber() * 1000).toLocaleString(),
          });
        } catch (txError) {
          console.warn(`Failed to fetch transaction at index ${i}`, txError);
        }
      }

      setTransactions(allTx.reverse());
      setError(null);
    } catch (err) {
      console.error("Failed to fetch blockchain transactions", err);
      setError(err.message || "Unknown error");
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
        alert("MetaMask not detected. Please install it.");
        return;
      }

      setIsPaying(true);
      setPaymentStatus("🔄 Connecting to MetaMask...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = await getContract(signer);

      setPaymentStatus("⏳ Sending transaction to blockchain...");

      const tx = await contract.recordTransaction(
        "tx-" + Date.now(),
        "User",
        "Shop",
        "Purchase",
        product?.name || "Unknown",
        1,
        "Confirmed"
      );

      await tx.wait();

      setPaymentStatus("✅ Payment confirmed and transaction recorded!");
      await loadTransactions(); // Refresh after success
    } catch (err) {
      console.error("Payment failed", err);
      setPaymentStatus("❌ Payment failed or cancelled.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>🧾 Blockchain Transactions</h2>

      {product && (
        <div style={{ border: "2px solid #ccc", borderRadius: "10px", padding: "20px", marginBottom: "30px", backgroundColor: "#f9f9f9" }}>
          <h3>🛍️ Product Selected for Purchase</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <tbody>
              <tr><td style={{ padding: "8px", fontWeight: "bold" }}>Name:</td><td>{product.name}</td></tr>
              <tr><td style={{ padding: "8px", fontWeight: "bold" }}>Price:</td><td>Rs. {product.price}</td></tr>
              <tr><td style={{ padding: "8px", fontWeight: "bold" }}>SKU:</td><td>{product.sku || "N/A"}</td></tr>
              <tr><td style={{ padding: "8px", fontWeight: "bold" }}>Status:</td><td>{product.status || "In Stock"}</td></tr>
            </tbody>
          </table>

          <button
            onClick={handlePayment}
            disabled={isPaying}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isPaying ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            {isPaying ? "Processing..." : "Confirm & Pay with MetaMask"}
          </button>

          {paymentStatus && (
            <p style={{ marginTop: "15px", color: paymentStatus.startsWith("✅") ? "green" : "red" }}>
              {paymentStatus}
            </p>
          )}
        </div>
      )}

      <h2 style={{ marginBottom: "15px" }}>📜 Transaction History</h2>

      {loading && <p>🔄 Loading transactions...</p>}
      {error && <p style={{ color: "red" }}>❌ Error: {error}</p>}
      {!loading && transactions.length === 0 && <p>📭 No transactions found.</p>}

      {!loading && transactions.length > 0 && (
        <div style={{ border: "1px solid #ddd", borderRadius: "10px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#f2f2f2" }}>
              <tr>
                <th style={thStyle}>Tx ID</th>
                <th style={thStyle}>From</th>
                <th style={thStyle}>To</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={tdStyle}>{tx.txId}</td>
                  <td style={tdStyle}>{tx.from}</td>
                  <td style={tdStyle}>{tx.to}</td>
                  <td style={tdStyle}>{tx.type}</td>
                  <td style={tdStyle}>{tx.description}</td>
                  <td style={tdStyle}>{tx.quantity}</td>
                  <td style={tdStyle}>{tx.status}</td>
                  <td style={tdStyle}>{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: "10px",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
};
