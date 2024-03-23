"use client";

import React from "react";

export default function SmallBlock() {
  return (
    <>
      <div className="flex justify-around items-center p-4 pl-8 pr-8 border-2 border-white-500 rounded-lg max-w-5xl min-w-96 h-auto">
        <img
          className="h-20 w-20 shrink-0 overflow-hidden rounded-full"
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-614810.jpg&fm=jpg"
          alt=""
        />
        <div className="flex flex-col mr-12 ml-12">
          <span className="max-w-sm text-lg font-bold mb-4 text-center">
            Lorem ipsum
          </span>
          <span className="max-w-sm text-sm text-center font-semibold">
            Lorem ipsum dolor sit amet consectetur
          </span>
        </div>
        <span className="max-w-md text-3xl font-semibold">$40B</span>
      </div>
    </>
  );
}
