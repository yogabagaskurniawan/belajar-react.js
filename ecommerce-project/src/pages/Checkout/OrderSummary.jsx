import { FormatMoney } from '../../utils/Money.js'
import dayjs from 'dayjs'
import { DeliveryOptions } from './DeliveryOptions.jsx'

export function OrderSummary({deliveryOptions, carts}){
  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && carts.map((cart) => {
        let deliveryDate = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id === cart.deliveryOptionId
        })
        return (
          <div className="cart-item-container" key={cart.id}>
            <div className="delivery-date">
              Delivery date: {dayjs(deliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={cart.product.image} />

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
                  <span className="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <DeliveryOptions deliveryOptions={deliveryOptions} cart={cart} />
            </div>
          </div>
        )
      })}          
    
    </div>
  )
}