import { FormatMoney } from '../../utils/Money.js'
import dayjs from 'dayjs'


export function DeliveryOptions({deliveryOptions, cart}) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>

      {deliveryOptions.map((deliveryOption) => {
        let descPrice = 'FREE Shipping'
        if(deliveryOption.priceCents > 0) {
          descPrice = `${FormatMoney(deliveryOption.priceCents)} - Shipping`
        }
        return (
          <div className="delivery-option" key={deliveryOption.id}>
            <input type="radio"
              checked={cart.deliveryOptionId === deliveryOption.id}
              className="delivery-option-input"
              name={`delivery-option-${cart.productId}`} />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {descPrice}
              </div>
            </div>
          </div>
        )
      })}
    
    </div>
  )
}