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

// This makes axios available in the Console.
// - Then, you can try running axios.post('/api/reset') in the Console.
window.axios = axios;

// More details:
// - Normally, we can't access values (like axios) outside of a file.
// - However, JavaScript has a built-in, global object called window
//   (this represents the browser window).
// - So one way to make a value accessible anywhere (including in the
//   Console), is to attach it to the window object. That's why we
//   do window.axios = axios;
// - Now, in the Console, we can run window.axios.post(...)
// - And JavaScript has another shortcut we can use. If we just type
//   "axios", this is a shortcut for "window.axios"
// - That's why the code window.axios = axios; lets us use "axios"
//   anywhere (including in the Conosle).

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
        <Route path="/orders" element={<OrdersPage carts={carts} loadCartData={loadCartData} />} />
        <Route path="/tracking/:orderId/:productId" element={<Tracking carts={carts} />} />
        <Route path="*" element={<NotFound carts={carts} />} />
      </Routes>
    </>
  )
}

export default App
