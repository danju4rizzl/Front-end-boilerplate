import * as React from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
): void {
  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (ref.current && ref.current.contains(e.target as Node)) {
        return;
      }
      callback();
    },
    [callback, ref],
  );

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
}
