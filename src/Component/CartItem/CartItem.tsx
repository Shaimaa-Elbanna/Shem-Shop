import React from 'react'
import { CartItemType } from '../../Interfaces/cartIterface'
import useUrl from '../../hooks/useUrl'
import {  AllProductList, Product } from '../../Interfaces/ProductInterface'
import { Url } from '../../Utilities/MainUrl'
import { Stack } from 'react-bootstrap'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'



export default function CartItem({productId,quantity}:CartItemType) {

const {getItemQuantity,removeCartItem}= useShoppingCartContext()

const itemQuantity=getItemQuantity(productId)
   const{allData,loading}= useUrl<AllProductList>(Url+`product?_id=${productId}`)





    const product:Product|undefined =allData?.products[0]
const mainImage =product?.mainImage
const price =product?.price
const name =product?.name
const finalPrice =product?.finalPrice



return (
    <>
    <Stack gap={3} className='d-flex align-items-center my-2 ' direction='horizontal'>

   
        {mainImage&&(    <img src={mainImage.secure_url} style={{objectFit: "cover",height:'60px',width:'90px'}}   /> )}
<div className='me-auto'>

    <div className="h6">
{name} 
{itemQuantity&&(<span className='text-muted'>   x{itemQuantity}</span>)}

    </div>
<div>{price} LE</div>

</div>


<div className="ms-auto ">
    <div className="text-muted">{finalPrice}LE <span className='btn btn-danger' onClick={()=>{removeCartItem(productId)}}> 
    -</span></div>
</div>




    </Stack>
    </>



  )
}
