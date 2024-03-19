import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { CustomerAuthContextProvider } from './contexts/CustomerAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomerAuthContextProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CustomerAuthContextProvider>
  </React.StrictMode>
);
