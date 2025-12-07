import { OrderHeader } from './OrderHeader.jsx';
import { OrderDetailsGrid } from './OrderDetailsGrid.jsx';

export function OrdersGrid ({orders, loadCartData}){
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div className="order-container" key={order.id}>
            <OrderHeader order={order} />

            <OrderDetailsGrid order={order} loadCartData={loadCartData}/>
          </div>
        )
      })}
    </div>
  )
}