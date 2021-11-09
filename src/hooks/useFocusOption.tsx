import * as React from 'react';

export type FocusDirection =
  | 'up'
  | 'down'
  | 'pageup'
  | 'pagedown'
  | 'first'
  | 'last';

function useFocusOptions<T>(itemList: T[]) {
  const [focusedElement, setFocusedElement] = React.useState<T>();

  React.useEffect(() => {
    if (itemList.length) {
      setFocusedElement(itemList[0]);
    }
  }, [itemList]);

  function focusOption(direction: FocusDirection) {
    if (!itemList.length) return;
    let nextFocus = 0; // handles 'first'
    let focusedIndex = itemList.indexOf(focusedElement!);
    if (!focusedElement) {
      focusedIndex = -1;
    }

    if (direction === 'up') {
      nextFocus = focusedIndex > 0 ? focusedIndex - 1 : itemList.length - 1;
    } else if (direction === 'down') {
      nextFocus = (focusedIndex + 1) % itemList.length;
    }

    setFocusedElement(itemList[nextFocus]);
  }

  return { focusedElement, focusOption };
}

export default useFocusOptions;
