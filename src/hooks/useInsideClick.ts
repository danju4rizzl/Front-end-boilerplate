import { useEffect, RefObject, useCallback } from 'react';

export default function useInsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
): void {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        callback();
      }
      return;
    },
    [callback, ref],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, handleClickOutside]);
}
