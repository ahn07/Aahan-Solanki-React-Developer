import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";


interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  accentDark: string;
  text: string;
  textSecondary: string;
  border: string;
}

interface ThemeFonts {
  primary: string;
  heading: string;
}

interface ThemeSpacing {
  container: string;
  section: string;
  card: string;
}

interface Theme {
  name: string;
  layout: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
}

interface ThemeContextType {
  currentTheme: string;
  switchTheme: (theme: string) => void;
  theme: Theme;
  themes: Record<string, Theme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<string>("theme1");

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const switchTheme = (theme: string): void => {
    setCurrentTheme(theme);
    localStorage.setItem("selectedTheme", theme);
  };

  const themes: Record<string, Theme> = {
    theme1: {
      name: "Minimalist",
      layout: "default",
      colors: {
        primary: "bg-white",
        secondary: "bg-gray-100",
        accent: "bg-blue-600",
        accentDark: "bg-blue-800",
        text: "text-gray-900",
        textSecondary: "text-gray-600",
        border: "border-gray-200",
      },
      fonts: {
        primary: "font-sans",
        heading: "font-semibold",
      },
      spacing: {
        container: "max-w-6xl mx-auto px-4",
        section: "py-12",
        card: "p-6",
      },
    },
    theme2: {
      name: "Dark Sidebar",
      layout: "sidebar",
      colors: {
        primary: "bg-gray-900",
        secondary: "bg-gray-800",
        accent: "bg-purple-600",
        accentDark: "bg-purple-800",
        text: "text-white",
        textSecondary: "text-gray-300",
        border: "border-gray-700",
      },
      fonts: {
        primary: "font-serif",
        heading: "font-bold",
      },
      spacing: {
        container: "max-w-5xl mx-auto px-6",
        section: "py-16",
        card: "p-8",
      },
    },
    theme3: {
      name: "Colorful",
      layout: "grid",
      colors: {
        primary: "bg-gradient-to-br from-pink-100 to-blue-100",
        secondary: "bg-white",
        accent: "bg-gradient-to-r from-pink-500 to-orange-500",
        accentDark: "bg-gradient-to-r from-pink-600 to-orange-600",
        text: "text-gray-800",
        textSecondary: "text-gray-600",
        border: "border-pink-200",
      },
      fonts: {
        primary: "font-mono",
        heading: "font-extrabold",
      },
      spacing: {
        container: "max-w-7xl mx-auto px-8",
        section: "py-20",
        card: "p-10",
      },
    },
  };

  const theme: Theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme, theme, themes }}>
      <div className={`${theme.colors.text} ${theme.fonts.primary} transition-all duration-500`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};