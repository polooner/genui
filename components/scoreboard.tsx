import * as React from "react";

interface ScoreboardProps {
  liveMatchImgSrc: string;
  league: string;
  timeImgSrc: string;
  matchTime: string;
  team1ImgSrc: string;
  team1Name: string;
  matchDateImgSrc: string;
  matchDate: string;
  score: { team1: number; team2: number };
  team2ImgSrc: string;
  team2Name: string;
}

export default function Scoreboard({
  liveMatchImgSrc,
  league,
  timeImgSrc,
  matchTime,
  team1ImgSrc,
  team1Name,
  matchDateImgSrc,
  matchDate,
  score,
  team2ImgSrc,
  team2Name,
}: ScoreboardProps) {
  return (
    <div className="flex flex-col self-stretch p-8 font-medium bg-white rounded-lg border border-gray-200 border-solid leading-[130%] max-w-[456px]">
      <div className="flex gap-5 justify-between items-center w-full text-sm text-slate-800">
        <div className="flex gap-1.5 self-stretch my-auto whitespace-nowrap">
          <img
            loading="lazy"
            src={liveMatchImgSrc}
            className="shrink-0 self-start w-4 aspect-square"
          />
          <div>Live</div>
        </div>
        <div className="justify-center self-stretch p-1.5 text-xs text-center rounded shadow-sm bg-slate-50 text-slate-800">
          {league}
        </div>
        <div className="flex gap-1.5 self-stretch my-auto whitespace-nowrap">
          <img
            loading="lazy"
            src={timeImgSrc}
            className="shrink-0 self-start w-4 aspect-square"
          />
          <div>{matchTime}</div>
        </div>
      </div>
      <div className="flex gap-5 justify-between mt-8">
        <div className="flex flex-col items-center text-sm text-center text-slate-800">
          <img
            loading="lazy"
            src={team1ImgSrc}
            className="border border-gray-200 border-solid aspect-square fill-slate-50 stroke-[1px] stroke-gray-200 w-[86px]"
          />
          <div className="mt-4">{team1Name}</div>
        </div>
        <div className="flex flex-col my-auto">
          <div className="flex gap-1.5 text-sm text-slate-800">
            <img
              loading="lazy"
              src={matchDateImgSrc}
              className="shrink-0 self-start w-4 aspect-square"
            />
            <div>{matchDate}</div>
          </div>
          <div className="flex flex-col mt-2 text-center whitespace-nowrap">
            <div className="flex gap-5 justify-center text-5xl text-slate-800">
              <div>{score.team1}</div>
              <div className="my-auto text-2xl text-slate-500">:</div>
              <div>{score.team2}</div>
            </div>
            <div className="z-10 self-center -mt-1.5 text-sm text-neutral-300">
              Score
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm text-center text-slate-800">
          <img
            loading="lazy"
            src={team2ImgSrc}
            className="self-center border border-gray-200 border-solid aspect-square fill-slate-50 stroke-[1px] stroke-gray-200 w-[86px]"
          />
          <div className="mt-4">{team2Name}</div>
        </div>
      </div>
    </div>
  );
}
