import { createContext, useState } from "react";

const addCartItem = (cartItems: any[], prodToAdd: any) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === prodToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === prodToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...prodToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: any[], prodToRemove: any) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === prodToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== prodToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === prodToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (_p: boolean) => null,
  cartItems: [],
  addItemToCart: (_p: any) => null,
  removeItemFromCart: (_p: any) => null,
});

export const CartProvider = ({ children }: any) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any>([]);

  const addItemToCart = (prodToAdd: any) => {
    setCartItems(addCartItem(cartItems, prodToAdd));
  };

  const removeItemFromCart = (prodToRemove: any) => {
    setCartItems(removeCartItem(cartItems, prodToRemove));
  };

  const value: any = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
