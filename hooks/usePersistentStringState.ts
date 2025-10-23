// FIX: Import `React` to make its namespace available for type annotations like `React.Dispatch`.
import React, { useState, useEffect } from 'react';

/**
 * A custom React hook that syncs a string state value with localStorage.
 * @param {string} key - The key to use for storing the value in localStorage.
 * @param {string} initialValue - The initial value to use if nothing is in localStorage.
 * @returns {[string, React.Dispatch<React.SetStateAction<string>>]} A stateful value and a function to update it.
 */
export const usePersistentStringState = (key: string, initialValue: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ?? initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, state);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};
