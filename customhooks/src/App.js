import './App.css';
import React, { useState, useEffect } from 'react';

const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key) || sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.storageArea === localStorage || event.storageArea === sessionStorage) {
        if (event.key === key) {
          setValue(JSON.parse(event.newValue));
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [key]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, handleChange];
};

const App = () => {
  const [inputValue, setInputValue] = useStorage('myInputValue', '');

  return (
    <div>
      <input type="text" value={inputValue} onChange={setInputValue} />
    </div>
  );
};

export default App