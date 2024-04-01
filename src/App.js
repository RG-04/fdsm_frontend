import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/common/Home";

import CustomerSignup from "./pages/customer/Signup";
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerViewRestaurant from "./pages/customer/ViewRestaurant";
import CustomerProfile from "./pages/customer/Profile";
import Cart from "./pages/customer/Cart";

import RestaurantSignup from "./pages/restaurant/Signup";
import RestaurantProfile from "./pages/restaurant/Profile";
import RestaurantDashboard from "./pages/restaurant/Dashboard";
import RestaurantMenu from "./pages/restaurant/Menu";
import RestaurantNewItem from "./pages/restaurant/NewItem";

import DeliveryAgentSignup from "./pages/deliveryAgent/Signup";
import DeliveryAgentProfile from "./pages/deliveryAgent/Profile";
import DeliveryAgentDashboard from "./pages/deliveryAgent/Dashboard";

import ManagementProfile from "./pages/management/Profile";
import ManagementDashboard from "./pages/management/Dashboard";
import ManagementViewRestaurant from "./pages/management/ViewRestaurant";
import ManagementCustomerList from "./pages/management/CustomerList";
import ManagementDeliveryAgentList from "./pages/management/DeliveryAgentList";
import ViewDeliveryAgent from "./pages/management/ViewDeliveryAgent";
import ManagementOffersList from "./pages/management/OffersList";
import ManagementNewOffer from "./pages/management/NewOffer";

import Login from "./pages/common/Login";
import OutletProvider from "./outlet/outletProvider";
import RestaurantList from "./pages/common/RestaurantList";
import Orders from "./pages/common/Orders";
import OrderInfo from "./pages/common/OrderInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="customer"
          element={<OutletProvider endpoint="/customer" />}
        >
          <Route index element={<CustomerDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<CustomerSignup />} />
          <Route path="restaurants" element={<RestaurantList />} />
          <Route
            path="restaurant/:restaurantID"
            element={<CustomerViewRestaurant />}
          />
          <Route
            path="recommendations"
            element={<RestaurantList showRecommended={true} />}
          />
          <Route
            path="favourites"
            element={<RestaurantList showFavourites={true} />}
          />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<OrderInfo />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route
          path="restaurant"
          element={<OutletProvider endpoint="/restaurant" />}
        >
          <Route index element={<RestaurantDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<RestaurantSignup />} />
          <Route path="profile" element={<RestaurantProfile />} />
          <Route path="order/:id" element={<OrderInfo />} />
          <Route path="orders" element={<Orders />} />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="newitem" element={<RestaurantNewItem />} />
        </Route>

        <Route
          path="delivery-agent"
          element={<OutletProvider endpoint="/delivery-agent" />}
        >
          <Route index element={<DeliveryAgentDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<DeliveryAgentSignup />} />
          <Route path="profile" element={<DeliveryAgentProfile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<OrderInfo />} />
        </Route>

        <Route
          path="management"
          element={<OutletProvider endpoint="/management" />}
        >
          <Route index element={<ManagementDashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ManagementProfile />} />
          <Route path="customers" element={<ManagementCustomerList />} />
          <Route
            path="customer/:id/orders"
            element={<Orders userType="customer" />}
          />

          <Route path="restaurants" element={<RestaurantList />} />
          <Route
            path="restaurant/:restaurantID"
            element={<ManagementViewRestaurant />}
          />
          <Route
            path="restaurant/:id/orders"
            element={<Orders userType="restaurant" />}
          />
          <Route
            path="delivery-agents"
            element={<ManagementDeliveryAgentList />}
          />
          <Route path="delivery-agent/:id" element={<ViewDeliveryAgent />} />
          <Route
            path="delivery-agent/:id/orders"
            element={<Orders userType="deliverer" />}
          />

          <Route path="offers" element={<ManagementOffersList />} />
          <Route path="newoffer" element={<ManagementNewOffer />} />
        </Route>

        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
