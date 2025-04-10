"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import "../styles/Header.css"

const Header = () => {
  const { user, logout } = useContext(AuthContext)
  const { cartCount } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          EasyShopping
        </Link>

        <nav className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </nav>

        {user && (
          <div className="user-info">
            <span>Hello, {user.username}</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
