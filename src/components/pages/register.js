"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const newUser = await response.json()

      if (response.ok) {
        // Redirect to User Management and pass user via localStorage or router
        localStorage.setItem("newlyRegisteredUser", JSON.stringify(newUser))
        router.push("/user-management")
      } else {
        alert(newUser.message || "Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
