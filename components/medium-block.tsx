"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MediumBlockDetails {
  imgUrl: string;
  title: string;
  description: string;
}

export default function MediumBlock({ mediumBlockDetails }: { mediumBlockDetails: MediumBlockDetails }) {
  return (
    <>
      <Card className="max-w-xs ml-4">
        <CardContent className="flex flex-col aspect-square items-center">
          <img
            className="rounded-lg"
            src={mediumBlockDetails.imgUrl}
            alt="Description of the image"
          />
          <span className="text-2xl mt-2 font-semibold">
            {mediumBlockDetails.title}
          </span>
          <div className="text-center p-4 h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white">
            <span>{mediumBlockDetails.description}</span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
