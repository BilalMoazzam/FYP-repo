"use client"
import { X, Copy, ExternalLink } from "lucide-react"

const TransactionDetails = ({ transaction, onClose }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // In a real app, you might want to show a toast notification here
    alert("Copied to clipboard")
  }

  const openInExplorer = (hash) => {
    // In a real app, this would open the transaction in a blockchain explorer
    window.open(`https://etherscan.io/tx/${hash}`, "_blank")
  }

  return (
    <div className="transaction-details-panel">
      <div className="details-header">
        <h3>Transaction Details</h3>
        <button className="btn-close" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <div className="details-content">
        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-label">Transaction ID:</div>
            <div className="detail-value">
              {transaction.id}
              <button className="btn-icon" onClick={() => copyToClipboard(transaction.id)} title="Copy to clipboard">
                <Copy size={14} />
              </button>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Timestamp:</div>
            <div className="detail-value">{transaction.timestamp}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Sender:</div>
            <div className="detail-value">{transaction.from}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Recipient:</div>
            <div className="detail-value">{transaction.to}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Status:</div>
            <div className="detail-value">
              <span
                className={`status-badge ${
                  transaction.status.toLowerCase() === "confirmed"
                    ? "status-confirmed"
                    : transaction.status.toLowerCase() === "pending"
                      ? "status-pending"
                      : "status-failed"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Type:</div>
            <div className="detail-value">{transaction.type}</div>
          </div>
        </div>

        <div className="detail-section">
          <h4>Blockchain Information</h4>

          <div className="detail-row">
            <div className="detail-label">Transaction Hash:</div>
            <div className="detail-value hash-value">
              {transaction.hash}
              <div className="hash-actions">
                <button
                  className="btn-icon"
                  onClick={() => copyToClipboard(transaction.hash)}
                  title="Copy to clipboard"
                >
                  <Copy size={14} />
                </button>
                <button className="btn-icon" onClick={() => openInExplorer(transaction.hash)} title="View in explorer">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>

          {transaction.blockNumber && (
            <div className="detail-row">
              <div className="detail-label">Block Number:</div>
              <div className="detail-value">{transaction.blockNumber}</div>
            </div>
          )}

          <div className="detail-row">
            <div className="detail-label">Value:</div>
            <div className="detail-value">{transaction.value}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Gas Used:</div>
            <div className="detail-value">{transaction.gasUsed}</div>
          </div>
        </div>

        <div className="detail-section">
          <h4>Transaction Details</h4>

          {transaction.details &&
            Object.entries(transaction.details).map(([key, value]) => {
              // Skip rendering the documents array here
              if (key === "documents") return null

              return (
                <div className="detail-row" key={key}>
                  <div className="detail-label">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
                  </div>
                  <div className="detail-value">{Array.isArray(value) ? value.join(", ") : value}</div>
                </div>
              )
            })}

          {/* Render documents separately if they exist */}
          {transaction.details && transaction.details.documents && (
            <div className="detail-row">
              <div className="detail-label">Documents:</div>
              <div className="detail-value documents-list">
                {transaction.details.documents.map((doc, index) => (
                  <div className="document-item" key={index}>
                    <span>{doc}</span>
                    <button className="btn-icon" title="View document">
                      <ExternalLink size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="details-actions">
          <button className="btn btn-primary">Verify on Blockchain</button>
          {transaction.status === "Pending" && <button className="btn btn-secondary">Check Status</button>}
        </div>
      </div>
    </div>
  )
}

export default TransactionDetails

