import { useCallback, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(
  cb: (...args: T) => void,
  delay: number,
) => {
  const timeout = useRef<number | null>(null);

  return useCallback(
    (...args: T) => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }

      timeout.current = window.setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay],
  );
};
