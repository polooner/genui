"use client";

import React from "react";

interface SmallBlockProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  metric: string;
}

export default function SmallBlock({ imgUrl, title, subtitle, metric }: SmallBlockProps) {
  return (
    <>
      <div className="flex justify-around items-center p-4 pl-8 pr-8 border-2 border-white-500 rounded-lg max-w-5xl min-w-96 h-auto">
        <img
          className="h-20 w-20 shrink-0 overflow-hidden rounded-full"
          src={imgUrl}
          alt=""
        />
        <div className="flex flex-col mr-12 ml-12">
          <span className="max-w-sm text-lg font-bold mb-4 text-center">
            {title}
          </span>
          <span className="max-w-sm text-sm text-center font-semibold">
            {subtitle}
          </span>
        </div>
        <span className="max-w-md text-3xl font-semibold">{metric}</span>
      </div>
    </>
  );
}
