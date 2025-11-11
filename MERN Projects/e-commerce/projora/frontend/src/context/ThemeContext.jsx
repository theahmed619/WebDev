import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Create the new context
const ThemeContext = createContext();

// 2. Create the provider component
export const ThemeProvider = ({ children }) => {
  // It reads from localStorage first, or defaults to "dark"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // This effect runs when the 'theme' state changes
  useEffect(() => {
    const root = document.documentElement; // This is the <html> tag
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create and export the custom hook
export const useTheme = () => useContext(ThemeContext);