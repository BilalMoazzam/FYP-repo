import { useState } from "react";
import { recordTransaction } from "../lib/blockchain";

export default function OrderCreateForm({ onCreateOrder, selectedCustomer, selectedProduct }) {
  const [quantity, setQuantity] = useState(1);

  async function handleConfirmOrder(order) {
    try {
      const txHash = await recordTransaction({
        txId: `TX-${Date.now()}`,
        fromEntity: order.customerName,
        toEntity: "Vendor",
        txType: "Purchase",
        description: order.productName,
        quantity: order.quantity,
        status: "Confirmed"
      });

      alert("Blockchain transaction successful! Hash: " + txHash);
    } catch (err) {
      console.error("Blockchain transaction failed", err);
      alert("Blockchain transaction failed: " + err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      customerName: selectedCustomer?.name,
      productName: selectedProduct?.name,
      quantity,
    };

    await onCreateOrder(newOrder);
    await handleConfirmOrder(newOrder); // blockchain step
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* your form fields here */}
      <button type="submit">Confirm Order</button>
    </form>
  );
}
