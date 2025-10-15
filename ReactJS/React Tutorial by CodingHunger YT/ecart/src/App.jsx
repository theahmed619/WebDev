import { useState } from "react";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./components/ProductDetails/ProductDetail";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
