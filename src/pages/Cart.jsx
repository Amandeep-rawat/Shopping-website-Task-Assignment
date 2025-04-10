"use client"

import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "../styles/Cart.css"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, Number.parseInt(newQuantity))
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    setOrderPlaced(true)
    clearCart()

    // Hide the success message after 4 seconds
    setTimeout(() => {
      setOrderPlaced(false)
    }, 4000)
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {orderPlaced && <div className="order-success-message">Order placed successfully!</div>}

      {cart.length === 0 && !orderPlaced ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-button">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cart.length > 0 && (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} />
                  </div>

                  <div className="cart-item-details">
                    <Link to={`/product/${item.id}`} className="cart-item-title">
                      {item.title}
                    </Link>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="quantity-input"
                      />
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>

                    <div className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</div>

                    <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="cart-summary">
              <div className="cart-total">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>

              <div className="cart-actions">
                <Link to="/" className="continue-shopping-button">
                  Continue Shopping
                </Link>
                <button className="checkout-button" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
