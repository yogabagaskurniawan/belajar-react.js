import { Product } from "./Product.jsx";

export function ProductsGrid({products, loadCartData}) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCartData={loadCartData} />
        )
      })}
    </div>
  )
}