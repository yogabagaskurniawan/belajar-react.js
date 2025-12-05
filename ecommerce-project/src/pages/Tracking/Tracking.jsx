import './Tracking.css'
import { Header } from '../../components/Header'
import { Link, useParams } from 'react-router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs'

export function Tracking({carts}) {
  const { orderId, productId } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const fetchTrackingData = async () => {
      let response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data)
    }
    fetchTrackingData()
  }, [orderId])

  if(!order){return null;} 
  
  let selectOrderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId  === productId
  })        
  // console.log(selectOrderProduct.product.name);

  // menghitung progresh pengiriman
  const totalDeliveryTimeMs = selectOrderProduct.estimatedDeliveryTimeMs - order.orderTimeMs  
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100

  let isPreparing = false
  let isShipped = false
  let isDelivered = false
  
  if (deliveryPercent < 33) {
    deliveryPercent = 0;
    isPreparing = true
  } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
    deliveryPercent = 50;
    isShipped = true
  } else if (deliveryPercent >= 100) {
    deliveryPercent = 100;
    isDelivered = true;
  } else {
    console.log('dd');
  }
  
  return (
    <>
      <title>Order Tracking</title>
      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />
      <Header carts={carts} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}
            {dayjs(selectOrderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {selectOrderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {selectOrderProduct.quantity}
          </div>

          <img className="product-image" src={`/${selectOrderProduct.product.image}`} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width:`${deliveryPercent}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}