import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/pages/Home';
import CustomerLogin from './components/pages/Customer/Login';
import CustomerSignup from './components/pages/Customer/SignUp';
import CustomerDashboard from './components/pages/Customer/Dashboard';
import CustomerRestaurantList from './components/pages/Customer/RestaurantList';
import CustomerViewRestaurant from './components/pages/Customer/ViewRestaurant';
import Cart from './components/pages/Customer/Cart';
import Profile from './components/pages/Customer/Profile';
import Orders from './components/pages/Customer/Orders';

import RestaurantLogin from './components/pages/Restaurant/Login';
import RestaurantSignup from './components/pages/Restaurant/SignUp';
import RestaurantDashboard from './components/pages/Restaurant/Dashboard';

function App() {

  const customer_details = {name: "Dummy"}
  const restaurants_info = [
                            {
                              id: 1,
                              name: 'Restaurant Name 1',
                              rating: 4.5,
                              cuisine: 'Italian',
                              timings: '10:00 AM - 10:00 PM',
                              imageSrc: '/imgs/restaurants/restaurant1.jpg'
                            },
                            {
                              id: 2,
                              name: 'Restaurant Name 1',
                              rating: 4.5,
                              cuisine: 'Italian',
                              timings: '10:00 AM - 10:00 PM',
                              imageSrc: '/imgs/restaurants/restaurant1.jpg'
                            },
                            {
                              id: 3,
                              name: 'Restaurant Name 1',
                              rating: 4.5,
                              cuisine: 'Italian',
                              timings: '10:00 AM - 10:00 PM',
                              imageSrc: '/imgs/restaurants/restaurant1.jpg'
                            },
                            {
                              id: 4,
                              name: 'Restaurant Name 1',
                              rating: 4.5,
                              cuisine: 'Italian',
                              timings: '10:00 AM - 10:00 PM',
                              imageSrc: '/imgs/restaurants/restaurant1.jpg'
                            },
                            {
                              id: 5,
                              name: 'Restaurant Name 1',
                              rating: 4.5,
                              cuisine: 'Italian',
                              timings: '10:00 AM - 10:00 PM',
                              imageSrc: '/imgs/restaurants/restaurant1.jpg'
                            }
                          ];

  const all_restaurants_menu = [
                            {
                              restaurant_id: 1,
                              items: [
                                {
                                  id: 1,
                                  name: 'Pizza',
                                  price: 100
                                },
                                {
                                  id: 2,
                                  name: 'Burger',
                                  price: 50
                                },
                                {
                                  id: 3,
                                  name: 'Pasta',
                                  price: 150
                                },
                                {
                                  id: 4,
                                  name: 'Sandwich',
                                  price: 50
                                }
                              ]
                            },
                          ];  

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route path="/Customer/Login" element={<CustomerLogin/>} />
        <Route path="/Customer/SignUp" element={<CustomerSignup/>} />
        <Route path="/Customer/Dashboard" element={<CustomerDashboard customer_details={customer_details}/>} />
        <Route path="/Customer/RestaurantList" element={<CustomerRestaurantList all_restaurants_info={restaurants_info}/>} />
        <Route path="/Customer/ViewRestaurant/:restaurantID" element={<CustomerViewRestaurant all_restaurants_info={restaurants_info} all_restaurants_menu={all_restaurants_menu}/>} />
        <Route path="/Customer/Cart" element={<Cart all_restaurants_info={restaurants_info}/>} />
        <Route path="/Customer/Profile" element={<Profile customer_details={customer_details}/>} />
        <Route path="/Customer/Orders" element={<Orders/>} />

        <Route path="/Restaurant/Login" element={<RestaurantLogin/>} />
        <Route path="/Restaurant/SignUp" element={<RestaurantSignup/>} />
        <Route path="/Restaurant/Dashboard" element={<RestaurantDashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
