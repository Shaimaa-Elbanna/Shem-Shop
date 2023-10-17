export interface Pokedex {
    message: string;
    cart:    Cart;
}

export interface Cart {
    _id:      string;
    userId:   string;
    products: CartItemType[];
    __v:      number;
}

export interface CartItemType {
    productId: string;
    quantity:  number;
    _id?:       string;
}
