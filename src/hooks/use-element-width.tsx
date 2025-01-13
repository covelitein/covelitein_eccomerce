// /hooks/use-resize-observer.ts
import { useState, useEffect, useCallback } from "react";

export const useElementWidth = () => {
  const [width, setWidth] = useState<number>(0);

  const observeElement = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  return { width, observeElement };
};
