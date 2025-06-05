"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import TransactionTable from "../TransactionTable"
import TransactionDetails from "../TransactionDetails"
import { Filter, Download, X } from "lucide-react"
import "../styles/BlockchainTransaction.css"

const BlockchainTransaction = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all",
    type: "all",
  })

  // Mock data for blockchain transactions
  const mockTransactions = [
    {
      id: "TXN72345",
      timestamp: "2025-01-23 12:30:00",
      from: "Supplier A",
      to: "Customer B",
      status: "Confirmed",
      hash: "0x8f7d8a9c3b1e5f2d4a6b8c9d0e1f2a3b4c5d6e7f",
      blockNumber: 12345678,
      value: "2.5 ETH",
      gasUsed: "0.002 ETH",
      type: "Product Transfer",
      details: {
        productId: "PROD-1234",
        quantity: 50,
        description: "Microchips R7240",
        location: "Warehouse B",
        previousOwner: "Supplier A",
        newOwner: "Customer B",
        documents: ["Invoice #INV-2345", "Shipping #SHP-1234"],
      },
    },
    {
      id: "TXN72344",
      timestamp: "2025-01-23 11:45:30",
      from: "Customer C",
      to: "Supplier B",
      status: "Pending",
      hash: "0x7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
      blockNumber: null,
      value: "1.8 ETH",
      gasUsed: "0.001 ETH",
      type: "Payment",
      details: {
        invoiceId: "INV-5678",
        amount: "$2,450.00",
        paymentMethod: "Crypto",
        description: "Payment for order #ORD-9876",
        documents: ["Invoice #INV-5678"],
      },
    },
    {
      id: "TXN72343",
      timestamp: "2025-01-22 15:20:15",
      from: "Warehouse A",
      to: "Distribution Center",
      status: "Confirmed",
      hash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      blockNumber: 12345670,
      value: "3.2 ETH",
      gasUsed: "0.003 ETH",
      type: "Inventory Transfer",
      details: {
        batchId: "BATCH-789",
        products: ["PROD-1234", "PROD-5678", "PROD-9012"],
        quantity: 120,
        description: "Bulk transfer to distribution center",
        location: "Distribution Center East",
        previousOwner: "Warehouse A",
        newOwner: "Distribution Center",
        documents: ["Transfer #TRF-3456", "Manifest #MNF-2345"],
      },
    },
    {
      id: "TXN72342",
      timestamp: "2025-01-22 09:15:45",
      from: "Factory",
      to: "Warehouse A",
      status: "Confirmed",
      hash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
      blockNumber: 12345665,
      value: "4.7 ETH",
      gasUsed: "0.004 ETH",
      type: "Production Batch",
      details: {
        batchId: "BATCH-456",
        products: ["PROD-3456", "PROD-7890"],
        quantity: 200,
        description: "New production batch",
        location: "Warehouse A",
        qualityCheck: "Passed",
        documents: ["Production #PRD-4567", "Quality #QC-3456"],
      },
    },
    {
      id: "TXN72341",
      timestamp: "2025-01-21 14:50:30",
      from: "Customer D",
      to: "Supplier C",
      status: "Failed",
      hash: "0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f",
      blockNumber: null,
      value: "2.1 ETH",
      gasUsed: "0.001 ETH",
      type: "Payment",
      details: {
        invoiceId: "INV-7890",
        amount: "$3,200.00",
        paymentMethod: "Crypto",
        description: "Payment for order #ORD-5432",
        failureReason: "Insufficient funds",
        documents: ["Invoice #INV-7890"],
      },
    },
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions)
      setFilteredTransactions(mockTransactions)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, transactions])

  const applyFilters = () => {
    let filtered = [...transactions]

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter((tx) => tx.status.toLowerCase() === filters.status.toLowerCase())
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const now = new Date()
      let startDate

      switch (filters.dateRange) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0))
          break
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7))
          break
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1))
          break
        default:
          startDate = null
      }

      if (startDate) {
        filtered = filtered.filter((tx) => new Date(tx.timestamp) >= startDate)
      }
    }

    // Filter by transaction type
    if (filters.type !== "all") {
      filtered = filtered.filter((tx) => tx.type.toLowerCase() === filters.type.toLowerCase())
    }

    setFilteredTransactions(filtered)
  }

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction)
  }

  const handleCloseDetails = () => {
    setSelectedTransaction(null)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const exportCSV = () => {
    // In a real application, this would generate and download a CSV file
    const headers = ["Transaction ID", "Timestamp", "From", "To", "Status", "Type", "Value"]

    let csvContent = headers.join(",") + "\n"

    filteredTransactions.forEach((tx) => {
      const row = [tx.id, tx.timestamp, tx.from, tx.to, tx.status, tx.type, tx.value]
      csvContent += row.join(",") + "\n"
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "blockchain_transactions.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="blockchain-transaction">
      <Header
        title="Blockchain Transactions"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Blockchain Transactions", active: true },
        ]}
      />

      <div className="blockchain-container">
        <div className="blockchain-header">
          <h2>View and verify blockchain transactions in your supply chain</h2>
        </div>

        <div className="section">
          <div className="section-header">
            <h3>Recent Transactions</h3>
            <div className="section-actions">
              <button className="btn btn-filter" onClick={toggleFilters}>
                <Filter size={16} />
                <span>Add Filter</span>
              </button>
              <button className="btn btn-export" onClick={exportCSV}>
                <Download size={16} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Status</label>
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Date Range</label>
                <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Transaction Type</label>
                <select name="type" value={filters.type} onChange={handleFilterChange}>
                  <option value="all">All Types</option>
                  <option value="product transfer">Product Transfer</option>
                  <option value="payment">Payment</option>
                  <option value="inventory transfer">Inventory Transfer</option>
                  <option value="production batch">Production Batch</option>
                </select>
              </div>
              <button className="btn-close-filters" onClick={toggleFilters}>
                <X size={16} />
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading">Loading blockchain transactions...</div>
          ) : (
            <div className={`transaction-content ${selectedTransaction ? "with-details" : ""}`}>
              <TransactionTable
                transactions={filteredTransactions}
                onViewTransaction={handleViewTransaction}
                selectedId={selectedTransaction?.id}
              />

              {selectedTransaction && (
                <TransactionDetails transaction={selectedTransaction} onClose={handleCloseDetails} />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="page-header">
        <h1>Blockchain Transactions</h1>
        <p>Track and verify blockchain-based transactions</p>
      </div>

      <div className="blockchain-content">
        <div className="blockchain-stats">
          <div className="stat-card">
            <h3>Total Transactions</h3>
            <div className="stat-value">1,456</div>
          </div>
          <div className="stat-card">
            <h3>Verified Transactions</h3>
            <div className="stat-value">1,445</div>
          </div>
          <div className="stat-card">
            <h3>Pending Verification</h3>
            <div className="stat-value">11</div>
          </div>
          <div className="stat-card">
            <h3>Success Rate</h3>
            <div className="stat-value">99.2%</div>
          </div>
        </div>

        <div className="transaction-table-section">
          <div className="table-header">
            <h2>Recent Transactions</h2>
            <button className="new-transaction-btn">New Transaction</button>
          </div>

          <div className="transaction-table">
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#TX-001</td>
                  <td>Supply Chain</td>
                  <td>$1,250.00</td>
                  <td>
                    <span className="status verified">Verified</span>
                  </td>
                  <td>2024-01-15 10:30</td>
                  <td>
                    <button className="action-btn view">View</button>
                  </td>
                </tr>
                <tr>
                  <td>#TX-002</td>
                  <td>Payment</td>
                  <td>$850.00</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                  <td>2024-01-15 09:15</td>
                  <td>
                    <button className="action-btn view">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockchainTransaction
