import { useState, useCallback } from 'react';
import { NeonConfig, DesignHistory } from '../types';

export const useDesignHistory = () => {
  const [history, setHistory] = useState<DesignHistory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [favorites, setFavorites] = useState<DesignHistory[]>([]);

  const addToHistory = useCallback((config: NeonConfig, name?: string) => {
    const newEntry: DesignHistory = {
      id: Date.now().toString(),
      config: { ...config },
      timestamp: Date.now(),
      name
    };

    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(newEntry);
      return newHistory.slice(-50); // Keep last 50 entries
    });
    setCurrentIndex(prev => Math.min(prev + 1, 49));
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return history[currentIndex - 1]?.config;
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return history[currentIndex + 1]?.config;
    }
    return null;
  }, [currentIndex, history]);

  const addToFavorites = useCallback((config: NeonConfig, name: string) => {
    const favorite: DesignHistory = {
      id: Date.now().toString(),
      config: { ...config },
      timestamp: Date.now(),
      name
    };
    setFavorites(prev => [...prev, favorite]);
  }, []);

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  }, []);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    favorites,
    addToFavorites,
    removeFromFavorites
  };
};