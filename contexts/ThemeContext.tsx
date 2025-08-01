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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const switchTheme = (theme: string): void => {
    setCurrentTheme(theme);
    localStorage.setItem("selectedTheme", theme);
    setIsSidebarOpen(false); // Close sidebar on theme switch
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
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
      <div className={`${theme.colors.text} ${theme.fonts.primary} transition-all duration-500 min-h-screen flex`}>
        {theme.layout === "sidebar" && (
          <>
            {/* Sidebar */}
            <aside
              className={`fixed inset-y-0 left-0 z-50 w-64 ${theme.colors.secondary} transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out md:translate-x-0 ${theme.colors.border} border-r`}
            >
              <div className="p-6">
                <h2 className={`text-2xl ${theme.fonts.heading} ${theme.colors.text} mb-6`}>Navigation</h2>
                <nav className="space-y-4">
                  <a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent} block`}>
                    Home
                  </a>
                  <a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent} block`}>
                    Products
                  </a>
                  <a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent} block`}>
                    About
                  </a>
                  <a href="#" className={`${theme.colors.textSecondary} hover:${theme.colors.accent} block`}>
                    Contact
                  </a>
                </nav>
              </div>
            </aside>
            {/* Mobile Sidebar Toggle */}
            <button
              className={`md:hidden fixed top-4 left-4 z-50 ${theme.colors.accent} text-white p-2 rounded-lg`}
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? "✕" : "☰"}
            </button>
            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={toggleSidebar}
                aria-hidden="true"
              />
            )}
          </>
        )}
        {/* Main Content */}
        <main
          className={`flex-1 ${theme.layout === "sidebar" ? "md:ml-64" : ""} ${theme.colors.primary} transition-all duration-500`}
        >
          {children}
        </main>
      </div>
    </ThemeContext.Provider>
  );
};