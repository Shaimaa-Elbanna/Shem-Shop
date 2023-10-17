







import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
import { Url } from "../Utilities/MainUrl";
import { CartItemType } from "../Interfaces/cartIterface";
import Cart from "../Component/card/Cart";



type CartContextType = {
    cartItem: CartItemType[];
    setCartItem: React.Dispatch<React.SetStateAction<CartItemType[]>>;
    isDeleted: boolean
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean;
    openStore: () => void;
    closeStore: () => void;
    toggleStore: () => void;
    removeUserCart: () => void;
    quantity: number;
    getItemQuantity: (id: string) => number;
    increaseCartItem: (id: string) => void;
    removeCartItem: (id: string) => void;
    decreasCartItem: (id: string) => void;


};
type CartContextProviderProps = {
    children: React.ReactNode;

};





export function useShoppingCartContext() {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartContext = createContext({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {





    const [cartItem, setCartItem] = useState<CartItemType[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [cartItemChange, setCartItemChange] = useState<boolean>(false)
    const [isDeleted, setIsDeleted] = useState(true)

    const logedUser = localStorage.getItem('refresh_token')



    const compine = `heloooItsMeCanYouHearME__${localStorage.getItem('refresh_token')}`;
    const token = compine.replace(/"/g, '');
    const config = {
        headers: {
            authorization: token
        }
    }






    function updateLocalStorage(data: CartItemType[]) {

        localStorage.setItem('cartItem', JSON.stringify(data));
    }


    useEffect(() => {
        if (!localStorage.getItem('cartItem')) {
            localStorage.setItem('cartItem', JSON.stringify(cartItem));
        }
    }, [cartItem]);

    useEffect(() => {
        const storedCartItem = localStorage.getItem('cartItem');
        if (storedCartItem) {
            setCartItem(JSON.parse(storedCartItem));
        }
    }, []);

    function getItemQuantity(id: string) {
        return cartItem?.find(ele => ele.productId == id)?.quantity || 0

    }

    function increaseCartItem(id: string) {
        setCartItem(preValue => {

            if (preValue?.find(item => item.productId === id) == null) {
                return preValue ? [...preValue, { productId: id, quantity: 1 }] : [{ productId: id, quantity: 1 }];
            } else {
                return preValue?.map(item => {
                    if (item.productId === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }




        });

        setCartItemChange(true)

        updateLocalStorage(cartItem)
        setIsDeleted(true)


    }


    // function decreasCartItem(id: string) {

    //     setCartItem(preValue => {
    //         if (preValue?.find(item => item.productId == id)?.quantity === 1) {
    //             return preValue?.filter(elemnt => elemnt.productId !== id)
    //         }
    //         else {
    //             return preValue?.map(item => {
    //                 if (item.productId == id) {
    //                     return { ...item, quantity: item.quantity - 1 }
    //                 }
    //                 else return item
    //             })


    //         }


    //     }

    //     )







    // }

    function decreasCartItem(id: string) {
        setCartItem(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.productId === id && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });

            // Check if the updatedCart is empty and call clearCart if needed
            if (updatedCart.every(item => item.quantity === 0)) {
                removeUserCart();
            } else {
                setCartItemChange(true);
                updateLocalStorage(updatedCart);
            }

            return updatedCart;
        });
    }


    function openStore() {
        setIsOpen(true)
    }
    function closeStore() {
        setIsOpen(false)
    }
    function toggleStore() {
        setIsOpen(!isOpen)
    }

    const quantity = cartItem?.reduce((quantity, item) =>
        quantity + item.quantity, 0

    )

    async function fetchData() {
        try {



            const compine = `heloooItsMeCanYouHearME__${localStorage.getItem('refresh_token')}`;
            const token = compine.replace(/"/g, '');
            const config = {
                headers: {
                    authorization: token
                }
            }

            const localCartData = JSON.parse(localStorage.getItem('cartItem') || '[]');

            if (localCartData.length > 0) {
                sendCartUpdatesToServer()
            }

            else {
                const { data } = await axios.get(`${Url}cart`, config)
                setCartItem(data.cart[0].products)
                updateLocalStorage(data.cart[0].products)


            }

        } catch (error: any) {
            console.log(error);



        }
    }
    //لسه عاةوين نحوله ع لوجن لو ماكنش اوث




    useEffect(() => {
        try {

            if (!cartItem.length) {
                const storedCartItem = localStorage.getItem('cartItem');
                if (storedCartItem) {
                    setCartItem(JSON.parse(storedCartItem));
                    console.log(cartItem);

                }
            }

            if (logedUser) {
                fetchData()
            }


        } catch (error: any) {
            console.log(error);


        }



    }, [logedUser, cartItem])







    async function removeCartItem(id: string) {
        try {
            // Delete item from the server
            await deleteItemFromCartServr(id);

            // Update cart item state
            const updatedCart = cartItem.filter(item => item.productId !== id);
            setCartItem(updatedCart);
            updateLocalStorage(updatedCart);

            // Check if there are any remaining items
            const isRemainingItems = updatedCart.length > 0;

            // If no remaining items, remove user's entire cart
            if (!isRemainingItems) {
                await removeUserCart();
            }
        } catch (error) {
            console.log(error);
        }
    }



    async function deleteItemFromCartServr(productIds: string) {

        try {
            const { data } = await axios.patch(`${Url}cart/remove`,
                { productIds: [productIds] }, {
                headers: {
                    authorization: token
                }
            }
            )

            setCartItem(preValue => {

                const updateItems = preValue?.filter(ele => ele.productId !== productIds)

                updateLocalStorage(updateItems)
                return updateItems



            })



            // sendCartUpdatesToServer();



        } catch (error: any) {
            console.log(error);

        }
    }

    async function removeUserCart() {

        try {
            const { data } = await axios.delete(`${Url}cart/clear`, {
                headers: {
                    authorization: token
                }
            })
            setCartItem([])
            updateLocalStorage([])

        } catch (error: any) {
            console.log(error);

        }
    }

    useEffect(() => {
        try {
            if (cartItemChange) {
                sendCartUpdatesToServer()
                // fetchData()
                console.log(cartItem);
                console.log(cartItemChange);

                setCartItemChange(false)
            }

        } catch (error: any) {
            console.log(error);

        }
    }, [cartItemChange, cartItem])



    async function sendCartUpdatesToServer() {

        try {

            const compine = `heloooItsMeCanYouHearME__${localStorage.getItem('refresh_token')}`;
            const token = compine.replace(/"/g, '');
            const config = {
                headers: {
                    authorization: token
                }
            }
            if (cartItem?.length !== 0) {

                const dataToSend = { products: cartItem }
                const { data } = await axios.post(`${Url}cart`, dataToSend, config)

                setCartItem(data.cart?.products || data.newCart?.products)
                updateLocalStorage(data.cart?.products || data.newCart?.products)







            }
        } catch (error: any) {
            console.log(error);

        }


    }





    return (
        <ShoppingCartContext.Provider value={{ removeUserCart, increaseCartItem, decreasCartItem, getItemQuantity, setIsDeleted, isDeleted, cartItem, setCartItem, isOpen, removeCartItem, quantity, openStore, closeStore, toggleStore }}>
            {children}
            <Cart />
        </ShoppingCartContext.Provider>
    );
}