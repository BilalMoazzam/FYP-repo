"use client"

import React from "react"

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, size = "medium" }) => {
  if (!isOpen) return null

  const sizeStyles = {
    small: { maxWidth: "400px" },
    medium: { maxWidth: "600px" },
    large: { maxWidth: "900px" },
    xlarge: { maxWidth: "1200px" },
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "100%",
          ...sizeStyles[size],
          maxHeight: "90vh",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              padding: "8px",
              border: "none",
              backgroundColor: "transparent",
              borderRadius: "6px",
              cursor: "pointer",
              color: "#6b7280",
              fontSize: "20px",
            }}
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ maxHeight: "calc(90vh - 120px)", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  )
}

// Form Components
export const FormGroup = ({ label, children, error }) => (
  <div style={{ marginBottom: "20px" }}>
    {label && (
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: "500",
          color: "#374151",
          marginBottom: "6px",
        }}
      >
        {label}
      </label>
    )}
    {children}
    {error && <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#ef4444" }}>{error}</p>}
  </div>
)

export const Input = ({ error, ...props }) => (
  <input
    style={{
      width: "100%",
      padding: "10px 12px",
      border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
      backgroundColor: "white",
    }}
    {...props}
  />
)

export const Select = ({ error, children, ...props }) => (
  <select
    style={{
      width: "100%",
      padding: "10px 12px",
      border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
    }}
    {...props}
  >
    {children}
  </select>
)

export const Button = ({ variant = "primary", size = "medium", children, ...props }) => {
  const variants = {
    primary: {
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
    },
    secondary: {
      backgroundColor: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
    },
    danger: {
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#6b7280",
      border: "none",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#3b82f6",
      border: "1px solid #3b82f6",
    },
  }

  const sizes = {
    small: { padding: "6px 12px", fontSize: "12px" },
    medium: { padding: "8px 16px", fontSize: "14px" },
    large: { padding: "12px 24px", fontSize: "16px" },
  }

  return (
    <button
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: "6px",
        fontWeight: "500",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        transition: "all 0.2s",
      }}
      {...props}
    >
      {children}
    </button>
  )
}

// Card Components
export const Card = ({ children, ...props }) => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflow: "hidden",
    }}
    {...props}
  >
    {children}
  </div>
)

export const CardHeader = ({ children }) => (
  <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>{children}</div>
)

export const CardTitle = ({ children }) => (
  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#1f2937" }}>{children}</h3>
)

export const CardDescription = ({ children }) => (
  <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>{children}</p>
)

export const CardContent = ({ children }) => <div style={{ padding: "20px" }}>{children}</div>

