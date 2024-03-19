import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  totalPrice: 0,
  addToCart: (restaurantID, item) => { },
  removeFromCart: (restaurantID, item) => { },
  clearCart: () => { },
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (restaurantID, restaurantName, item) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex(
      (cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.uid == item.uid)
    );
    if (index === -1) {
      newCartItems.push({ restaurantID, restaurantName, item, count: 1 });
    } else {
      newCartItems[index].count += 1;
    }

    setTotalPrice(totalPrice + item.price);
    setCartItems(newCartItems);
  };

  const removeFromCart = (restaurantID, restaurantName, item) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex(
      (cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.uid == item.uid)
    );
    if (index === -1) {
      return;
    }
    newCartItems[index].count -= 1;
    if (newCartItems[index].count === 0) {
      newCartItems.splice(index, 1);
    }

    setTotalPrice(totalPrice - item.price);
    setCartItems(newCartItems);
  };

  const clearCart = () => {
    setTotalPrice(0);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};