"use client";
import * as React from "react";

import SmallBlock from "@/components/small-block";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Focus from "@/components/focus";
import CarouselBlock from "@/components/carousel-content";

export default function test() {
  const cardsData = [
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Card Title 1",
      subtitle: "Card subtitle 1",
    },
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Card Title 2",
      subtitle: "Card subtitle 2",
    },
  ];

  const focusDetails = [
    {
      imgUrl: "https://example.com/image1.jpg",
      title: "Title 1",
      description: "Description for Title 1",
    },
    {
      imgUrl: "https://example.com/image2.jpg",
      title: "Title 2",
      description: "Description for Title 2",
    },
    // Add more objects as needed
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <Carousel className="w-full max-w-sm">
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
      </Carousel> */}

      <CarouselBlock cards={cardsData} />

      <SmallBlock
        imgUrl="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
        title="Sample Title"
        subtitle="Sample Subtitle"
        metric="42"
      />
      <div className="mb-20"></div>
      <Focus focusDetails={focusDetails} />
      <div className="mb-20"></div>
    </div>
  );
}
