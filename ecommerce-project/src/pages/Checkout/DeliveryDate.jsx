import dayjs from 'dayjs'

export function DeliveryDate ({deliveryOptions, cart}){
  let deliveryDate = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cart.deliveryOptionId
  })
  return (
    <div className="delivery-date">
      Delivery date: {dayjs(deliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
    </div>
  )
}