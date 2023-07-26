import React, { createContext, useContext, useState } from 'react'

const ShoppingCartContext = createContext();

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error("useShoppingCart must be used within an AuthProvider");
    }
    return context;
}

export function ShoppingCartProvider({ children }) {

    const [cartItems, setCartItems] = useState( [ {id: Number, quantity: Number} ] );

    function getItemQuantity(id) {
        // If id are equal then get the quantity, if not return 0.
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseCartQuantity(id) {

        setCartItems(currItems => {

            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            } else {

                return currItems.map(item => {

                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }

                })
            }

        })
    }

    function decreaseCartQuantity(id) {

        setCartItems(currItems => {

            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {

                return currItems.map(item => {

                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }

                })
            }

        })
    }

    function removeFromCart(id) {

        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
