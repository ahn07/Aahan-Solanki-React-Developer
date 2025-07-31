
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";


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

const About: React.FC = () => {
  const { theme } = useTheme() as ThemeContextType;

  return (
    <div className={`${theme.colors.primary} min-h-screen transition-all duration-500`}>
      <div className={`${theme.spacing.container} ${theme.spacing.section}`}>
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-5xl ${theme.fonts.heading} ${theme.colors.text} mb-8 transition-all duration-500`}
          >
            About ThemeApp
          </h1>

          <div
            className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border mb-8 transition-all duration-500`}
          >
            <h2 className={`text-2xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}>Our Mission</h2>
            <p className={`${theme.colors.textSecondary} text-lg leading-relaxed mb-6`}>
              We believe that user experience should be personal and adaptable. ThemeApp demonstrates how modern web
              applications can provide users with the power to customize their interface according to their preferences
              and needs.
            </p>
            <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
              Our multi-theme system goes beyond simple color changes, offering completely different layouts,
              typography, and user interface patterns to create truly distinct experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
            >
              <h3 className={`text-xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}>Technology Stack</h3>
              <ul className={`${theme.colors.textSecondary} space-y-2`}>
                <li>• React 18 with Hooks</li>
                <li>• Context API for state management</li>
                <li>• React Router for navigation</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Vite for build tooling</li>
                <li>• localStorage for persistence</li>
              </ul>
            </div>

            <div
              className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
            >
              <h3 className={`text-xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}>Key Features</h3>
              <ul className={`${theme.colors.textSecondary} space-y-2`}>
                <li>• Three distinct theme layouts</li>
                <li>• Responsive design patterns</li>
                <li>• Smooth theme transitions</li>
                <li>• Persistent user preferences</li>
                <li>• API integration</li>
                <li>• Cross-device compatibility</li>
              </ul>
            </div>
          </div>

          <div
            className={`mt-8 ${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
          >
            <h3 className={`text-xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}>Theme Variations</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className={`${theme.fonts.heading} ${theme.colors.text} mb-2`}>Minimalist</h4>
                <p className={`${theme.colors.textSecondary} text-sm`}>
                  Clean, light interface with sans-serif typography and spacious layout
                </p>
              </div>
              <div>
                <h4 className={`${theme.fonts.heading} ${theme.colors.text} mb-2`}>Dark Sidebar</h4>
                <p className={`${theme.colors.textSecondary} text-sm`}>
                  Professional dark theme with serif fonts and sidebar navigation
                </p>
              </div>
              <div>
                <h4 className={`${theme.fonts.heading} ${theme.colors.text} mb-2`}>Colorful Cards</h4>
                <p className={`${theme.colors.textSecondary} text-sm`}>
                  Vibrant, playful design with card-based grid layout and gradients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
