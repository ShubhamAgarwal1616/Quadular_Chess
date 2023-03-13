import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [width, setWidth] = useState<number>(window.screen.width);

  const updateWidth = () => {
    setWidth(window.screen.width);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
};
