"use client"

import { useState } from "react"
import LogoutModal from "./LogoutModal"
import "./styles/LogoutButton.css"

const LogoutButton = ({ onLogout, children, className }) => {
  const [showModal, setShowModal] = useState(false)

  const handleLogoutClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button
        className={`logout-button ${className || ""}`}
        onClick={handleLogoutClick}
      >
        {children}
      </button>

      <LogoutModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onLogout={onLogout}
      />
    </>
  )
}

export default LogoutButton
