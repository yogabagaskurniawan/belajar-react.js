import dayjs from 'dayjs'
import { CartItemDetails } from './CartItemDetails.jsx'
import { DeliveryOptions } from './DeliveryOptions.jsx'
import { DeliveryDate } from './DeliveryDate.jsx'

export function OrderSummary({deliveryOptions, carts, loadCartData}){
  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && carts.map((cart) => {
        return (
          <div className="cart-item-container" key={cart.id}>
            <DeliveryDate deliveryOptions={deliveryOptions} cart={cart} />

            <div className="cart-item-details-grid">
              <CartItemDetails cart={cart} loadCartData={loadCartData}/>

              <DeliveryOptions deliveryOptions={deliveryOptions} cart={cart} loadCartData={loadCartData} />
            </div>
          </div>
        )
      })}          
    
    </div>
  )
}