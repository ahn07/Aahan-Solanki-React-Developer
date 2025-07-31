
import React, { useState, FormEvent, ChangeEvent } from "react";
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

// Define type for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { theme } = useTheme() as ThemeContextType;
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission 
    console.log("Form submitted:", formData);
    alert("Thank you for your message!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={`${theme.colors.primary} min-h-screen transition-all duration-500`}>
      <div className={`${theme.spacing.container} ${theme.spacing.section}`}>
        <div className="max-w-4xl mx-auto">
          <h1
            className={`text-4xl md:text-5xl ${theme.fonts.heading} ${theme.colors.text} mb-8 text-center transition-all duration-500`}
          >
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
            >
              <h2 className={`text-2xl ${theme.fonts.heading} ${theme.colors.text} mb-6`}>Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm ${theme.fonts.heading} ${theme.colors.text} mb-2`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 ${theme.colors.primary} ${theme.colors.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm ${theme.fonts.heading} ${theme.colors.text} mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 ${theme.colors.primary} ${theme.colors.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300`}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm ${theme.fonts.heading} ${theme.colors.text} mb-2`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-2 ${theme.colors.primary} ${theme.colors.border} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full ${theme.colors.accent} text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105`}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div
                className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
              >
                <h3 className={`text-xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}>Get in Touch</h3>
                <p className={`${theme.colors.textSecondary} mb-6`}>
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${theme.colors.accent} p-2 rounded-lg`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className={theme.colors.textSecondary}>hello@themeapp.com</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className={`${theme.colors.accent} p-2 rounded-lg`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <span className={theme.colors.textSecondary}>+1 (555) 123-4567</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className={`${theme.colors.accent} p-2 rounded-lg`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span className={theme.colors.textSecondary}>123 Theme Street, Design City, DC 12345</span>
                  </div>
                </div>
              </div>

              <div
                className={`${theme.colors.secondary} rounded-lg ${theme.spacing.card} ${theme.colors.border} border transition-all duration-500`}
              >
                <h3 className={`text-xl ${theme.fonts.heading} ${theme.colors.text} mb-4`}>Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={theme.colors.textSecondary}>Monday - Friday</span>
                    <span className={theme.colors.text}>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.colors.textSecondary}>Saturday</span>
                    <span className={theme.colors.text}>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme.colors.textSecondary}>Sunday</span>
                    <span className={theme.colors.text}>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
