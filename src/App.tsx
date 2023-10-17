import React, { useEffect, useState, useContext } from 'react';
import './App.css';
// import {createHashRouter,RouterProvider} from "react-router-dom";
import LayOut from './pages/LayOut';
import Home from './pages/Home';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TokenData from './Interfaces/token';
import { CartContextProvider, ShoppingCartContext } from './context/ShoppingCartContext';
import { decodedToken } from './Utilities/decodeToken';
import SubCategory from './pages/SubCategory';
import CategoryPage from './pages/Category';
import { WishlistContextProvider } from './context/WishlistContext';
import Wishlist from './pages/Wishlist';
import Order from './pages/Order';
import Cart from './Component/card/Cart';







function App() {
  const [accessToken, setAccessToken] = useState<TokenData | null>()
  const [refreshToken, setRefreshToken] = useState<TokenData | null>()


  const { cartItem } = useContext(ShoppingCartContext)





  useEffect(() => {
      // decode()
      async function tokenDecode() {
        if (localStorage.getItem("access_token") != null && localStorage.getItem("refresh_token") != null) {

    await    decodedToken('access_token', setAccessToken);
      await decodedToken('refresh_token', setRefreshToken);}
      console.log(refreshToken);
     
      
      }
      tokenDecode()
    
  }, [refreshToken])

  

  console.log(refreshToken);

  function logout(): void {
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('wishlist')
    // localStorage.removeItem('cartItem')
  }





  const router = createHashRouter([{
    path: '/', element: refreshToken ? <LayOut userRfToken={refreshToken} logout={logout} /> : <LayOut logout={logout} />, children: [
      { path: '/', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'productDetails/:id', element: <ProductDetails /> },
      { path: 'login', element: <Login setRefToken={setRefreshToken} /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'order', element: <Order /> },
      { path: 'cart', element: <Cart /> },
      { path: 'wishlist/:id', element: <Wishlist /> },
      { path: 'category/:name/:categoryId', element: <CategoryPage /> },
      { path: 'subcategory/:name/:subcCtegoryId', element: <SubCategory /> },
      { path: '*', element: <h1> Error 404 </h1> },

    ]
  }])
  return (
    <>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={router} />
        </WishlistContextProvider>
      </CartContextProvider>

    </>
  );
}

export default App;
