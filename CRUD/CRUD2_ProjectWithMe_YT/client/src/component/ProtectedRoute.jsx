import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userAuth = localStorage.getItem("userAuth");
 const  authUser = JSON.parse(userAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser?.isLogin) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
