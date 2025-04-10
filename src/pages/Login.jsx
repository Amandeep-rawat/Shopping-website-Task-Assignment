"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import "../styles/Login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate("/")
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username || !password) {
      setError("Please enter both username and password")
      setLoading(false)
      return
    }

    try {
      const result = await login(username, password)
      if (result.success) {
        navigate("/")
      } else {
        setError(result.error || "Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1><span className="bluespan">E</span>asy <span className="bluespan">S</span>hopping</h1>
        <p className="loginTagline">Login to explore and purchase your fav products!</p>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-help">
            <p>For testing, use:</p>
            <p>
              Username: <strong>mor_2314</strong>
            </p>
            <p>
              Password: <strong>83r5^_</strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
