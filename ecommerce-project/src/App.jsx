import './App.css'
// https://reactrouter.com/7.8.0/start/declarative/routing
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { OrdersPage } from './pages/OrdersPage/OrdersPage.jsx'
import { Checkout } from './pages/checkout/Checkout.jsx'
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </>
  )
}

export default App
