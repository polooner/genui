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
import MediumBlock from "@/components/medium-block";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function test() {
  const mediumBlockDetails = {
    imgUrl: "https://example.com/image.jpg",
    title: "Example Title",
    description:
      "This is an example description for the MediumBlock component.",
  };

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
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
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
      <MediumBlock mediumBlockDetails={mediumBlockDetails} />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
