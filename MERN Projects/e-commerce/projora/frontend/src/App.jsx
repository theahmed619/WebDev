import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserData } from "./context/UserContext";

// --- 1. Import Projora Pages ---
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { PageLoader } from "./components/Loader";

// --- 2. Import New Project/E-commerce Pages ---
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectsByCategory from "./pages/ProjectsByCategory";
import Search from "./pages/Search"; // This is correct
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";

const App = () => {
  const { isAuth, loading } = UserData();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {isAuth && <Navbar />}

      <Routes>
        {/* --- Auth Routes (Public-only) --- */}
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />

        {/* --- Protected Routes (Auth-only) --- */}
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isAuth ? <Profile /> : <Navigate to="/login" />}
        />
        
        {/* --- New Projora Routes --- */}
        <Route
          path="/projects"
          element={isAuth ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/project/:id"
          element={isAuth ? <ProjectDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/projects/category/:categoryName"
          element={isAuth ? <ProjectsByCategory /> : <Navigate to="/login" />}
        />
        
        {/* --- CRITICAL FIX: Moved and corrected the Search route --- */}
        <Route
          path="/search"
          element={isAuth ? <Search /> : <Navigate to="/login" />}
        />

        <Route
          path="/legal"
          element={isAuth ? <Legal /> : <Navigate to="/login" />}
        />
         <Route
          path="/contact-us"
          element={isAuth ? <Contact /> : <Navigate to="/login" />}
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;