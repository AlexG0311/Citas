// src/context/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  
  const [theme, setTheme] = useState(() => {
    // Si hay tema guardado en localStorage, úsalo. Si no, claro por defecto
    return localStorage.getItem("theme") || "light";
    
  });

  // Cuando cambia el tema, actualiza el DOM y guarda en localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook para consumir el contexto fácilmente
export function useTheme() {
  return useContext(ThemeContext);
}
