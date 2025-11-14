import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserData } from "./context/UserContext";

// --- Import all pages ---
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { PageLoader } from "./components/Loader";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectsByCategory from "./pages/ProjectsByCategory";
import Search from "./pages/Search";
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";
import SelectTech from "./pages/SelectTech";

const App = () => {
  const { isAuth, loading } = UserData();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* 1. Navbar is now OUTSIDE the isAuth check, so it always shows */}
      <Navbar />

      <Routes>
        {/* --- Auth Routes (Only for logged-out users) --- */}
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />

        {/* --- 2. PUBLIC Routes (Everyone can see these) --- */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route
          path="/projects/category/:categoryName"
          element={<ProjectsByCategory />}
        />
        <Route path="/search" element={<Search />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/select-tech" element={<SelectTech />} />

        {/* --- 3. PROTECTED Route (Only for logged-in users) --- */}
        <Route
          path="/profile"
          element={isAuth ? <Profile /> : <Navigate to="/login" />}
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;