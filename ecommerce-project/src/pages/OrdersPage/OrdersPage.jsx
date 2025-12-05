import './OrdersPage.css'
import { Header } from '../../components/Header'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { OrdersGrid } from './OrdersGrid.jsx';


export function OrdersPage({carts}) {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrdersData = async () => {
      let response = await axios.get('/api/orders?expand=products')
      setOrders(response.data);
    }
    fetchOrdersData()
  }, [])
  return (
		<>
			<title>Order</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />
			<Header carts={carts} />

			<div className="orders-page">
				<div className="page-title">Your Orders</div>

				<OrdersGrid orders={orders} />
			</div>
		</>
	)
}