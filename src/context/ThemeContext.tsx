'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  getBrowserStorage,
  readStorageValue,
  STORAGE_KEYS,
  writeStorageValue,
} from '@/lib/persistence';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): Theme {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    const savedTheme = readStorageValue(getBrowserStorage(), STORAGE_KEYS.theme);
    const restoredTheme =
      savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme();

    setTheme(restoredTheme);
    setIsRestored(true);
  }, []);

  useEffect(() => {
    if (!isRestored) {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    writeStorageValue(getBrowserStorage(), STORAGE_KEYS.theme, theme);
  }, [isRestored, theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
