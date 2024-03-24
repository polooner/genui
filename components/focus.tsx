"use client";
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FocusProps {
  focusDetails: {
    imgUrl: string;
    title: string;
    description: string;
  }[];
}

export default function Focus({ focusDetails }: FocusProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCard = (index: number) => {
    setSelectedCardIndex(index);
  };

  if (isLoading) {
    return (
      <div className="flex">
        <div className="flex flex-col">
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xl"
          >
            <CarouselContent className=" h-[640px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="pt-0 md:basis-1/3">
                  <div className="p-1 animate-pulse">
                    <Card className="w-32 cursor-pointer">
                      <CardContent className="flex flex-col aspect-square items-center">
                        <div className="bg-gray-300 rounded w-full h-32"></div>
                        <div className="bg-gray-300 rounded mt-2 w-full h-6"></div>
                        <div className="bg-gray-300 rounded p-2 text-xs mt-2 w-full h-6"></div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Card className="w-80 ml-4 animate-pulse bg-gray-300">
          {/* <CardContent className="flex flex-col aspect-square items-center">
            <div className="bg-gray-300 rounded-lg w-full h-32"></div>
            <div className="bg-gray-300 rounded mt-2 w-full h-6"></div>
            <div className="bg-gray-300 rounded p-4 h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white w-full"></div>
          </CardContent> */}
        </Card>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex flex-col">
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full max-w-xl"
        >
          <CarouselContent className=" h-[640px]">
            {focusDetails.map((card, index) => (
              <CarouselItem key={index} className="pt-0 md:basis-1/3">
                <div className="p-1" onClick={() => handleSelectCard(index)}>
                  <Card className="max-w-32 cursor-pointer">
                    <CardContent className="flex flex-col aspect-square items-center">
                      <img
                        className="rounded-lg"
                        src={card.imgUrl}
                        alt="Description of the image"
                      />
                      <span className="text-1xl mt-2 font-semibold">
                        {card.title}
                      </span>
                      <span className="text-center p-2 text-xs">
                        {card.description.split(" ").slice(0, 4).join(" ")}...
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
      <Card className="max-w-xs ml-4">
        <CardContent className="flex flex-col aspect-square items-center">
          <img
            className="rounded-lg"
            src={focusDetails[selectedCardIndex].imgUrl}
            alt="Description of the image"
          />
          <span className="text-2xl mt-4 font-semibold">
            {focusDetails[selectedCardIndex].title}
          </span>
          <div className="text-center p-4 h-64 w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white">
            <span>{focusDetails[selectedCardIndex].description}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
