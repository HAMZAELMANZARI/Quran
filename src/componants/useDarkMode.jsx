
import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';

    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    document.documentElement.classList.toggle('dark', isDarkMode);

    if (window.localStorage.getItem('theme')) return;
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mediaQuery) return;
    const handleChange = (event) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener?.('change', handleChange);

    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const nextIsDarkMode = !isDarkMode;
    window.localStorage.setItem('theme', nextIsDarkMode ? 'dark' : 'light');
    setIsDarkMode(nextIsDarkMode);
  };

  return [isDarkMode, toggleDarkMode];
}