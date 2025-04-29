"use client"

const TransactionTable = ({ transactions, onViewTransaction, selectedId }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "failed":
        return "status-failed"
      default:
        return ""
    }
  }

  return (
    <div className="transaction-table-container">
      {transactions.length === 0 ? (
        <div className="no-transactions">No transactions found</div>
      ) : (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={selectedId === transaction.id ? "selected-row" : ""}>
                <td>{transaction.id}</td>
                <td>{transaction.from}</td>
                <td>{transaction.to}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(transaction.status)}`}>{transaction.status}</span>
                </td>
                <td>
                  <button className="btn-view-transaction" onClick={() => onViewTransaction(transaction)}>
                    <span>View Transaction</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TransactionTable

