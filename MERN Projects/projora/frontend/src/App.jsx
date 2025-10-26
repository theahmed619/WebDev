import React, { useCallback, useContext } from 'react'
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { userDataContext } from './context/UserContext'

const App = () => {
  let {userData} = useContext(userDataContext)
  return (
    <>
{userData && <Nav/>}
      <Routes>
        <Route path="/signup" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
