import { useEffect } from 'react';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup: remove a classe quando o componente desmontar
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isLocked]);
}
