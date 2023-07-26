import React, { createContext, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart';

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error("useShoppingCart must be used within an AuthProvider");
    }
    return context;
}

// ----- PROVIDER -----
export function ShoppingCartProvider({ children }) {

    // We set initial value of "cartItems" as an object array.
    const [cartItems, setCartItems] = useState( [ { id: Number(), quantity: Number() } ] );

    const [isOpen, setIsOpen] = useState(false);
    
    // To count the amount of items in the cart.
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );
    
    // Functions to open and close the cart.
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    
    // GET ITEM QUANTITY.
    function getItemQuantity(id) {
        // We search for the item with the current "id", if we have it, we return the quantity,
        // if not return a quantity value of 0.
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    // INCREASE QUANTITY OF AN ITEM.
    function increaseCartQuantity(id) {
        // To set the car items we create a function:
        // "currItems" is our item list whatever it has.
        setCartItems(currItems => {

            if (currItems.find(item => item.id === id) == null) {
                /* 
                We search for an item in our car with the current id, if it is "null" means it
                doesn't exist, so we add a new item with the id & it's quantity to 1.
                */
                return [...currItems, {id, quantity: 1 } ]
            } else {
                /* 
                If we find an item, we go through our item list (currItems) & 
                just set the quantity of the item that match the id to the previous value +1.
                */
                return currItems.map(item => {

                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1 }
                    } else {
                        // If the id doesn't match then return the item as it was.
                        return item
                    }

                })
            }
        })
    }

    // DECREASE QUANTITY OF AN ITEM.
    function decreaseCartQuantity(id) {

        setCartItems(currItems => {
            /* 
            We search for an item in our car with the current id, 
            if it quantity is equal to one, we filter the currItems so it only keep
            those items that doesn't match the id of the item.
            */
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                /*  
                If it quantity is more than one, we go through currItems and
                decrease the quantity of the item that match id by 1.
                */
                return currItems.map(item => {

                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        // If the id doesn't match then return the item as it was.
                        return item
                    }

                })
            }

        })
    }

    // REMOVE AN ITEM FROM CART.
    function removeFromCart(id) {
        /* 
        We go through currItem and we filter it so it only keep those items 
        that doesn't match the id of the item we want to remove.
        */
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart, closeCart
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}
