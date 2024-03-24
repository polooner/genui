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

interface CardData {
  imgUrl: string;
  title: string;
  subtitle: string;
}

interface Carouselblockprops {
  cards: CardData[];
}

export default function CarouselBlock({ cards }: Carouselblockprops) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {cards.map((card, index) => (
            <CarouselItem key={index} className="pl-1 lg:basis-2/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center">
                    <img
                      className="rounded-lg"
                      src={card.imgUrl}
                      alt="Description of the image"
                    />
                    <span className="text-xl mt-2 font-semibold">
                      {card.title}
                    </span>
                    <span className="text-xs text-center p-4">
                      {card.subtitle}
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
