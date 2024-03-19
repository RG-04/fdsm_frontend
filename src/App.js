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
import Profile from "./components/pages/Customer/Profile";
import Orders from "./components/pages/Customer/Orders";
import { CustomerAuthContextProvider } from "./contexts/CustomerAuthContext";

import RestaurantLogin from './components/pages/Restaurant/Login';
import RestaurantSignup from './components/pages/Restaurant/SignUp';
import RestaurantDashboard from './components/pages/Restaurant/Dashboard';
import { RestaurantAuthContextProvider } from "./contexts/RestaurantAuthContext";

function App() {
  const customer_details = { name: "Dummy" };
  const restaurants_info = [
    {
      id: 1,
      name: "Restaurant Name 1",
      rating: 4.5,
      cuisine: "Italian",
      timings: "10:00 AM - 10:00 PM",
      imageSrc: "/imgs/restaurants/restaurant1.jpg",
    },
    {
      id: 2,
      name: "Restaurant Name 1",
      rating: 4.5,
      cuisine: "Italian",
      timings: "10:00 AM - 10:00 PM",
      imageSrc: "/imgs/restaurants/restaurant1.jpg",
    },
    {
      id: 3,
      name: "Restaurant Name 1",
      rating: 4.5,
      cuisine: "Italian",
      timings: "10:00 AM - 10:00 PM",
      imageSrc: "/imgs/restaurants/restaurant1.jpg",
    },
    {
      id: 4,
      name: "Restaurant Name 1",
      rating: 4.5,
      cuisine: "Italian",
      timings: "10:00 AM - 10:00 PM",
      imageSrc: "/imgs/restaurants/restaurant1.jpg",
    },
    {
      id: 5,
      name: "Restaurant Name 1",
      rating: 4.5,
      cuisine: "Italian",
      timings: "10:00 AM - 10:00 PM",
      imageSrc: "/imgs/restaurants/restaurant1.jpg",
    },
  ];

  const all_restaurants_menu = [
    {
      restaurant_id: 1,
      items: [
        {
          id: 1,
          name: "Pizza",
          price: 100,
        },
        {
          id: 2,
          name: "Burger",
          price: 50,
        },
        {
          id: 3,
          name: "Pasta",
          price: 150,
        },
        {
          id: 4,
          name: "Sandwich",
          price: 50,
        },
      ],
    },
  ];

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
          <Route
            path="restaurant/:restaurantID"
            element={<CustomerViewRestaurant />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<CustomerDashboard />} />
        </Route>

        <Route path="restaurant" element={<RestaurantAuthContextProvider />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="login" element={<RestaurantLogin />} />
          <Route path="signup" element={<RestaurantSignup />} />
          <Route path="*" element={<RestaurantDashboard />} />
        </Route>

        <Route path="management"></Route>

        <Route path="delivery"></Route>
      </Routes>
    </Router>
  );
}

export default App;
