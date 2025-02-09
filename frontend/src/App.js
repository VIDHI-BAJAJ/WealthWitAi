import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import About from './component/About';
import Contact from './component/Contact';
import { AuthProvider } from './component/AuthContext'; 
import { StockProvider } from './component/StockContext';
import Navbar from './component/Navbar';
import Aiprediction from './component/Aiprediction';
import Landing from './component/Landing';
import StockMarket from "./component/StockMarketSurvey";
import Profile from "./component/Profile";
import ProfileImage from "./component/ProfileImage";
import Input from "./component/Input.js";
import StockCrypto from './component/StockCrypto.js';
import InvestmentMetrics from './component/InvestmentMetrics.js';
import Market from './component/Market.js';
const App = () => {
  return (
    <AuthProvider>
    <StockProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/Aiprediction" element={<Aiprediction/>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/stockmarket" element={<StockMarket />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/profileimage" element={<ProfileImage />}/>
          <Route path ="/input" element = {<Input/>}/>
          <Route path ="/stockcrypto" element = {<StockCrypto/>}/>
          <Route path ="/investmentmetrics" element = {<InvestmentMetrics/>}/>
          <Route path ="/market" element = {<Market/>}/>
        </Routes>
      </Router>
    </StockProvider>
    </AuthProvider>
  );
};

export default App;
