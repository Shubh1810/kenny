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
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState("#0A0F1C");
  const [middleColor, setMiddleColor] = useState("#1B2341");
  const [secondaryColor, setSecondaryColor] = useState("#2D3867");

  useEffect(() => {
    // Apply theme colors to document root or body
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--middle-color', middleColor);
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, primaryColor, middleColor, secondaryColor]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      primaryColor,
      setPrimaryColor,
      middleColor,
      setMiddleColor,
      secondaryColor,
      setSecondaryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 