import React, { useCallback, useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Nav from "./components/Nav";
import About from "./pages/About";
import { userDataContext } from "./context/UserContext";
import Collections from "./pages/Collections";

const App = () => {
  let { userData } = useContext(userDataContext);
  let location = useLocation();
  return (
    <>
      {userData && <Nav />}
      <Routes>
        <Route
          path="/login"
          element={userData ? <Navigate to={"/"} /> : <Login />}
        />

        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path="/"
          element={
            userData ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/collection"
          element={
            userData ? (
              <Collections />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
