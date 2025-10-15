import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const PeotectedRoute = ({element}) => {


  const cartItems =useSelector((state)=>state.cart.cart)

  
  return cartItems.length >0 ? element : <Navigate to="/"/>;
}

export default PeotectedRoute