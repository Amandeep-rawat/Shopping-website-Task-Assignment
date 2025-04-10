"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useContext } from "react"
import Login from "./pages/Login"
import ProductListing from "./pages/ProductListing"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Header from "./components/Header"
import { AuthProvider, AuthContext } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import "./App.css"

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated ,loading } = useContext(AuthContext)

  if (!isAuthenticated) {

    if (loading) {
      return <div>Loading...</div>  // Ya koi spinner
    }
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <ProductListing />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <ProductDetail />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <>
                      <Header />
                      <Cart />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
