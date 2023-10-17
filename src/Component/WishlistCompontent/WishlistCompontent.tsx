import React from 'react'
import useUrl from '../../hooks/useUrl'
import { Url } from '../../Utilities/MainUrl'
import { AllProductList, Product } from '../../Interfaces/ProductInterface'
import { Col, Stack, Card } from 'react-bootstrap'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import { useWishlistContext } from '../../context/WishlistContext'
import axios from 'axios'

type WishlistProp = {
  itemId: string
}



export default function WishlistCompontent({ itemId }: WishlistProp) {

  const { allData, loading } = useUrl<AllProductList>(Url + `product?_id=${itemId}`)

  const { increaseCartItem } = useShoppingCartContext()
  const { getWishlist } = useWishlistContext()



  const product: Product | undefined = allData?.products[0]
  const mainImage = product?.mainImage
  const price = product?.price
  const name = product?.name
  const finalPrice = product?.finalPrice


  async function removeFromWishlist(id: string) {

    try {
      const compine = `heloooItsMeCanYouHearME__${localStorage.getItem('refresh_token')}`;
      const token = compine.replace(/"/g, '');
      const config = {
        headers: {
          authorization: token
        }
      }
      const { data } = await axios.patch(`${Url}product/${itemId}/removeWishlist`, null, config)

      getWishlist()
    } catch (error) {
      console.log(error);

    }


  }


  return (
    <>
      <Stack gap={3} className='d-flex align-items-center my-2' direction='horizontal'>
        {mainImage && (
          <Card className='d-flex align-items-stretch my-2 position-relative' style={{ display: 'flex', flexDirection: 'row' }}>
            <Card.Img variant='start' className="border shadow shadow-lg" src={mainImage.secure_url} height="200px" width='200px' style={{ objectFit: 'cover' }} />

            <div className="ms-3 d-flex flex-column justify-content-between position-absolute end-0 bg-white shadow shadow-lg w-100 p-3 w-100 " style={{ transform: "translate(120%,5%)" }}>
              <div>
                <div className="h6">
                  {name}
                </div>
                <div>price: {price} LE</div>
                <div className="text-muted">finalprice: {finalPrice}LE

              </div>

            
                </div>
                <div className="d-flex justify-content-between my-4  ">
              <div className="button btn btn-danger p-1 " onClick={() => { removeFromWishlist(itemId) }}> remove</div>
                  <span className='btn btn-primary p-1 ' onClick={()=>{increaseCartItem(itemId)}}>  
 Add To Cart</span>
            </div>
              </div>

            
          </Card>
        )}
      </Stack>
    </>
  )



}
