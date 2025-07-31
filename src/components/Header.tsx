
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

// Define types for the theme context (matching ThemeProvider)
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

const Header: React.FC = () => {
  const { currentTheme, switchTheme, theme, themes } = useTheme() as ThemeContextType;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  const handleThemeChange = (themeKey: string): void => {
    switchTheme(themeKey);
    setIsDropdownOpen(false);
  };

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${theme.colors.secondary} ${theme.colors.border} border-b transition-all duration-500`}
    >
      <div className={theme.spacing.container}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`md:text-xl text-sm ${theme.fonts.heading} ${theme.colors.text} hover:opacity-80 transition-opacity`}
          >
            ThemeApp
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                theme.colors.text
              } hover:opacity-80 transition-opacity ${
                isActive("/") ? "border-b-2 border-current" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                theme.colors.text
              } hover:opacity-80 transition-opacity ${
                isActive("/about") ? "border-b-2 border-current" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                theme.colors.text
              } hover:opacity-80 transition-opacity ${
                isActive("/contact") ? "border-b-2 border-current" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${theme.colors.accent} text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center space-x-2 min-w-[140px] justify-between`}
              >
                <span className="text-sm font-medium text-white">
                  {themes[currentTheme].name}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown when clicking outside */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>

                  <div
                    className={`absolute right-0 mt-2 w-48 ${theme.colors.secondary} rounded-lg shadow-xl ${theme.colors.border} border overflow-hidden z-20 transform transition-all duration-200 origin-top-right`}
                  >
                    {Object.entries(themes).map(([key, themeOption]) => (
                      <button
                        key={key}
                        onClick={() => handleThemeChange(key)}
                        className={`w-full text-left px-4 py-3 transition-colors duration-200 flex items-center justify-between group ${
                          currentTheme === key
                            ? `${theme.colors.accent} text-white`
                            : `${theme.colors.text} hover:bg-gray-100 hover:bg-opacity-10`
                        }`}
                      >
                        <span className="font-medium text-white">
                          {themeOption.name}
                        </span>
                        {currentTheme === key && (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden text-white ${theme.colors.text} hover:opacity-80 transition-opacity`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden ${theme.colors.secondary} border-t ${theme.colors.border} py-4`}
          >
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${
                  theme.colors.text
                } hover:opacity-80 transition-opacity ${
                  isActive("/") ? "font-semibold" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${
                  theme.colors.text
                } hover:opacity-80 transition-opacity ${
                  isActive("/about") ? "font-semibold" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`${
                  theme.colors.text
                } hover:opacity-80 transition-opacity ${
                  isActive("/contact") ? "font-semibold" : ""
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;