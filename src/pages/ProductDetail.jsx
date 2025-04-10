"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "../styles/ProductDetail.css"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useContext(CartContext)

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error("Product not found")
        const data = await response.json()
        setProduct(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)

    // Reset the "Added to cart" message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) return <div className="loading">Loading product details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        &larr; Back
      </button>

      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-detail-image" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-category">{product.category}</div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          <div className="product-rating">
            <span className="rating-stars">
              {"★".repeat(Math.round(product.rating.rate))}
              {"☆".repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="rating-count">({product.rating.count} reviews)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" min="1" value={quantity} onChange={handleQuantityChange} />
            </div>

            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {addedToCart && <div className="added-to-cart-message">Added to cart!</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
