import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CustomerLogin from './components/pages/Customer/Login';
// import RestaurantLogin from './components/pages/Restaurant/Login';
// import DeliveryAgentLogin from './components/pages/DeliveryAgent/Login';
// import AdminLogin from './components/pages/Admin/Login';
import CustomerSignup from './components/pages/Customer/SignUp';
import CustomerDashboard from './components/pages/Customer/Dashboard';


function App() {

  const customer_details = {name: "Dummy"}


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
      </Routes>
    </Router>
  );
}

export default App;
