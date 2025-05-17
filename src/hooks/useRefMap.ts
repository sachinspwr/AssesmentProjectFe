// hooks/useRefMap.ts
import { useRef } from 'react';

export function useRefMap<T extends object>() {
  const refs = useRef<Record<string, React.RefObject<T>>>({});

  const getRef = (key: string): React.RefObject<T> => {

    if (!refs.current[key]) {
      refs.current[key] = { current: null };
    }
    return refs.current[key];
  };

  return getRef;
}
