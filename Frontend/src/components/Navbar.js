import { Container, Button, Nav, Navbar as NavbarBS } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useShoppingCartV2 } from '../context/ShoppingCartContextV2';

export default function Navbar() {

    const {openCart, cartQuantity} = useShoppingCartV2();

    return (
        <NavbarBS sticky='top' className='bg-white shadow-sm mb-3'>
            <Container >
                <Nav className='me-auto'>

                    <Nav.Link to="/" as={NavLink}>
                        Home
                    </Nav.Link>

                    <Nav.Link to="/store" as={NavLink}>
                        Store
                    </Nav.Link>

                    <Nav.Link to="/about" as={NavLink}>
                        About
                    </Nav.Link>

                </Nav>

                    <Button
                        onClick={openCart}
                        style={{ with: "3rem", height: "3rem" }}
                        variant='outline-primary'
                        className='rounded-circle'
                    >
                        {/* svg icon imported from https://iconsvg.xyz/ */}
                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <circle cx="10" cy="20.5" r="1" />
                            <circle cx="18" cy="20.5" r="1" />
                            <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
                        </svg>
                        
                        {/* For the number of the number of items on carts */}
                        {/* Only shows the number when cartQuantity > 0 */}
                        {cartQuantity > 0 && (
                        <div 
                        className='rounded-circle bg-danger d-flex 
                        justify-content-center align-items-center'
                        style={{ 
                            color: "white", 
                            with: "1.5rem", 
                            height: "1.5rem",
                            tranform: "translate(25%, 25%)"
                        }}
                        >
                            {cartQuantity}
                        </div>
                        )}
                    </Button>
                
            </Container>
        </NavbarBS>
    )
}
