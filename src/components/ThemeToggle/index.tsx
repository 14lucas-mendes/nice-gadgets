'use client';

import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9" disabled aria-label="Loading theme">
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
      </Button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 relative overflow-hidden group"
      aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-blue-900 dark:to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icons with rotation animation */}
      <div className="relative">
        <Sun
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
          strokeWidth={1.5}
        />
        <Moon
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 ${
            isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
          strokeWidth={1.5}
        />
      </div>
    </Button>
  );
}
