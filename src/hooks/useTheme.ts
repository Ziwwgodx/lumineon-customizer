import { useState, useEffect } from 'react';
import { AppTheme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<AppTheme>({
    mode: 'dark',
    primaryColor: '#ff0080',
    accentColor: '#8B5CF6'
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('neon-theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('neon-theme', JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme.mode);
  }, [theme]);

  const toggleMode = () => {
    setTheme(prev => ({ ...prev, mode: prev.mode === 'dark' ? 'light' : 'dark' }));
  };

  const updateColors = (primaryColor: string, accentColor: string) => {
    setTheme(prev => ({ ...prev, primaryColor, accentColor }));
  };

  return { theme, toggleMode, updateColors };
};