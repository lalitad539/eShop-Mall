import { Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import React from 'react';
import Cart from './Cart';
import { CartProvider } from "./CartContext";
import Checkout from "./Checkout";
import Navbar from './Navbar';
import Profile from "./Profile";


function App() {
  return (

    <div>
    <CartProvider>
    <Navbar/>

   <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    </CartProvider>
    </div>
  );
}

export default App;