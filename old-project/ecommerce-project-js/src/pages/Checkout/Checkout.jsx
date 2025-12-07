import './Checkout.css'
import { CheckoutHeader } from './CheckoutHeader.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrderSummary } from './OrderSummary.jsx';
import { PaymentSummary } from './PaymentSummary.jsx';


export function Checkout({carts, loadCartData}) {  
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data);
    }
    fetchCheckoutData()
  }, [])

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    fetchPaymentSummary();
  }, [carts])
  
  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
      <CheckoutHeader carts={carts} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} carts={carts} loadCartData={loadCartData}/>

          <PaymentSummary paymentSummary={paymentSummary} loadCartData={loadCartData} />
        </div>
      </div>
    </>
  )
}