// Badge Component
export const Badge = ({ variant = "default", children, ...props }) => {
  const variants = {
    default: { backgroundColor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
    success: { backgroundColor: "#dcfce7", color: "#166534", border: "1px solid #bbf7d0" },
    warning: { backgroundColor: "#fef3c7", color: "#92400e", border: "1px solid #fde68a" },
    danger: { backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" },
    destructive: { backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" },
    secondary: { backgroundColor: "#f3f4f6", color: "#374151", border: "1px solid #d1d5db" },
    outline: { backgroundColor: "transparent", color: "#374151", border: "1px solid #d1d5db" },
  }

  return (
    <span
      style={{
        ...variants[variant],
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        display: "inline-block",
      }}
      {...props}
    >
      {children}
    </span>
  )
}

// Table Components
export const Table = ({ children, ...props }) => (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
    {...props}
  >
    {children}
  </table>
)

export const TableHeader = ({ children, ...props }) => (
  <thead style={{ backgroundColor: "#f9fafb" }} {...props}>
    {children}
  </thead>
)

export const TableBody = ({ children, ...props }) => <tbody {...props}>{children}</tbody>

export const TableRow = ({ children, ...props }) => (
  <tr style={{ borderBottom: "1px solid #e5e7eb" }} {...props}>
    {children}
  </tr>
)

export const TableHead = ({ children, ...props }) => (
  <th
    style={{
      padding: "12px 16px",
      textAlign: "left",
      fontSize: "12px",
      fontWeight: "600",
      color: "#374151",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}
    {...props}
  >
    {children}
  </th>
)

export const TableCell = ({ children, ...props }) => (
  <td style={{ padding: "12px 16px", fontSize: "14px", color: "#374151" }} {...props}>
    {children}
  </td>
)

// Alert Component
export const Alert = ({ children, variant = "default", ...props }) => {
  const variants = {
    default: { backgroundColor: "#f3f4f6", borderColor: "#d1d5db" },
    info: { backgroundColor: "#eff6ff", borderColor: "#bfdbfe" },
    success: { backgroundColor: "#dcfce7", borderColor: "#bbf7d0" },
    warning: { backgroundColor: "#fef3c7", borderColor: "#fde68a" },
    danger: { backgroundColor: "#fee2e2", borderColor: "#fecaca" },
  }

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        border: `1px solid ${variants[variant].borderColor}`,
        backgroundColor: variants[variant].backgroundColor,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export const AlertDescription = ({ children }) => <div style={{ fontSize: "14px", color: "#374151" }}>{children}</div>

// Dialog Components
export const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={() => onOpenChange(false)}
    >
      {children}
    </div>
  )
}

export const DialogTrigger = ({ children, asChild, onClick }) => {
  if (asChild) {
    return React.cloneElement(children, { onClick })
  }
  return children
}

export const DialogContent = ({ children, ...props }) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "500px",
      maxHeight: "90vh",
      overflow: "hidden",
      boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    }}
    onClick={(e) => e.stopPropagation()}
    {...props}
  >
    {children}
  </div>
)

export const DialogHeader = ({ children }) => <div style={{ padding: "24px 24px 0 24px" }}>{children}</div>

export const DialogTitle = ({ children }) => (
  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1f2937" }}>{children}</h2>
)

export const DialogDescription = ({ children }) => (
  <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>{children}</p>
)

// Label Component
export const Label = ({ children, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    style={{
      display: "block",
      fontSize: "14px",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "6px",
    }}
    {...props}
  >
    {children}
  </label>
)

// Textarea Component
export const Textarea = ({ error, ...props }) => (
  <textarea
    style={{
      width: "100%",
      padding: "10px 12px",
      border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
      backgroundColor: "white",
      minHeight: "100px",
      resize: "vertical",
    }}
    {...props}
  />
)

// Switch Component
export const Switch = ({ checked, onCheckedChange, id, ...props }) => (
  <div
    style={{
      display: "inline-block",
      position: "relative",
      width: "40px",
      height: "20px",
    }}
    {...props}
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      style={{ opacity: 0, width: 0, height: 0 }}
    />
    <span
      style={{
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: checked ? "#3b82f6" : "#e5e7eb",
        borderRadius: "34px",
        transition: ".4s",
        padding: "2px",
      }}
    >
      <span
        style={{
          position: "absolute",
          content: '""',
          height: "16px",
          width: "16px",
          left: checked ? "calc(100% - 18px)" : "2px",
          bottom: "2px",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: ".4s",
        }}
      />
    </span>
  </div>
)

// Select Components for dropdown
export const SelectTrigger = ({ children, className, ...props }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "10px 12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "white",
      cursor: "pointer",
    }}
    {...props}
  >
    {children}
  </div>
)

export const SelectValue = ({ placeholder, children }) => (
  <div style={{ color: children ? "#374151" : "#9ca3af" }}>{children || placeholder}</div>
)

export const SelectContent = ({ children, ...props }) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "6px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)",
      marginTop: "4px",
      overflow: "hidden",
      width: "100%",
      zIndex: 50,
    }}
    {...props}
  >
    {children}
  </div>
)

export const SelectItem = ({ children, value, ...props }) => (
  <div
    style={{
      padding: "10px 12px",
      cursor: "pointer",
      fontSize: "14px",
      color: "#374151",
      transition: "background-color 0.2s",
    }}
    data-value={value}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f3f4f6")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    {...props}
  >
    {children}
  </div>
)
