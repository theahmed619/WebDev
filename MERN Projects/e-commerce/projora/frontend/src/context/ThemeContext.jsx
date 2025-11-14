import React, { createContext, useContext, useEffect, useState } from 'react';


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState(() => {
if (typeof window !== 'undefined') return localStorage.getItem('theme') || 'light';
return 'light';
});


useEffect(() => {
localStorage.setItem('theme', theme);
document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);


const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));


return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
{children}
</ThemeContext.Provider>
);
};


export const useTheme = () => useContext(ThemeContext);