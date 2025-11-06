import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserData } from "./context/UserContext";

// 1. Import all your new pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Reels from "./pages/Reels";
import Navbar from "./components/Navbar";
import EventDetail from "./pages/EventDetail";
import CategoryDetail from "./pages/CategoryDetail";
import DetailBlog from "./pages/DetailBlog";
import Payment from "./pages/Payment";
import SurprisePayment from "./pages/SurprisePayment";
import Surprise from "./pages/Surprise";
// import { LoadingBig } from "./components/Loading";
// You'll need a loading component
import { PageLoader } from "./components/LoadingSpinner";
import SnapAuth from "./pages/SnapAuth";
import Snap from "./pages/Snap";
import Register from "./pages/Registration"


const App = () => {
  // 2. Get 'loading' state from your context
  // (You should add 'loading' to your UserContext to prevent flickering)
  const { isAuth, loading } = UserData();

  // 3. Add a loading check
  if (loading) {
    // return (
    //   <div className="flex h-screen items-center justify-center">
    //     Loading...
    //     <LoadingSpinner/>
    //   </div>
    // );
    return <PageLoader />;
  }

  return (
    <>
   
        {/* 4. Render Navbar ONCE if authenticated */}
        {isAuth && <Navbar />}
 
        <Routes>
   
          <Route
            path="/login"
            element={!isAuth ? <Login /> : <Navigate to="/" />}
          />
           <Route
            path="/signup"
            element={!isAuth ? <Register /> : <Navigate to="/" />}
          />

          <Route
            path="/verify"
            element={!isAuth ? <Verify /> : <Navigate to="/" />}
          />

          {/* 5. Protect all your new routes */}
          <Route
            path="/"
            element={isAuth ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={isAuth ? <Search /> : <Navigate to="/login" />}
          />
          <Route
            path="/reels"
            element={isAuth ? <Reels /> : <Navigate to="/login" />}
          />
          <Route
            path="/event/:id"
            element={isAuth ? <EventDetail /> : <Navigate to="/login" />}
          />
          <Route
            path="/blog/:id"
            element={isAuth ? <DetailBlog /> : <Navigate to="/login" />}
          />

          <Route
            path="/payment/:id"
            element={isAuth ? <Payment /> : <Navigate to="/login" />}
          />

          <Route
            path="/payment/surprise"
            element={isAuth ? <SurprisePayment /> : <Navigate to="/login" />}
          />
          <Route
            path="/surprise"
            element={isAuth ? <Surprise /> : <Navigate to="/login" />}
          />

          {/* 6. Fallback route */}
          <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />

          <Route
            path="/category/:categoryName"
            element={isAuth ? <CategoryDetail /> : <Navigate to="/login" />}
          />

          <Route
            path="/snap/auth"
            element={isAuth ? <SnapAuth /> : <Navigate to="/login" />}
          />

          <Route
            path="/snap/view"
            element={isAuth ? <Snap /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to={isAuth ? "/" : "/login"} />} />
        </Routes>

    </>
  );
};

export default App;
