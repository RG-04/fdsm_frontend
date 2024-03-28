import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/pages/Home";

import CustomerSignup from "./pages/customer/Signup";
import CustomerDashboard from "./components/pages/Customer/Dashboard";
import CustomerRestaurantList from "./components/pages/Customer/RestaurantList";
import CustomerViewRestaurant from "./components/pages/Customer/ViewRestaurant";
import Cart from "./components/pages/Customer/Cart";
import CustomerProfile from "./components/pages/Customer/Profile";
import CustomerOrders from "./components/pages/Customer/Orders";
import CustomerOrderInfo from "./components/pages/Customer/OrderInfo";
import { CustomerAuthContextProvider } from "./contexts/CustomerAuthContext";

import RestaurantSignup from "./pages/restaurant/Signup";
import RestaurantDashboard from "./components/pages/Restaurant/Dashboard";
import RestaurantProfile from "./components/pages/Restaurant/Profile";
import RestaurantOrders from "./components/pages/Restaurant/Orders";
import RestaurantOrderInfo from "./components/pages/Restaurant/OrderInfo";
import RestaurantMenu from "./components/pages/Restaurant/Menu";
import RestaurantNewItem from "./components/pages/Restaurant/NewItem";
import { RestaurantAuthContextProvider } from "./contexts/RestaurantAuthContext";

import DeliveryAgentSignup from "./pages/deliveryAgent/Signup";
import DeliveryAgentDashboard from "./components/pages/DeliveryAgent/Dashboard";
import DeliveryAgentProfile from "./components/pages/DeliveryAgent/Profile";
import DeliveryAgentOrders from "./components/pages/DeliveryAgent/Orders";
import DeliveryAgentOrderInfo from "./components/pages/DeliveryAgent/OrderInfo";
import { DeliveryAgentAuthContextProvider } from "./contexts/DeliveryAgentAuthContext";

import ManagementDashboard from "./components/pages/Management/Dashboard";
import ManagementCustomerList from "./components/pages/Management/CustomerList";
import ManagementViewCustomer from "./components/pages/Management/ViewCustomer";
import ManagementCustomerOrders from "./components/pages/Management/CustomerOrders";
import ManagementRestaurantList from "./components/pages/Management/RestaurantList";
import ManagementViewRestaurant from "./components/pages/Management/ViewRestaurant";
import ManagementRestaurantOrders from "./components/pages/Management/RestaurantOrders";
import ManagementDeliveryAgentList from "./components/pages/Management/DeliveryAgentList";
import ManagementViewDeliveryAgent from "./components/pages/Management/ViewDeliveryAgent";
import ManagementDeliveryAgentOrders from "./components/pages/Management/DeliveryAgentOrders";
import ManagementOffersList from "./components/pages/Management/OffersList";
import ManagementNewOffer from "./components/pages/Management/NewOffer";
import { ManagementAuthContextProvider } from "./contexts/ManagementAuthContext";

import Login from "./pages/common/Login";
import OutletProvider from "./outlet/outletProvider";
import Signup from "./pages/customer/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />

        <Route
          path="customer"
          element={<OutletProvider endpoint="/customer" />}
        >
          {/* <Route index element={<CustomerDashboard />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<CustomerSignup />} />
          {/*<Route path="restaurants" element={<CustomerRestaurantList />} />
          <Route
            path="restaurant/:restaurantID"
            element={<CustomerViewRestaurant />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="order/:orderID" element={<CustomerOrderInfo />} />
          <Route path="*" element={<CustomerDashboard />} /> */}
        </Route>

        <Route
          path="restaurant"
          element={<OutletProvider endpoint="/restaurant" />}
        >
          {/* <Route index element={<RestaurantDashboard />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<RestaurantSignup />} />
          {/*<Route path="profile" element={<RestaurantProfile />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="order/:orderID" element={<RestaurantOrderInfo />} />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="newitem" element={<RestaurantNewItem />} />
          <Route path="*" element={<RestaurantDashboard />} /> */}
        </Route>

        <Route
          path="delivery-agent"
          element={<OutletProvider endpoint="/delivery-agent" />}
        >
          {/* <Route index element={<DeliveryAgentDashboard />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<DeliveryAgentSignup />} />
          {/* <Route path="profile" element={<DeliveryAgentProfile />} />
          <Route path="orders" element={<DeliveryAgentOrders />} />
          <Route path="order/:orderID" element={<DeliveryAgentOrderInfo />} />
          <Route path="*" element={<DeliveryAgentDashboard />} /> */}
        </Route>

        <Route
          path="management"
          element={<OutletProvider endpoint="/management" />}
        >
          {/* <Route index element={<ManagementDashboard />} /> */}
          <Route path="login" element={<Login />} />
          {/* <Route path="customers" element={<ManagementCustomerList />} />
          <Route
            path="customer/:customerID"
            element={<ManagementViewCustomer />}
          />
          <Route
            path="customer/:customerID/orders"
            element={<ManagementCustomerOrders />}
          />
          <Route path="restaurants" element={<ManagementRestaurantList />} />
          <Route
            path="restaurant/:restaurantID"
            element={<ManagementViewRestaurant />}
          />
          <Route
            path="restaurant/:restaurantID/orders"
            element={<ManagementRestaurantOrders />}
          />
          <Route
            path="delivery-agents"
            element={<ManagementDeliveryAgentList />}
          />
          <Route
            path="delivery-agent/:deliveryAgentID"
            element={<ManagementViewDeliveryAgent />}
          />
          <Route
            path="delivery-agent/:deliveryAgentID/orders"
            element={<ManagementDeliveryAgentOrders />}
          />
          <Route path="offers" element={<ManagementOffersList />} />
          <Route path="newoffer" element={<ManagementNewOffer />} />
          <Route path="*" element={<ManagementDashboard />} /> */}
        </Route>

        {/* <Route path="test" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
