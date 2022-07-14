import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => navigate("checkout");

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {!cartItems.length && <p>No items in cart.</p>}
        {cartItems.map((cartItem: any) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
        <Button onClick={goToCheckout}>Checkout</Button>
      </div>
    </div>
  );
};

export default CartDropdown;
