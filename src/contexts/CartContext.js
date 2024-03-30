import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext({
  cartItems: [],
  totalPrice: 0,
  addToCart: (restaurantID, restaurantName, item) => { },
  removeFromCart: (restaurantID, restaurantName, item) => { },
  clearCart: () => { },
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [totalPrice, setTotalPrice] = useLocalStorage("totalPrice", 0);

  const addToCart = (restaurantID, restaurantName, item) => {
    let newCartItems = [...cartItems];
    let index = newCartItems.findIndex(
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
    let newCartItems = [...cartItems];
    let index = newCartItems.findIndex(
      (cartItem) => (cartItem.restaurantID == restaurantID && cartItem.item.uid == item.uid)
    );
    if (index === -1) {
      return;
    }
    console.log("Removing from cart", newCartItems[index].count, newCartItems)
    newCartItems[index].count -= 1;
    console.log("Removing1s from cart", newCartItems[index].count, newCartItems)
    if (newCartItems[index].count === 0) {
      console.log(newCartItems)
      newCartItems.splice(index, 1);
      console.log(newCartItems)
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