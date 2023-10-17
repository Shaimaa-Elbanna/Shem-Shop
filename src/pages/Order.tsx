import React from 'react'
import Cart from '../Component/card/Cart'
import { useShoppingCartContext } from '../context/ShoppingCartContext'
import CartItem from '../Component/CartItem/CartItem'
import OrderComponent from '../Component/Order/OrderComponent'

export default function Order() {


const{cartItem}=useShoppingCartContext()

  return (
    <>
      <div className="container mt-5">
        <div className="row g-3">
          <div className="col-md-7">
<div>
  {cartItem.map(item=>(
    <OrderComponent  {...item} key={item._id} />
  ))} 
  
</div>

          </div>
          <div className="col-md-4"></div>

        </div>
      </div>
    </>
  )
}
