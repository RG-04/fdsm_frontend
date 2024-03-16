import React, { createContext, useState } from 'react';

export const CartContext = createContext({
  cartItems: [],
  totalPrice: 0,
  addToCart: (restaurantID, item) => { },
  removeFromCart: (restaurantID, item) => { },
  clearCart: () => { },
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([{ restaurantID: 1, restaurantName: "Restaurant Name 1", item: { id: 1, name: "Pizza", price: 100 }, count: 1 }]);
  const [totalPrice, setTotalPrice] = useState(100);

  const addToCart = (restaurantID, restaurantName, item) => {
    const newCartItems = [...cartItems];
    const index = newCartItems.findIndex(
      (cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.id == item.id)
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
      (cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.id == item.id)
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