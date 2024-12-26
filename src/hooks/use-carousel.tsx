import { useState, useCallback, useEffect } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

export function useCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off('select', () => {
        setCurrent(api.selectedScrollSnap());
      });
    };
  }, [api]);

  const onSelect = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return {
    api,
    current,
    setApi,
    onSelect,
  };
}