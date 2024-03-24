import * as React from "react";

export default function Scoreboard() {
  return (
    <div className="flex flex-col self-stretch p-8 font-medium bg-white rounded-lg border border-gray-200 border-solid leading-[130%] max-w-[456px]">
      <div className="flex gap-5 justify-between items-center w-full text-sm text-slate-800">
        <div className="flex gap-1.5 self-stretch my-auto whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa272da38d47c6412dc2eccfdbf89a6f2afac1e96d1c377509027744ae9a283d?apiKey=d50a8ac48a794455921e96e10fadf455&"
            className="shrink-0 self-start w-4 aspect-square"
          />
          <div>Live</div>
        </div>
        <div className="justify-center self-stretch p-1.5 text-xs text-center rounded shadow-sm bg-slate-50 text-slate-800">
          Spain League
        </div>
        <div className="flex gap-1.5 self-stretch my-auto whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1e6c57ffad18799e2221027ab810831d10c518b8fcbaa599d5c20cf009fe457?apiKey=d50a8ac48a794455921e96e10fadf455&"
            className="shrink-0 self-start w-4 aspect-square"
          />
          <div>63:24</div>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-8">
        <div className="flex flex-col items-center text-sm text-center text-slate-800">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/87c0554db906ad7d8727c14400fa000137a09a2fabce9aa3b6fe015fe68f8120?apiKey=d50a8ac48a794455921e96e10fadf455&"
            className="border border-gray-200 border-solid aspect-square fill-slate-50 stroke-[1px] stroke-gray-200 w-[86px]"
          />
          <div className="mt-4">Team #1</div>
        </div>
        <div className="flex flex-col my-auto">
          <div className="flex gap-1.5 text-sm text-slate-800">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf460f6895a6a7756c05309b9d7300b213a83173c9ea707391bf7973d84fb7e3?apiKey=d50a8ac48a794455921e96e10fadf455&"
              className="shrink-0 self-start w-4 aspect-square"
            />
            <div>Jan 20, 2024</div>
          </div>
          <div className="flex flex-col mt-2 text-center whitespace-nowrap">
            <div className="flex gap-5 justify-center text-5xl text-slate-800">
              <div>3</div>
              <div className="my-auto text-2xl text-slate-500">:</div>
              <div>1</div>
            </div>
            <div className="z-10 self-center -mt-1.5 text-sm text-neutral-300">
              Score
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm text-center text-slate-800">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/116ee88fec8fa3b2ae5abb86d4a586936171174fe9b75762c8953fe6418dcb68?apiKey=d50a8ac48a794455921e96e10fadf455&"
            className="self-center border border-gray-200 border-solid aspect-square fill-slate-50 stroke-[1px] stroke-gray-200 w-[86px]"
          />
          <div className="mt-4">Team #2</div>
        </div>
      </div>
    </div>
  );
}
