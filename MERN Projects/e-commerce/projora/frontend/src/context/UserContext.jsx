import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // State for forms (login/register buttons)
  const [btnLoading, setBtnLoading] = useState(false);
  
  // State for user data (will include purchasedProjects)
  const [user, setUser] = useState(null); // Use null as default
  
  // State for auth status
  const [isAuth, setIsAuth] = useState(false);
  
  // State for initial page load (to prevent flicker)
  const [loading, setLoading] = useState(true);

  // Get server URL from .env
  const server = import.meta.env.VITE_SERVER;

  // Email/Password Registration
  async function registerWithEmail(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/registration`,
        { name, email, password }
      );

      toast.success(data.message || "Registration successful!");
      localStorage.setItem("token", data.token); // Save token
      setUser(data.user); // Set user state (includes purchasedProjects)
      setIsAuth(true); // Set auth state
      navigate("/"); // Redirect to home
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // Email/Password Login
  async function loginWithEmail(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message || "Login successful!");
      localStorage.setItem("token", data.token); // Save token
      setUser(data.user); // Set user state (includes purchasedProjects)
      setIsAuth(true); // Set auth state
      navigate("/"); // Redirect to home
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // --- CRITICAL UPDATE HERE ---
  // Google Login (now sends googleId to match backend)
  async function loginWithGoogle(googleUser, navigate) {
    // googleUser should be { name, email, googleId } from Firebase
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/googleLogin`, {
        name: googleUser.name,
        email: googleUser.email,
        googleId: googleUser.googleId, // <-- ADDED THIS
      });

      toast.success(data.message || "Login successful!");
      localStorage.setItem("token", data.token); // Save token
      setUser(data.user); // Set user state (includes purchasedProjects)
      setIsAuth(true); // Set auth state
      navigate("/"); // Redirect to home
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Google login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  // Fetches the currently logged-in user
  async function getCurrentUser() {
    setLoading(true); // Start loading
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false); // No token, stop loading
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: { token }, // Send token
      });

      setIsAuth(true);
      setUser(data); // The /me route returns the full user object (with purchasedProjects)
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setUser(null);
      localStorage.removeItem("token"); // Remove invalid token
    } finally {
      setLoading(false); // Done loading
    }
  }

  // Logout Handler
  const logoutHandler = (navigate) => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setIsAuth(false);
    setUser(null);
    navigate("/login");
  };

  // useEffect to fetch user on initial app load
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuth,
        user,
        loading,
        btnLoading,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logoutHandler,
        getCurrentUser, // Exported to be used for refreshing data
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const UserData = () => useContext(UserContext);