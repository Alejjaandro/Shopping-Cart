import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import storeItems from "../data/items.json";
import { formatCurrency } from '../utilities/formatCurrency';

export default function ShoppingCart({ isOpen }) {

    const { closeCart, cartItems } = useShoppingCart();
    // console.log(cartItems);

    return (
        // Component of bootstrap to make the slide in.
        // placement to set from where it slides in. 
        <Offcanvas show={isOpen} placement='end' onHide={closeCart}>

            <Offcanvas.Header closeButton>

                <Offcanvas.Title>Cart</Offcanvas.Title>

            </Offcanvas.Header>

            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}


                    <div className='ms-auto fw-bold fs-5'>
                        Total {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find(item => item.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
