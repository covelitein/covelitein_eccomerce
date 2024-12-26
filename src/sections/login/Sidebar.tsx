"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCarousel } from "@/hooks/use-carousel";
import { CarouselIndicator } from "@/components/ui/carousel-indicator";
import { loginSlides } from "@/constants";
import { Image } from "@nextui-org/react";

export default function Sidebar() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000 })
  );

  const { api, current, setApi, onSelect } = useCarousel();

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{ loop: true }}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
      setApi={setApi}
    >
      <CarouselContent>
        {loginSlides.map((slide, index) => (
          <CarouselItem key={index}>
            <Card className="bg-transparent rounded-none border-0">
              <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                <Image className="h-[20rem]" src={slide.img}/>
                <p className="mt-2 text-center px-12">{slide.desc}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-12" />
      <CarouselNext className="right-12" />
      <div className="mt-4 absolute w-full bottom-12 flex items-center justify-center">
        <CarouselIndicator
          selectedIndex={current}
          itemCount={loginSlides.length}
          variant="dots"
          onSelect={onSelect}
        />
      </div>
    </Carousel>
  );
}
