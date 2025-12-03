import './Checkout.css'
import { CheckoutHeader } from './CheckoutHeader.jsx'
import { FormatMoney } from '../../utils/Money.js'
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'

export function Checkout({carts}) {  
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)
  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
      })
    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
      })
  }, [])
  
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <CheckoutHeader carts={carts} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
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
                  </div>
                </div>
              )
            })}          
          
          </div>

          <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>

              { paymentSummary && 
                <>
                  <div className="payment-summary-row">
                    <div>Items ({paymentSummary.totalItems}):</div>
                    <div className="payment-summary-money">{FormatMoney(paymentSummary.productCostCents)}</div>
                  </div>

                  <div className="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div className="payment-summary-money">{FormatMoney(paymentSummary.shippingCostCents)}</div>
                  </div>

                  <div className="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div className="payment-summary-money">{FormatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                  </div>

                  <div className="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div className="payment-summary-money">{FormatMoney(paymentSummary.taxCents)}</div>
                  </div>

                  <div className="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div className="payment-summary-money">{FormatMoney(paymentSummary.totalCostCents)}</div>
                  </div>

                  <button className="place-order-button button-primary">
                    Place your order
                  </button>
                </>
              }
          </div>
        </div>
      </div>
    </>
  )
}