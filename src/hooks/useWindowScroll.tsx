import { useEffect, useState } from 'react';

import { isServer } from '@utils/isServer';

export const DIRECTION = {
  down: 'DOWN',
  up: 'UP',
  unset: 'UNSET',
};

const getWindowSize = () => ({
  innerHeight: !isServer ? window.innerHeight : 0,
  innerWidth: !isServer ? window.innerWidth : 0,
});

const createScrollState = (lastScrollTop: number) => {
  if (isServer) {
    return {
      scrollY: 0,
      scrollX: 0,
    };
  }
  const documentElement = document.documentElement;
  const bodyBoundingRect = documentElement.getBoundingClientRect();
  const windowSize = getWindowSize();

  const scrollY = bodyBoundingRect.top;
  const scrollX = bodyBoundingRect.left;
  const scrollYMax = documentElement.scrollHeight - windowSize.innerHeight;
  const scrollXMax = documentElement.scrollWidth - windowSize.innerWidth;
  const scrollDirection =
    lastScrollTop > bodyBoundingRect.top ? DIRECTION.down : DIRECTION.up;

  return {
    scrollY,
    scrollX,
    scrollDirection,
    scrollYMax,
    scrollXMax,
  };
};

const useWindowScroll = () => {
  const [state, setState] = useState(createScrollState(0));

  useEffect(() => {
    const listener = () =>
      setState((previousState) => createScrollState(previousState.scrollY));

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return state;
};

export default useWindowScroll;
