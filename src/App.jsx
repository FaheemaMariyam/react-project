import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Products from "./pages/Products";

import './App.css'
import Hero from "./components/Hero";

function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products/>}/>
      </Routes>
    </BrowserRouter>
  );
}



export default App;