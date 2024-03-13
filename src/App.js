import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import CustomerLogin from './components/pages/Customer/Login';
// import RestaurantLogin from './components/pages/Restaurant/Login';
// import DeliveryAgentLogin from './components/pages/DeliveryAgent/Login';
// import AdminLogin from './components/pages/Admin/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route path="/Customer/Login" element={<CustomerLogin/>} />
        {/* <Route path="/Restaurant/Login" element={<RestaurantLogin/>} />
        <Route path="/DeliveryAgent/Login" element={<DeliveryAgentLogin/>} />
        <Route path="/Admin/Login" element={<AdminLogin/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
