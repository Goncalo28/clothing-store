import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => navigate("checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {!cartItems.length && <EmptyMessage>No items in cart.</EmptyMessage>}
        {cartItems.map((cartItem: any) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
        <Button onClick={goToCheckout}>Checkout</Button>
      </CartItems>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
