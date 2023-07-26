import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function StoreItem({ id, name, price, imgUrl }) {

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useShoppingCart();

    const quantity = getItemQuantity(id);

    return (
        <Card className="h-100">
            {/* Card top Image */}
            <Card.Img variant="top" src={imgUrl} height="200px"
                style={{ objectFit: "cover" }}
            />

            {/* Card Body */}
            <Card.Body className="d-flex flex-column">

                {/* Name and price of the product */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>

                {/* Buttons to add to cart and increase or decrease the quantity */}
                <div className="mt-auto">
                    {/* 
                    If "quantity === 0" Button to add to cart.
                    If not, two buttons to increase or decrease the amount and it quantity.
                    */}
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}> Add to Cart</Button>
                    ) : <div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: ".5rem" }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ gap: ".5rem" }}
                        >
                            {/* Buttons to increase or decrease */}
                            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span> in cart
                            </div>
                            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        </div>
                        {/* Button to remove all */}
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                    </div>}
                </div>
            </Card.Body>
        </Card>
    )
}
