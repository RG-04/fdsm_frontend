import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { CustomerAuthContextProvider } from './contexts/CustomerAuthContext';
import { RestaurantAuthContextProvider } from './contexts/RestaurantAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RestaurantAuthContextProvider>
    <CustomerAuthContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CustomerAuthContextProvider>
    </RestaurantAuthContextProvider>
  </React.StrictMode>
);
