// components/ThemeToggle.tsx
"use client";
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // If no saved theme, use system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Update the theme when toggled
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply the theme to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl  border-foreground dark:border-foreground transition-colors duration-300"
    >
      {isDarkMode ? (
        <Moon className="w-6 h-6 text-foreground dark:text-foreground" />
      ) : (
        <Sun className="w-6 h-6 text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
