import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import { UserData } from "./context/UserContext";
import Upload from "./pages/Upload";
import Photos from "./components/Photos";
import Videos from "./components/Videos";
import Reels from "./components/Reels";
import { PageLoader } from "./components/LoadingSpinner";
import DetailBlog from "./components/DetailBlog";
import Profile from "./pages/Profile";
import EditBlog from "./pages/EditBlog";

const App = () => {
  const { isAuth, loading } = UserData();
  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
        <Route path="/upload" element={isAuth ? <Upload /> : <Login />} />
        <Route path="/photos" element={isAuth ? <Photos /> : <Login />} />
        <Route path="/Videos" element={isAuth ? <Videos /> : <Login />} />
        <Route path="/reels" element={isAuth ? <Reels /> : <Login />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Login />} />
        <Route
          path="/blog/:id"
          element={isAuth ? <DetailBlog /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={isAuth ? <EditBlog /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
