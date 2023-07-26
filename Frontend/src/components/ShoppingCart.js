import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';

export default function ShoppingCart({ isOpen }) {

    const { closeCart, cartItems } = useShoppingCart();

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
                        <CartItem key={item.id} {...item} />))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
