import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import TokenData from '../Interfaces/token'
import CatNavbar from '../Component/CatNavbar/CatNavbar';


export interface LayOutProp {
  userRfToken?:TokenData;
  logout: ()=> void
}

export default function LayOut({userRfToken,logout}:LayOutProp) {
  return (
    <>
       <Navbar userRfToken={userRfToken} logout={logout}  />
       <CatNavbar/>
       <Outlet/> 
    </>
  )
}




// 