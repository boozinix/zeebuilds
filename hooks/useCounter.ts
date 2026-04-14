'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `end` over `duration` ms with ease-out.
 * Only starts when `enabled` becomes true (tie to useInView).
 */
export function useCounter(end: number, duration: number, enabled: boolean): number {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!enabled || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [enabled, end, duration]);

  return value;
}
