import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react"
import { Url } from "../Utilities/MainUrl";



type WishlistContextType = {
    wishlistUser: Wishlist[],
    getWishlist:()=> void
}
type ContextProp = {
    children: React.ReactNode
}
export interface AllWishlist {
    message: string;
    wishlist: Wishlist[];
}

export interface Wishlist {
    _id: string;
    userWishList: string[];
    id: string;
}



export const WishlistContext = createContext({} as WishlistContextType)

export function WishlistContextProvider({ children }: ContextProp) {


    const [wishlistUser, setWishlistUser] = useState<Wishlist[]>([])

    function updateWishlistLS(data: Wishlist[]) {
        localStorage.setItem("wishlist", JSON.stringify(data))
    }

    useEffect(() => {

        localStorage.setItem("wishlist", JSON.stringify(wishlistUser))
        

    }, [wishlistUser])




    async function getWishlist() {

        try {
            const compine = `heloooItsMeCanYouHearME__${localStorage.getItem('refresh_token')}`;
            const token = compine.replace(/"/g, '');
            const config = {
                headers: {
                    authorization: token
                }
            }

            const { data } = await axios.get(`${Url}product/wishlist`, config)
            setWishlistUser(data.wishlist)
            updateWishlistLS(data.wishlist)
        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {

        getWishlist()


    }, [])






    return (

        <WishlistContext.Provider value={{ wishlistUser,getWishlist }} >{children}</WishlistContext.Provider>
    )

}



export function useWishlistContext() {
    return useContext(WishlistContext)
}


