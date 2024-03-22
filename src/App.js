import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/pages/Home";

import CustomerLogin from "./components/pages/Customer/Login";
import CustomerSignup from "./components/pages/Customer/SignUp";
import CustomerDashboard from "./components/pages/Customer/Dashboard";
import CustomerRestaurantList from "./components/pages/Customer/RestaurantList";
import CustomerViewRestaurant from "./components/pages/Customer/ViewRestaurant";
import Cart from "./components/pages/Customer/Cart";
import CustomerProfile from "./components/pages/Customer/Profile";
import CustomerOrders from "./components/pages/Customer/Orders";
import CustomerOrderInfo from "./components/pages/Customer/OrderInfo";
import { CustomerAuthContextProvider } from "./contexts/CustomerAuthContext";

import RestaurantLogin from './components/pages/Restaurant/Login';
import RestaurantSignup from './components/pages/Restaurant/SignUp';
import RestaurantDashboard from './components/pages/Restaurant/Dashboard';
import RestaurantProfile from "./components/pages/Restaurant/Profile";
import RestaurantOrders from "./components/pages/Restaurant/Orders";
import RestaurantOrderInfo from "./components/pages/Restaurant/OrderInfo";
import RestaurantMenu from "./components/pages/Restaurant/Menu";
import RestaurantNewItem from "./components/pages/Restaurant/NewItem";
import { RestaurantAuthContextProvider } from "./contexts/RestaurantAuthContext";

import DeliveryAgentLogin from './components/pages/DeliveryAgent/Login';
import DeliveryAgentSignup from './components/pages/DeliveryAgent/SignUp';
import DeliveryAgentDashboard from "./components/pages/DeliveryAgent/Dashboard";
import DeliveryAgentProfile from "./components/pages/DeliveryAgent/Profile";
import DeliveryAgentOrders from "./components/pages/DeliveryAgent/Orders";
import DeliveryAgentOrderInfo from "./components/pages/DeliveryAgent/OrderInfo";
import { DeliveryAgentAuthContextProvider } from "./contexts/DeliveryAgentAuthContext";

import ManagementLogin from "./components/pages/Management/Login";
import ManagementDashboard from "./components/pages/Management/Dashboard";
import ManagementCustomerList from "./components/pages/Management/CustomerList";
import ManagementViewCustomer from "./components/pages/Management/ViewCustomer";
import ManagementRestaurantList from "./components/pages/Management/RestaurantList";
import ManagementViewRestaurant from "./components/pages/Management/ViewRestaurant";
import ManagementDeliveryAgentList from "./components/pages/Management/DeliveryAgentList";
import { ManagementAuthContextProvider } from "./contexts/ManagementAuthContext";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="customer" element={<CustomerAuthContextProvider />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="login" element={<CustomerLogin />} />
          <Route path="signup" element={<CustomerSignup />} />
          <Route path="restaurants" element={<CustomerRestaurantList />} />
          <Route path="restaurant/:restaurantID" element={<CustomerViewRestaurant />}/>
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="order/:orderID" element={<CustomerOrderInfo />} />
          <Route path="*" element={<CustomerDashboard />} />
        </Route>

        <Route path="restaurant" element={<RestaurantAuthContextProvider />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="login" element={<RestaurantLogin />} />
          <Route path="signup" element={<RestaurantSignup />} />
          <Route path="profile" element={<RestaurantProfile />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="order/:orderID" element={<RestaurantOrderInfo />} />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="newitem" element={<RestaurantNewItem />} />
          <Route path="*" element={<RestaurantDashboard />} />
        </Route>

        <Route path="delivery-agent" element={<DeliveryAgentAuthContextProvider />}>
          <Route index element={<DeliveryAgentDashboard />} />
          <Route path="login" element={<DeliveryAgentLogin />} />
          <Route path="signup" element={<DeliveryAgentSignup />} />
          <Route path="profile" element={<DeliveryAgentProfile />} />
          <Route path="orders" element={<DeliveryAgentOrders />} />
          <Route path="order/:orderID" element={<DeliveryAgentOrderInfo />} />
          <Route path="*" element={<DeliveryAgentDashboard />} />
        </Route>

        <Route path="management" element={<ManagementAuthContextProvider />}>
          <Route index element={<ManagementDashboard />} />
          <Route path="login" element={<ManagementLogin />} />
          <Route path="customers" element={<ManagementCustomerList />} />
          <Route path="customer/:customerID" element={<ManagementViewCustomer />} />
          <Route path="restaurants" element={<ManagementRestaurantList />} />
          <Route path="restaurant/:restaurantID" element={<ManagementViewRestaurant />} />
          <Route path="delivery-agents" element={<ManagementDeliveryAgentList />} />
          <Route path="*" element={<ManagementDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
