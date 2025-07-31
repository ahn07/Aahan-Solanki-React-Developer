
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ProductCard from "../components/ProductCard";


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

// Define type for product (based on Fake Store API structure)
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// LoadingSpinner Component
const LoadingSpinner: React.FC = () => {
  const { theme } = useTheme() as ThemeContextType;
  return (
    <div
      className={`${theme.spacing.container} flex justify-center items-center min-h-screen`}
    >
      <div
        className={`relative w-20 h-20`}
        role="status"
        aria-label="Loading products"
      >
        <div
          className={`absolute inset-0 border-4 border-t-transparent ${theme.colors.accent} rounded-full animate-spin-slow`}
        />
        <div
          className={`absolute inset-2 border-4 border-r-transparent ${theme.colors.accent} rounded-full animate-spin opacity-50`}
        />
        <div
          className={`absolute inset-4 bg-gradient-to-r ${theme.colors.accent} rounded-full animate-pulse scale-75`}
        />
      </div>
    </div>
  );
};

// Home Component
const Home: React.FC = () => {
  const { theme } = useTheme() as ThemeContextType;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=6"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div
        className={`${theme.spacing.container} ${theme.spacing.section} text-center text-red-500`}
      >
        Error: {error}
      </div>
    );

  return (
    <div
      className={`${theme.colors.primary} w-full min-h-screen transition-all duration-500`}
    >
      {/* Hero Section */}
      <section
        className={`${theme.spacing.section} ${theme.spacing.container}`}
      >
        <div className="text-center">
          <h1
            className={`text-4xl md:text-6xl ${theme.fonts.heading} ${theme.colors.text} mb-6 transition-all duration-500`}
          >
            Welcome to ThemeApp
          </h1>
          <p
            className={`text-lg md:text-xl ${theme.colors.textSecondary} mb-8 max-w-2xl mx-auto transition-all duration-500`}
          >
            Experience the power of dynamic theming with our multi-theme
            switcher. Choose from minimalist, dark sidebar, or colorful card
            layouts.
          </p>
          <button
            className={`${theme.colors.accent} text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`${theme.spacing.section} ${theme.spacing.container}`}
      >
        <h2
          className={`text-3xl ${theme.fonts.heading} ${theme.colors.text} text-center mb-12 transition-all duration-500`}
        >
          Featured Products
        </h2>

        <div
          className={`grid gap-6 ${
            theme.layout === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : theme.layout === "sidebar"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          } transition-all duration-500`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section
        className={`${theme.spacing.section} ${theme.spacing.container}`}
      >
        <div
          className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
        >
          <h3
            className={`text-2xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}
          >
            Theme Features
          </h3>
          <ul className={`${theme.colors.textSecondary} space-y-2`}>
            <li>• Persistent theme selection with localStorage</li>
            <li>• Responsive design across all devices</li>
            <li>• Smooth animations and transitions</li>
            <li>• Multiple layout structures</li>
            <li>• Dynamic font and color schemes</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
