"use client";

import { THEMES } from "@/types/theme";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: THEMES;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type BasicComponentProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<BasicComponentProps> = ({ children }) => {
  const [theme, setTheme] = useState<THEMES>(THEMES.light);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as THEMES | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = stored || (prefersDark ? THEMES.dark : THEMES.light);
    setTheme(initialTheme);
    document.documentElement.classList.toggle(THEMES.dark, initialTheme === THEMES.dark);
  }, []);

  const toggleTheme = (themeType?: THEMES) => {
    if (themeType) {
        setTheme(themeType);
    }
    const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle(THEMES.dark, newTheme === THEMES.dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
