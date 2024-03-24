"use client";
import * as React from "react";

import SmallBlock from "@/components/small-block";

import Focus from "@/components/focus";
import CarouselBlock from "@/components/carousel-content";
import MediumBlock from "@/components/medium-block";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AccordionBlock } from "@/components/accordion-block";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils/cn";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import Graph from "@/components/graph";
import Scoreboard from "@/components/scoreboard";
import { LayoutBlock } from "@/components/layout-block";

export default function test() {
  //   const imageUrl =
  //     "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg";
  const mediumBlockDetails = {
    imgUrl:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
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
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Title 1",
      description: "Description for Title 1",
    },
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Title 2",
      description: "Description for Title 2",
    },
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Title 2",
      description: "Description for Title 2",
    },
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Title 2",
      description: "Description for Title 2",
    },
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Title 2",
      description: "Description for Title 2",
    },
    {
      imgUrl:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
      title: "Title 2",
      description: "Description for Title 2",
    },
    // Add more objects as needed
  ];

  const faqItems = [
    {
      value: "item1",
      question: "What is Lorem Ipsum?",
      answer:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      value: "item2",
      question: "Why do we use it?",
      answer:
        "It is a long established fact that a reader will be distracted by the readable content.",
    },
    // Add more items as needed
  ];

  const Layoutblock = [
    {
      title: "First Title",
      description: "This is the first description.",
      className: "custom-class-1", // This is optional
      thumbnail: "path/to/first/thumbnail.jpg", // This is optional
    },
    {
      title: "Second Title",
      description: "This is the second description.",
      // className and thumbnail are optional, can be omitted
    },
    // Add more objects as needed
  ];

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <LayoutBlock />
      <Graph />
      <div className="h-20"></div>
      <Scoreboard />
      <div className="h-20"></div>
      <AccordionBlock items={faqItems} />
      <div className="h-20"></div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />

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
