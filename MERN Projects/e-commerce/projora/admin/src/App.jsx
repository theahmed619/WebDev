import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserData } from "./context/UserContext";

// 1. Import Admin Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile"
// 2. Import NEW Project Pages
import Projects from "./pages/Projects"; 
import DetailProject from "./pages/DetailProject";
import EditProject from "./pages/EditProject";
import SearchPage from "./pages/Search";

// 3. Import NEW Loader
import { PageLoader } from "./components/Loader"; 

const App = () => {
  const { isAuth, loading } = UserData();
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>
        {/* --- Public Auth Routes --- */}
        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to="/" />} />
        <Route path="/verify" element={!isAuth ? <Verify /> : <Navigate to="/" />} />

        {/* --- Protected Admin Routes --- */}
        <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/upload" element={isAuth ? <Upload /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
           <Route path="/search" element={isAuth ? <SearchPage /> : <Navigate to="/login" />} />

        
        {/* --- 4. Use NEW Project Routes --- */}
        <Route
          path="/projects"
          element={isAuth ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="/project/:id"
          element={isAuth ? <DetailProject /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={isAuth ? <EditProject /> : <Navigate to="/login" />}
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;