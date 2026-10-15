import { useCallback, useRef, type PointerEvent } from 'react';

/**
 * Tracks the pointer inside a card and publishes its position as the CSS
 * variables --mx / --my, which the `spotlight` utility uses to draw a glow
 * border that follows the cursor. Spread the returned props onto the element
 * that carries the `spotlight` class.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  const onPointerMove = useCallback((event: PointerEvent<T>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}
