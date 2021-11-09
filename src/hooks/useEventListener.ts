/* eslint-disable */
import { useEffect, useRef, RefObject } from 'react';

export default function useEventListener(
  eventName: string,
  handler: any,
  element?: RefObject<HTMLElement>,
) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const currentElement = element?.current ?? window;
    const isSupported = currentElement && currentElement.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: any) => {
      if (savedHandler.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        savedHandler.current(event);
      }
    };
    currentElement.addEventListener(eventName, eventListener);

    return (): void => {
      currentElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element?.current]);
}
