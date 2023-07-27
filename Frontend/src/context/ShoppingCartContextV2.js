import React, { createContext, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart';
import itemsData from "../data/items.json"

const ShoppingCartContextV2 = createContext();

export const useShoppingCartV2 = () => {
    const context = useContext(ShoppingCartContextV2);
    if (!context) {
        throw new Error("useShoppingCartV2 must be used within an AuthProvider");
    }
    return context;
}

// ----- PROVIDER -----
export function ShoppingCartProviderV2({ children }) {

    const products = itemsData;
    // console.log(products);

    // We set initial value of "cartItems" as an array.
    const [cartItems, setCartItems] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    // To count the amount of items in the cart.
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    // Functions to open and close the cart.
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // INCREASE QUANTITY OF AN ITEM.

    function addProduct(product) {
        
        const exists = cartItems.find((item) => item.id === product.id);

        if (exists) {
            console.log(product.id);
            const newCartItems = cartItems.map(
                (item) => item.id === product.id ? { ...exists, qty: exists.qty + 1 } : item
            );

            setCartItems(newCartItems);

        } else {
            const newCartItems = [...cartItems, { ...product, qty: 1 }];
            setCartItems(newCartItems);
            console.log(cartItems);
        }
    }

    // DECREASE QUANTITY OF AN ITEM.

    const removeProduct = (product) => {
        const exist = cartItems.find((item) => item.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((item) => item.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
                )
            );
        }
    };

    return (
        <ShoppingCartContextV2.Provider value={{
            addProduct,
            removeProduct,
            cartItems,
            cartQuantity,
            openCart, closeCart
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContextV2.Provider>
    )
}
