import { FormatMoney } from '../../utils/Money.js'
import checkmarkIcon from '../../assets/images/icons/checkmark.png'
import axios from 'axios'
import { useState } from 'react'

export function Product({product, loadCartData}) {
  const [quantity, setQuantity] = useState(1)

  const selectQuantity = (event) => {
    let valueQuantity = Number(event.target.value)
    setQuantity(valueQuantity)
  }

  const addToCart = async (productId) => {
    if (quantity < 1 || quantity > 10) {
      alert("Jumlah harus antara 1 sampai 10")
      return
    }
    await axios.post('/api/cart-items', {
      'productId' : productId,
      'quantity' : quantity
    })
    await loadCartData()
  }
  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          src={'/images/ratings/rating-' + product.rating.stars * 10 + '.png'} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {FormatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select onChange={selectQuantity} value={quantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src={checkmarkIcon} />
        Added
      </div>

      <button onClick={() => addToCart(product.id)} className="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  )
}