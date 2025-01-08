// app/hooks/useSearchHistory.ts
import { useState, useEffect } from 'react';

const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage on initial load
  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Add new search to history
  const addToHistory = (query: string) => {
    if (!query.trim()) return;

    setSearchHistory(prevHistory => {
      // Remove duplicates and keep most recent
      const newHistory = [
        query.trim(), 
        ...prevHistory.filter(item => item !== query.trim())
      ].slice(0, MAX_HISTORY_ITEMS);

      // Save to localStorage
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));

      return newHistory;
    });
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return { 
    searchHistory, 
    addToHistory, 
    clearHistory 
  };
}