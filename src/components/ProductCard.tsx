
import React from "react";
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

// Define types for the product prop
interface Product {
  image?: string;
  title: string;
  price: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { theme } = useTheme() as ThemeContextType;

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className={`${theme.colors.secondary} rounded-lg ${theme.colors.border} border overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
    >
      <div className="aspect-w-16 aspect-h-12 bg-gray-100">
        <img
          src={product.image || "/placeholder.svg?height=200&width=300"}
          alt={product.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      <div className={theme.spacing.card}>
        <div className="flex items-start justify-between mb-2">
          <h3
            className={`text-lg ${theme.fonts.heading} ${theme.colors.text} flex-1 mr-2`}
          >
            {truncateText(product.title, 50)}
          </h3>
          <span
            className={`${theme.colors.accent} text-white px-2 py-1 rounded text-sm font-semibold`}
          >
            ${product.price}
          </span>
        </div>

        <p
          className={`${theme.colors.textSecondary} text-sm mb-4 line-clamp-3`}
        >
          {truncateText(product.description, 120)}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.rate)
                      ? "fill-current"
                      : "fill-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className={`text-xs ${theme.colors.textSecondary}`}>
              ({product.rating.count})
            </span>
          </div>

          <button
            className={`${theme.colors.accent} text-white px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
