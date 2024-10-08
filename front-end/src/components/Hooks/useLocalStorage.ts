import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Function to get the value from local storage or return the initial value
  const getStoredValue = (): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to hold the local storage value
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Effect to update local storage when the stored value changes
  useEffect(() => {
    try {
      const valueToStore =
        storedValue instanceof Function ? storedValue() : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, storedValue]);

  // Function to remove the item from local storage
  const remove = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue); // Reset the state to the initial value
    } catch (error) {
      console.error(`Error removing localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setStoredValue, remove] as const; // Return the stored value, the setter function, and the remove function
}

export default useLocalStorage;
