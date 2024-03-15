import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CustomerLogin from './components/pages/Customer/Login';
// import RestaurantLogin from './components/pages/Restaurant/Login';
// import DeliveryAgentLogin from './components/pages/DeliveryAgent/Login';
// import AdminLogin from './components/pages/Admin/Login';
import CustomerSignup from './components/pages/Customer/SignUp';
import CustomerDashboard from './components/pages/Customer/Dashboard';
import CustomerRestaurantList from './components/pages/Customer/RestaurantList';

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
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route path="/Customer/Login" element={<CustomerLogin/>} />
        {/* <Route path="/Restaurant/Login" element={<RestaurantLogin/>} />
        <Route path="/DeliveryAgent/Login" element={<DeliveryAgentLogin/>} />
        <Route path="/Admin/Login" element={<AdminLogin/>} /> */}
        <Route path="/Customer/SignUp" element={<CustomerSignup/>} />
        {/* <Route path="Restaurant/SignUp" element={<CustomerLogin/>} />
        <Route path="DeliveryAgent/SignUp" element={<CustomerLogin/>} />
        <Route path="Admin/SignUp" element={<CustomerLogin/>} /> */}
        <Route path="/Customer/Dashboard" element={<CustomerDashboard customer_details={customer_details}/>} />
        <Route path="/Customer/RestaurantList" element={<CustomerRestaurantList all_restaurants_info={restaurants_info}/>} />
      </Routes>
    </Router>
  );
}

export default App;
