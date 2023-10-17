import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../../Interfaces/ProductInterface'
import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ShoppingCartContext, useShoppingCartContext } from '../../context/ShoppingCartContext'
import axios from 'axios'
import { Url } from '../../Utilities/MainUrl'
import {  useWishlistContext } from '../../context/WishlistContext'
export default function ProductDiv({ _id, name, discription, price, discount, finalPrice, colors, mainImage, subImages, avgRating, review }: Product) {



  const { getItemQuantity, removeCartItem, decreasCartItem, increaseCartItem } = useShoppingCartContext()
  const quantity = getItemQuantity(_id)

  const[showAlarm,setShowAlarm]=useState<boolean>()

  const{getWishlist,wishlistUser}= useWishlistContext()

const [isWhishlist,setIsWishlist] =useState<boolean>()

// const isAuth=localStorage.getItem("refresh_token")


const list:string[]= wishlistUser[0]?.userWishList





useEffect(() => {
  const isProductInWishlist = list?.some(item => item === _id);
  setIsWishlist(isProductInWishlist);
  
}, [list, _id,isWhishlist]);



const handleWishlistToggle=async(id:string)=>{


try {
if(!localStorage.getItem('refresh_token')){

  setShowAlarm(true)

  setTimeout(()=>{
    setShowAlarm(false)
  },4000)
}



  const compine = `heloooItsMeCanYouHearME__${localStorage.getItem('refresh_token')}`;
  const token = compine.replace(/"/g, '');
  const config = {
      headers: {
          authorization: token
      }
  }


  if(isWhishlist){
 
    const {data}= await axios.patch(`${Url}product/${id}/removeWishlist`,null, config)

}
else {

    const {data}= await axios.patch(`${Url}product/${id}/wishlsit`,null, config)

    }

    getWishlist()

} catch (error:any) {
  console.log(error);
  
}
}







return (
  <>
    <Col id={_id}>
      <div className="position-relative">
        <Card className="curser overflow-hidden">
          <Link to={'/productDetails/' + _id}>
            <Card.Img variant="top" src={mainImage.secure_url} height="300px" width="200px"></Card.Img>
          </Link>

          <Card.Body>
            <Link to={'/productDetails/' + _id} className="no-text-decoration">
              <div className="d-flex justify-content-between align-items-baseline">
                <span className="h4 ">{name}</span>
                <span className="text-muted ">{price} LE</span>
              </div>
              <div>
                <p className="">{discription.split(' ').slice(0, 15).join(' ')}...</p>
              </div>
            </Link>

            <div className="text-center">
              {quantity == 0  ? (
                <button className="btn btn-primary w-75 m-auto my-3" onClick={() => increaseCartItem(_id)}>
                  + Add to the card
                </button>
              ) : (
                <div className="d-fled m-auto flex-column align-align-items-center my-3" style={{ gap: '5rem' }}>
                  <div className="flex">
                    <Button className="btn btn-primary" onClick={() => decreasCartItem(_id)}>
                      -
                    </Button>
                    <span className="mx-2">
                      <span className="fs-3">{quantity}</span> in cart
                    </span>
                    <Button className="btn btn-primary" onClick={() => increaseCartItem(_id)}>
                      +
                    </Button>
                  </div>
                  <Button className="btn-danger my-3 me-2" onClick={() => removeCartItem(_id)}>
                    remove item
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {showAlarm && (
         <div className={`my-alert alert alert-danger mt-3 position-absolute top-0 end-0 `} role="alert">
         Please log in to add to your wishlist!
       </div>
        )}

        <div
          className={`star position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center shadow shadow-lg ${
            isWhishlist ? 'wishlist-active' : 'wishlist-inactive'
          }`}
          onClick={() => handleWishlistToggle(_id)}
        >
          {isWhishlist ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
        </div>
      </div>
    </Col>
  </>
);
}



//عاوزه اظبط منظر النجمه البشع ده 


//محتاجه اظبط القلب بحيث اني اجيب القايمه بتاعه الامنتيات الف عليها و لو لقيت الأي دي بتاع اي برودكت جواها تفضل النجمه لونها ابيض 




// return (
//   <>
//     <Col id={_id}>
//       <Card className="curser overflow-hidden position-relative ">
//       <Link to={'/productDetails/'+ _id}>

//         <Card.Img variant='top' className=" " src={mainImage.secure_url} height="300px" width='200px' ></Card.Img>
//         </Link>

//         <Card.Body>
//       <Link to={'/productDetails/'+ _id} className='no-text-decoration'>

//           <div className="d-flex justify-content-between align-items-baseline">
//             <span className='h4 '>{name}</span>
//             <span className='text-muted '>{price} LE</span>
//           </div>
//           <div>
//             <p className=''>{discription.split(' ').slice(0, 15).join(" ")}...</p>
//           </div>
//           </Link>

//           <div className='text-center'>

//           {quantity == 0 ?
//               <button className="btn btn-primary w-75 m-auto my-3" onClick={() => { increaseCartItem(_id) }}> + Add to the card</button>
//             :
//             <div className="d-fled m-auto flex-column align-align-items-center my-3" style={{gap:"5rem"}}>
//             <div className="flex">
//             <Button className='btn btn-primary' onClick={()=>{decreasCartItem(_id)}}>-</Button>
//          <span className='mx-2'><span className='fs-3'>{quantity}</span> in cart</span>
//              <Button className='btn btn-primary' onClick={()=>{increaseCartItem(_id)}}>+</Button>
//             </div>
//             <Button className='btn-danger my-3 me-2' onClick={()=>{removeCartItem(_id)}}>remove item</Button>
//          </div>
//           }

//           </div>
//           {showAlarm && (
//             <div className="alert alert-danger mt-3 position-absolute top=0 end-0"  role="alert">
//               Please log in to add to your wishlist!
//             </div>
//           )}

//         </Card.Body>

//         <div
//             className={`star position-absolute top-0 end-0 rounded-circle d-flex justify-content-center align-items-center shadow shadow-lg ${
//               isWhishlist ? 'wishlist-active' : 'wishlist-inactive'
//             }`}
//             onClick={() => handleWishlistToggle(_id)}
//           >
//             {isWhishlist ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
//           </div>
//       </Card>
//     </Col>
//   </>
// )