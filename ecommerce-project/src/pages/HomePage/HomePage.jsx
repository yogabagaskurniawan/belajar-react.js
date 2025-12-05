import { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';

export function HomePage({carts}) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProductData = async () => {
      let response = await axios.get('/api/products')
        setProducts(response.data);
    }
    fetchProductData();
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