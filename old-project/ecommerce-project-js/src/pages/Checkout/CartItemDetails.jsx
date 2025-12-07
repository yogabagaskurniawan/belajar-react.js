import axios from 'axios'
import { FormatMoney } from '../../utils/Money.js'
import { useState } from 'react'


export function CartItemDetails ({cart, loadCartData}){
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false)
  const [quantity, setQuantity] = useState(cart.quantity)
  
  const deleteProductCart = async () => {
    await axios.delete(`/api/cart-items/${cart.productId}`)
    await loadCartData()
  }

  const showTextbox = async () => {
    if(isUpdateQuantity) {
      if (quantity < 1) {
        alert("Jumlah harus lebih besar dari 1")
        return
      }
      await axios.put(`/api/cart-items/${cart.productId}`, {
        quantity : quantity
      })
      await loadCartData()
      setIsUpdateQuantity(false)
    }else {
      setIsUpdateQuantity(true)
    }
  }
  
  const updateQuantity = (event) => {
    let valueQuantity = Number(event.target.value)
    setQuantity(valueQuantity)
  }

  const enterUpdateQuantity = (event) => {
    if (event.key === 'Enter') {
      showTextbox()
    } else if (event.key === 'Escape') {
      setQuantity(cart.quantity)
      setIsUpdateQuantity(false)
    }
  }
  return (
    <>
      <img className="product-image" src={cart.product.image} />
      <div className="cart-item-details">
        <div className="product-name">
          {cart.product.name}
        </div>
        <div className="product-price">
          {/* ${(cart.product.priceCents/100).toFixed(2)}  */}
          {FormatMoney(cart.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdateQuantity ? 
              <input type="text" onKeyDown={enterUpdateQuantity} onChange={updateQuantity} value={quantity} className='quantity-textbox' /> :
              <span className="quantity-label">
                {cart.quantity}
              </span>
            }
          </span>
          <span onClick={showTextbox} className="update-quantity-link link-primary">
            Update
          </span>
          <span onClick={deleteProductCart} className="delete-quantity-link link-primary">
            Delete
          </span>
        </div>
      </div>
    </>
  )
}