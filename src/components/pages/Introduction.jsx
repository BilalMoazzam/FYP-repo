"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DemoModal from "../DemoModal"
import "../styles/Introduction.css"

const Introduction = () => {
  const navigate = useNavigate()
  const [demoModal, setDemoModal] = useState({ isOpen: false, type: null })

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleSignupClick = () => {
    navigate("/signup")
  }

  const handleViewDashboard = () => {
    setDemoModal({ isOpen: true, type: "dashboard" })
  }

  const handleDemoClick = (demoType) => {
    setDemoModal({ isOpen: true, type: demoType })
  }

  const closeDemoModal = () => {
    setDemoModal({ isOpen: false, type: null })
  }

  const features = [
    {
      title: "ERP Integration",
      description: "Streamline your business processes with our seamless ERP integration, ensuring smooth operations.",
    },
    {
      title: "Blockchain Security",
      description: "Ensure transparency and security with blockchain-powered transactions and data integrity.",
    },
    {
      title: "AI-Powered Analytics",
      description: "Leverage AI to forecast trends and make data-driven decisions that propel your business forward.",
    },
  ]

  const steps = [
    {
      step: "Step 1",
      title: "Sign up and get started with your personalized dashboard.",
    },
    {
      step: "Step 2",
      title: "Integrate your business systems with our ERP solution.",
    },
    {
      step: "Step 3",
      title: "Enable blockchain features to secure your transactions and data.",
    },
    {
      step: "Step 4",
      title: "Use AI-driven insights to make data-driven decisions and boost business performance.",
    },
  ]

  const footerLinks = [
    { name: "Dashboard", path: "dashboard", demo: true },
    { name: "Inventory", path: "inventory", demo: true },
    { name: "Order Management", path: "orders", demo: true },
    { name: "Settings", path: "settings", demo: true },
  ]

  const legalLinks = [
    { name: "Contact Us", path: "#" },
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
  ]

  return (
    <div className="introduction-page">
      {/* Header */}
      <header className="intro-header">
        <div className="header-content">
          <div className="log">
            <h1>STOCKCHAIN AI</h1>
          </div>
          <div className="auth-buttons">
            <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
            <span className="separator">|</span>
            <button className="signup-btn" onClick={handleSignupClick}>
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to our Platform</h1>
          <p className="hero-subtitle">
            Empowering businesses with ERP, Blockchain, and AI solutions for enhanced efficiency.
          </p>
          <button className="view-dashboard-btn" onClick={handleViewDashboard}>
            View Dashboard
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="product-overview">
        <div className="overview-content">
          <h2 className="overview-title">Product Overview</h2>
          <p className="overview-description">
            This platform integrates ERP, Blockchain, and AI to provide businesses with a comprehensive solution for
            operations management, security, and data analytics. Whether you are managing inventory, processing
            transactions, or forecasting future trends, our platform delivers the tools you need to streamline your
            business operations.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <h4 className="step-number">{step.step}</h4>
              <p className="step-description">{step.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="intro-footer">
        <div className="footer-content">
          <div className="footer-links">
            {footerLinks.map((link, index) => (
              <button
                key={index}
                className="footer-link"
                onClick={() => (link.demo ? handleDemoClick(link.path) : navigate(link.path))}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="legal-links">
            {legalLinks.map((link, index) => (
              <React.Fragment key={index}>
                <a href={link.path} className="legal-link">
                  {link.name}
                </a>
                {index < legalLinks.length - 1 && <span className="legal-separator">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="copyright">
            <p>© 2025 StockChain AI. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal isOpen={demoModal.isOpen} onClose={closeDemoModal} demoType={demoModal.type} />
    </div>
  )
}

export default Introduction
