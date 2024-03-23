"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSpacing() {
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 lg:basis-2/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center">
                    <img
                      className="rounded-lg"
                      src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                      alt="Description of the image"
                    />
                    <span className="text-xl mt-2 font-semibold">
                      Step {index + 1}
                    </span>
                    <span className="text-xs text-center p-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Deserunt aperiam adipisci, expedita, quos sint aliquid
                      repudiandae ab rem necessitatibus sunt voluptatum corrupti
                      officia consequuntur optio dolore harum dolores explicabo
                      unde?
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      
    </div>
  );
}
