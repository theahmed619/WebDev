import React from "react";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
