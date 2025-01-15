import { useCallback, useRef } from 'react';

export const useThrottle = (cb: () => void, limit: number) => {
  const lastRun = useRef<number>(0);

  return useCallback(() => {
    const now = Date.now();

    if (now - lastRun.current >= limit) {
      cb();
      lastRun.current = now;
    }
  }, [cb, limit]);
};
