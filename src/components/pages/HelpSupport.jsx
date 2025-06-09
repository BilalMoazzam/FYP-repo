"use client";

import { useState, useEffect } from "react";
import Header from "../layout/Header";
import FAQSection from "../help/FAQSection";
import SupportCategories from "../help/SupportCategories";
import FeedbackForm from "../help/FeedbackForm";
import UserComments from "../help/UserComments";
import SupportFooter from "../help/SupportFooter";
import { MessageCircle } from "lucide-react";
import "../styles/HelpSupport.css";

const HelpSupport = () => {
  const [loading, setLoading] = useState(true);
  const [showChatSupport, setShowChatSupport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowDemoPopup(true);
  };

  const closeDemoPopup = () => {
    setShowDemoPopup(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

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
    ].filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(mockResults);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleChatSupport = () => {
    setShowChatSupport(!showChatSupport);
  };
  const [userComments, setUserComments] = useState([]);
  const handleFeedbackSubmit = (feedbackText) => {
    const newComment = {
      id: userComments.length + 1,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=50&width=50",
        role: "User",
      },
      date: new Date().toLocaleString(),
      content: feedbackText,
    };
    setUserComments([newComment, ...userComments]); // prepend new comment
  };

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
                  We've got 2,500 answers to the most common questions on the
                  StockChain AI Inventory ERP.
                </p>
              </div>

              <div className="help-mascot">
                <img className="mascot-image"/>
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

            {/* <SupportCategories /> */}
            <SupportCategories onCategoryClick={handleCategoryClick} />
            {showDemoPopup && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <button className="close-popup" onClick={closeDemoPopup}>
                    ×
                  </button>
                  <h2>{selectedCategory?.title}</h2>
                  <p>
                    {selectedCategory?.title === "Getting Started" &&
                      "Here's how to begin using the platform effectively."}
                    {selectedCategory?.title === "Frequently Asked Questions" &&
                      "Find answers to the most common user questions."}
                    {selectedCategory?.title === "Documentation" &&
                      "Read our official documentation for developers and users."}
                    {selectedCategory?.title === "Knowledge Base" &&
                      "Browse articles that explain platform features in depth."}
                    {selectedCategory?.title === "Contact Support" &&
                      "Reach out to our support team for personalized help."}
                  </p>
                </div>
              </div>
            )}
            <FAQSection />
            <div className="feedback-section">
              <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
              <UserComments comments={userComments} />
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
                      <img
                        src="/placeholder.svg?height=40&width=40"
                        alt="Support Agent"
                      />
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
  );
};

export default HelpSupport;
