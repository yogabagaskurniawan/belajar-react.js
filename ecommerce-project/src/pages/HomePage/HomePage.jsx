import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';

export function HomePage({carts}) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        setProducts(response.data);
      })
  }, [])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <Header carts={carts} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  )
}