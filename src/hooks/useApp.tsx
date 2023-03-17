import { useEffect, useState } from 'react';

export const useApp = () => {
  const [clientSide, setClientSide] = useState<boolean>(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return clientSide;
};
