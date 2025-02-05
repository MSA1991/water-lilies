import { useEffect, useCallback } from 'react';

export const useLockScroll = (isLock: boolean) => {
  const handleTabPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (isLock) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleTabPress);
    } else {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleTabPress);
    }
  }, [isLock, handleTabPress]);
};
