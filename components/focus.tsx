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

export default function Focus() {
  const AccordionText = ({ children }: { children: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);
    const [truncatedText, setTruncatedText] = useState("");

    useEffect(() => {
      const fullText = typeof children === "string" ? children : "";
      const words = fullText.trim().split(" ");
      const truncated = words.slice(0, 5).join(" ") + "...";
      setTruncatedText(truncated);
    }, [children]);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="relative inline-block">
        <span
          ref={textRef}
          className={`inline-block transition-all duration-300 ${
            isExpanded ? "" : "truncate"
          }`}
        >
          {isExpanded ? children : truncatedText}
        </span>
      </div>
    );
  };

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
          <CarouselContent className="-mt-1 h-[600px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 md:basis-1/2">
                <div className="p-1">
                  <Card className="max-w-60">
                    <CardContent className="flex flex-col aspect-square items-center">
                      <img
                        className="rounded-lg"
                        src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                        alt="Description of the image"
                      />
                      <span className="text-xl mt-2 font-semibold">Step</span>
                      <AccordionText>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt aperiam adipisci, expedita, quos sint aliquid
                        repudiandae ab rem necessitatibus sunt voluptatum
                        corrupti officia consequuntur optio dolore harum dolores
                        explicabo unde?
                      </AccordionText>
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
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
            alt="Description of the image"
          />
          <span className="text-xl mt-2 font-semibold">Step</span>
          <span className="text-center p-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            aperiam adipisci, expedita, quos sint aliquid repudiandae ab rem
            necessitatibus sunt voluptatum corrupti officia consequuntur optio
            dolore harum dolores explicabo unde?
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
