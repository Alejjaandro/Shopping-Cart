import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useShoppingCartV2 } from "../context/ShoppingCartContextV2";

export default function StoreItem(product) {

    // const {
    //     getItemQuantity,
    //     increaseCartQuantity,
    //     decreaseCartQuantity,
    //     removeFromCart,
    // } = useShoppingCart();

    // Context V2
    const {
        addProduct,
        removeProduct,
        cartItems
    } = useShoppingCartV2();

    const quantity = cartItems.length;
    console.log(quantity);

    return (
        <Card className="h-100">
            {/* Card top Image */}
            <Card.Img variant="top" src={product.imgUrl} height="200px"
                style={{ objectFit: "cover" }}
            />

            {/* Card Body */}
            <Card.Body className="d-flex flex-column">

                {/* Name and price of the product */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{product.name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
                </Card.Title>

                {/* Buttons to add to cart and increase or decrease the quantity */}
                <div className="mt-auto">
                    {/* 
                    If "quantity === 0" Button to add to cart.
                    If not, two buttons to increase or decrease the amount and it quantity.
                    */}
                    {quantity === 0 ? (
                        <Button 
                        className="w-100" 
                        onClick={() => addProduct(product)}> Add to Cart</Button>
                    ) : <div
                        className="d-flex align-items-center flex-column"
                        style={{ gap: ".5rem" }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ gap: ".5rem" }}
                        >
                            {/* Buttons to increase or decrease */}
                            <Button onClick={() => removeProduct(product)}>-</Button>
                            <div>
                                <span className="fs-3">{quantity}</span> in cart
                            </div>
                            <Button onClick={() => addProduct(product)}>+</Button>
                        </div>
                        {/* Button to remove all */}
                        <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => removeProduct(product)}>Remove
                        </Button>
                    </div>}
                </div>
            </Card.Body>
        </Card>
    )
}
