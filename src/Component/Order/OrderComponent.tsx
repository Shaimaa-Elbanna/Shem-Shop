import React from 'react'
import { CartItemType } from '../../Interfaces/cartIterface'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import { AllProductList, Product } from '../../Interfaces/ProductInterface'
import { Url } from '../../Utilities/MainUrl'
import useUrl from '../../hooks/useUrl'

export default function OrderComponent({productId,quantity}:CartItemType) {

  const {getItemQuantity,removeCartItem}= useShoppingCartContext()

const itemQuantity=getItemQuantity(productId)
  const{allData,loading}= useUrl<AllProductList>(Url+`product?_id=${productId}`)




  const product:Product|undefined =allData?.products[0]
  const mainImage =product?.mainImage
  const price =product?.price
  const name =product?.name
  const finalPrice =product?.finalPrice
  const brand =product?.brand
  const discription =product?.discription
  return (
    <>
        <div className="row bg-danger g-4">
    <div className="col-md-3 m-2">
      {mainImage&&   <img src={mainImage.secure_url} alt=""  className='w-100'   style={{objectFit: "cover"}}/>}
    
    </div>
    <div className="col-md-9">

    </div>
  </div>
    </>
  )
}
