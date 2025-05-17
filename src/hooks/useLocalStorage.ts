import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  // State to store our value
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    // Retrieve initial value from localStorage
    const localStorageItem = localStorage.getItem(key);
    let parsedValue: T | null = null;
    try {
      parsedValue = localStorageItem ? JSON.parse(localStorageItem) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage value for key "${key}":`, error);
      parsedValue = defaultValue;
    }

    setValue(parsedValue!);

    // Set up a listener for local storage to access it in other windows
    const storageEventListener = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(JSON.parse(event.newValue ?? ''));
      }
    };

    window.addEventListener('storage', storageEventListener);

    // Remove listener at cleanup
    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, [defaultValue, key]);

  // Function to update localStorage and state
  const setStorageValue = (value: T) => {
    try {
      // Allow value to be a function so we have access to previous state
      const newValue = value instanceof Function ? value(value) : value;
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));

      // Dispatch a storage event for other windows/tabs
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new StorageEvent('storage', { key }));
      }
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  };

  return [value, setStorageValue];
}
