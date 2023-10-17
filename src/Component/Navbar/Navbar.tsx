import React,{useState,useEffect} from 'react'
import { LayOutProp } from '../../pages/LayOut'
import { Link, NavLink } from 'react-router-dom';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';
import { useWishlistContext } from '../../context/WishlistContext';

export default function Navbar({ userRfToken, logout }: LayOutProp) {


const isAuth=localStorage.getItem("refresh_token")



    
    const { quantity, openStore } = useShoppingCartContext()


    const{wishlistUser}= useWishlistContext()


    
    // const{userWishList}=wishlistUser[0].userWishList


   

    return (
        <>
            {userRfToken?.role !== "Admin" ?
                <nav className="navbar navbar-expand-lg bg-transparent shadow shadow-lg m-0 p-0">
                    <div className="container-fluid">
                        <div className="d-flex col-3 justify-content-start"> {/* Align logo to the start */}
                            <Link className="navbar-brand active" to="/">
                                <h1><i className="fab fa-shopify"></i> SHEMSHOP</h1>
                            </Link>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav m-auto mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#/">
                                        Link
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="d-flex "> {/* Align login/sign up and cart to the end */}

<Link to='order' className='no-text-decoration '><h5 className="mx-3 mt-2">Orders</h5></Link>
                        <Link to ={`wishlist/${wishlistUser?.[0]?.id}`} className='no-text-decoration'>

                           <div className="position-relative me-4  d-flex align-items-center">
  <h5 className=" mt-2">Wishlist</h5>
  <i className="fa-regular fa-heart fa-2xl ms-2"></i>
  <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle w-25 d-flex justify-content-center align-items-center text-danger" style={{ transform: "translate(40%,-75%)" }}>
  {isAuth && wishlistUser && wishlistUser[0]?.userWishList?.length > 0 && wishlistUser[0].userWishList.length }
  </div>
 
</div>
</Link>


                            {  isAuth && quantity > 0  && (
                                <div className='btn-outline-primary btn position-relative me-5' onClick={openStore}>
                                    <i className="fa-solid fa-cart-shopping fa-lg fa-white "></i>
                                    <div className='position-absolute bottom-0 end-0 bg-danger rounded-circle w-50 ' style={{ transform: "translate(30%,25%)" }}>{quantity}</div>
                                </div>
                            )}
                            {!isAuth ? (
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav m-auto mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="signup">
                                                Signup
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="login">
                                                Login
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav m-auto mb-lg-0">
                                        <li className="nav-item">
                                            <div className="nav-link btn btn-danger" onClick={logout}>
                                                Logout
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}


                        </div>
                    </div>
                </nav>
                :
                ""}
        </>
    );

}
