"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  middleColor: string;
  setMiddleColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  mounted: boolean;
};

const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
  primaryColor: "#0A0F1C",
  setPrimaryColor: () => {},
  middleColor: "#1B2341",
  setMiddleColor: () => {},
  secondaryColor: "#2D3867",
  setSecondaryColor: () => {},
  mounted: false,
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(defaultThemeContext.theme);
  const [primaryColor, setPrimaryColor] = useState(defaultThemeContext.primaryColor);
  const [middleColor, setMiddleColor] = useState(defaultThemeContext.middleColor);
  const [secondaryColor, setSecondaryColor] = useState(defaultThemeContext.secondaryColor);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--middle-color', middleColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }
  }, [mounted, theme, primaryColor, middleColor, secondaryColor]);

  const value = {
    theme,
    setTheme,
    primaryColor,
    setPrimaryColor,
    middleColor,
    setMiddleColor,
    secondaryColor,
    setSecondaryColor,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}