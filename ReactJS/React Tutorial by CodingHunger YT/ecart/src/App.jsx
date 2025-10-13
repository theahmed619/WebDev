import { useState } from "react";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { Routes , Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'

function App() {
  return <>
    <Navbar/>
 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
   
  </>;
}

export default App;
