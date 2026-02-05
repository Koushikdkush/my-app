import { useRef, useCallback } from "react";

export function useThrottle(callback, delay = 500) {
  const lastCall = useRef(0);

  return useCallback((...args) => {
    const now = Date.now();

    if (now - lastCall.current >= delay) {
      callback(...args);
      lastCall.current = now;
    }
  }, [callback, delay]);
}
