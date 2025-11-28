import './App.css'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </>
  )
}

export default App
