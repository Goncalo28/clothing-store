import { createContext, useEffect, useState } from "react";

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

const clearCartItem = (cartItems: any, prodToClear: any) => {
  return cartItems.filter((item: any) => item.id !== prodToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (_p: boolean) => null,
  cartItems: [],
  addItemToCart: (_p: any) => null,
  removeItemFromCart: (_p: any) => null,
  cartCount: 0,
  clearItemFromCart: (_p: any) => null,
  cartTotal: 0,
});

export const CartProvider = ({ children }: any) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartCount, setCartCount] = useState<any>(0);
  const [cartTotal, setCartTotal] = useState<any>(0);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total: any, cartItem: any) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total: any, cartItem: any) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (prodToAdd: any) => {
    setCartItems(addCartItem(cartItems, prodToAdd));
  };

  const removeItemFromCart = (prodToRemove: any) => {
    setCartItems(removeCartItem(cartItems, prodToRemove));
  };

  const clearItemFromCart = (prodToClear: any) => {
    setCartItems(clearCartItem(cartItems, prodToClear));
  };

  const value: any = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
