import axios from 'axios'
import { FormatMoney } from '../../utils/Money.js'


export function CartItemDetails ({cart, loadCartData}){
  const deleteProductCart = async () => {
    await axios.delete(`/api/cart-items/${cart.productId}`)
    loadCartData()
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
            Quantity: <span className="quantity-label">{cart.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">
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