import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useShoppingCartV2 } from "../context/ShoppingCartContextV2";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

export default function CartItem({ id, quantity }) {

    const {removeProduct} = useShoppingCartV2();

    const item = storeItems.find(item=> item.id === id);
    if(item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            {/* Image */}
            <img 
            src={item.imgUrl}
            style={{ width: "125px", height: "125px", objectFit: "cover"}}
            />

            <div className="me-auto">
                {/* Name and quantity */}
                <div>
                    {item.name}{" "}
                    
                    {quantity > 1 && (
                        <span className="text-muted">
                            x{quantity}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="text-muted">
                    {formatCurrency(item.price)}
                </div>
            </div>

            {/* Total Price */}
            <div>
                {formatCurrency(item.price * quantity)}
            </div>

            {/* Remove Button */}
            <Button variant="outline-danger" size="sm" onClick={() => removeProduct(id)}>
                X
            </Button>
        </Stack>
    )
}
