import './App.css'
// https://reactrouter.com/7.8.0/start/declarative/routing
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { OrdersPage } from './pages/OrdersPage/OrdersPage.jsx'
import { Checkout } from './pages/checkout/Checkout.jsx'
import { Tracking } from './pages/Tracking/Tracking.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [carts, setCarts] = useState([])
  const loadCartData = async () => {
    let response = await axios.get('/api/cart-items?expand=product')
      setCarts(response.data)
  }
  useEffect(() => {
    loadCartData()
  }, [])

  return (
    <>
      <Routes>
        <Route index element={<HomePage carts={carts} loadCartData={loadCartData} />} />
        <Route path="/checkout" element={<Checkout carts={carts} loadCartData={loadCartData} />} />
        <Route path="/orders" element={<OrdersPage carts={carts} />} />
        <Route path="/tracking/:orderId/:productId" element={<Tracking carts={carts} />} />
        <Route path="*" element={<NotFound carts={carts} />} />
      </Routes>
    </>
  )
}

export default App
