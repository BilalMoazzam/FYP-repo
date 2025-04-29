"use client"

import { useState, useEffect } from "react"
import Header from "../layout/Header"
import FAQSection from "../help/FAQSection"
import SupportCategories from "../help/SupportCategories"
import FeedbackForm from "../help/FeedbackForm"
import UserComments from "../help/UserComments"
import SupportFooter from "../help/SupportFooter"
import { MessageCircle } from "lucide-react"
import "../styles/HelpSupport.css"

const HelpSupport = () => {
  const [loading, setLoading] = useState(true)
  const [showChatSupport, setShowChatSupport] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Simulate search functionality
    // In a real app, this would search through FAQs and documentation
    const mockResults = [
      {
        id: 1,
        title: "How to add new inventory items",
        type: "FAQ",
        link: "#inventory-faq",
      },
      {
        id: 2,
        title: "Setting up blockchain verification",
        type: "Documentation",
        link: "#blockchain-docs",
      },
      {
        id: 3,
        title: "Managing user permissions",
        type: "Tutorial",
        link: "#user-tutorial",
      },
    ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

    setSearchResults(mockResults)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  const toggleChatSupport = () => {
    setShowChatSupport(!showChatSupport)
  }

  return (
    <div className="help-support">
      <Header
        title="Help & Support"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Help & Support", active: true },
        ]}
      />

      <div className="help-support-container">
        {loading ? (
          <div className="loading">Loading help resources...</div>
        ) : (
          <>
            <div className="help-header">
              <div className="help-title-section">
                <h1>Do You Have Questions?</h1>
                <p>We have answers! Find, search, or ask of the team!</p>
                <p className="help-subtitle">
                  We've got 2,500 answers to the most common questions on the StockChain AI Inventory ERP.
                </p>
              </div>

              <div className="help-mascot">
                {/* <img src="/placeholder.svg?height=150&width=150" alt="Support Mascot" className="mascot-image" /> */}
                <div className="question-bubble q1">How do I...</div>
                <div className="question-bubble q2">Can I...</div>
                <div className="question-bubble q3">What is...</div>
                <div className="question-bubble q4">Where to...</div>
              </div>

              <div className="search-container">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Search for help topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="search-btn">
                    Search
                  </button>
                </form>

                {searchResults.length > 0 && (
                  <div className="search-results">
                    <div className="results-header">
                      <h3>Search Results</h3>
                      <button className="clear-search" onClick={clearSearch}>
                        Clear
                      </button>
                    </div>
                    <ul>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <a href={result.link}>
                            <span className="result-title">{result.title}</span>
                            <span className="result-type">{result.type}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <SupportCategories />

            <FAQSection />

            <div className="feedback-section">
              <FeedbackForm />
              <UserComments />
            </div>

            <SupportFooter />

            <button className="chat-support-btn" onClick={toggleChatSupport}>
              <MessageCircle size={24} />
              <span>Live Chat Support</span>
            </button>

            {showChatSupport && (
              <div className="chat-support-window">
                <div className="chat-header">
                  <h3>Live Support</h3>
                  <button className="close-chat" onClick={toggleChatSupport}>
                    ×
                  </button>
                </div>
                <div className="chat-messages">
                  <div className="message support">
                    <div className="message-avatar">
                      <img src="/placeholder.svg?height=40&width=40" alt="Support Agent" />
                    </div>
                    <div className="message-content">
                      <p className="message-sender">Support Agent</p>
                      <p>Hello! How can I help you today with StockChain AI?</p>
                      <span className="message-time">Just now</span>
                    </div>
                  </div>
                </div>
                <div className="chat-input">
                  <input type="text" placeholder="Type your message here..." />
                  <button className="send-btn">Send</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HelpSupport
