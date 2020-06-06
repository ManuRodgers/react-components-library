import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay = 300) => {
  const [debounceValue, setDebounceValue] = useState<any>(value);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, value]);
  return debounceValue;
};
