import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gemini-user-api-key';

/**
 * A custom hook to manage a user-provided API key, persisting it to localStorage.
 * @returns {[string, (key: string) => void]} A tuple containing the current API key and a function to update it.
 */
export const useApiKey = (): [string, (key: string) => void] => {
  const [apiKey, setApiKeyState] = useState('');

  // On initial load, read the key from localStorage.
  useEffect(() => {
    try {
      const storedKey = window.localStorage.getItem(STORAGE_KEY);
      if (storedKey) {
        setApiKeyState(storedKey);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${STORAGE_KEY}":`, error);
    }
  }, []);

  // A memoized function to update the key in both state and localStorage.
  const setApiKey = useCallback((key: string) => {
    try {
      if (key) {
        window.localStorage.setItem(STORAGE_KEY, key);
      } else {
        // If the key is empty, remove it from storage to revert to the default key.
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setApiKeyState(key);
    } catch (error) {
      console.error(`Error setting localStorage key "${STORAGE_KEY}":`, error);
    }
  }, []);

  return [apiKey, setApiKey];
};
