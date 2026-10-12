import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isLocked) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
}
