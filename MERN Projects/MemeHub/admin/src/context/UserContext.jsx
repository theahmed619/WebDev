import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, navigate) {
    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/admin/login`,
        { email }
      );

      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
      setBtnLoading(false);
    } catch (error) {
    console.log(error);

    // --- THIS IS THE FIX ---
    if (error.response) {
      // The server sent back an error (like 403, 404)
      toast.error(error.response.data.message);
    } else if (error.code === "ERR_NETWORK") {
      // The server is offline
      toast.error("Network Error: Could not connect to server.");
    } else {
      // Any other kind of error
      toast.error(error.message);
    }
    
    setBtnLoading(false);
    }
  }

  async function verifyUser(otp, navigate, fetchChats) {
    const verifyToken = localStorage.getItem("verifyToken");
    setBtnLoading(true);

    if (!verifyToken) return toast.error("Please give token");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/admin/verify`,
        {
          otp,
          verifyToken,
        }
      );

      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      navigate("/");
      setBtnLoading(false);
      setIsAuth(true);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  const logoutHandler = (navigate) => {
    localStorage.clear();

    toast.success("logged out");
    setIsAuth(false);
    setUser([]);
    navigate("/login");
  };

  async function fetchUser() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/admin/me`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <UserContext.Provider
      value={{
        loginUser,
        isAuth,
        setIsAuth,
        user,
        verifyUser,
        logoutHandler,
        btnLoading,
        loading,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
