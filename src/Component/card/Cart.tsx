import React from 'react'
import { Button, Offcanvas, Row, Stack } from 'react-bootstrap'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import CartItem from '../CartItem/CartItem'





export default function Cart() {



  const {isOpen,closeStore,cartItem,setCartItem,removeUserCart,quantity,setIsDeleted,isDeleted}= useShoppingCartContext()

function handleRemoveUserCart(){
  if(cartItem.length>0){
    removeUserCart()
    setIsDeleted(false)
    setCartItem([])

  }

}
  



  return (
    <> 
    <Offcanvas show={isOpen} onHide={closeStore} placement='end'>
      
      <Offcanvas.Header closeButton>
      <h4>Shopping Card</h4>

      </Offcanvas.Header>


      {isDeleted ?
      
      <Offcanvas.Body>



      <Stack gap={3}>


<Row>


{cartItem.map(item=>
  
  <CartItem  {...item} key={item._id} />
  )}
</Row>

<div className="d-flex justify-content-between">
{quantity>0 ? <Button className="btn-outline-danger btn" onClick={handleRemoveUserCart}> Remove all</Button> :""}

</div>

      </Stack>
    </Offcanvas.Body>
  :""    }

</Offcanvas>
    </> 

)
}








