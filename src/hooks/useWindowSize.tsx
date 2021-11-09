import { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: currentWidth, innerHeight: currentHeight } = window;
  return {
    currentWidth,
    currentHeight,
  };
}

export function useWindowSize() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  const handleResize = () => {
    const dimensions = getWindowDimensions();
    setWindowDimensions(dimensions);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}
