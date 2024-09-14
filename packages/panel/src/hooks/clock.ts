import { useEffect, useRef } from "react";

export function useTickTock(cb: () => void, t = 10000) {
  const timer = useRef<NodeJS.Timeout | undefined>();
  useEffect(() => {
    timer.current = setInterval(cb, t);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [t, cb]);
}
