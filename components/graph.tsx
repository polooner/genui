import * as React from "react";

export default function Graph() {
  return (
    <div className="flex flex-col self-stretch px-8 py-8 bg-white rounded-lg border border-gray-100 border-solid leading-[130%] max-w-[456px]">
      <div className="flex flex-col">
        <div className="flex gap-5 justify-between text-right">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8c19acf9bf03bbb486c19f51e4019362451ee8b86f75a53388a78c3963d5083?apiKey=d50a8ac48a794455921e96e10fadf455&"
            className="shrink-0 border border-solid shadow-sm aspect-square border-black border-opacity-10 w-[60px]"
          />
          <div className="flex flex-col justify-end my-auto">
            <div className="text-2xl font-semibold text-slate-800">$547.10</div>
            <div className="text-xs font-medium text-green-400">
              +1.12% (-0.20%)
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-4 font-medium">
          <div className="flex gap-2">
            <div className="text-base text-slate-800">Meta Platforms Inc</div>
            <div className="justify-center self-start px-1 py-0.5 text-xs text-center whitespace-nowrap bg-white rounded border border-gray-100 border-solid shadow-sm text-slate-800">
              META
            </div>
          </div>
          <div className="flex gap-4 mt-2 text-sm">
            <div className="flex flex-col justify-center whitespace-nowrap">
              <div className="flex gap-0.5">
                <div className="text-slate-800">Open:</div>
                <div className="text-slate-500">$546.20</div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-0.5">
                <div className="text-slate-800">Previous close:</div>
                <div className="text-slate-500">$548.22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/da59c310ca3591c651492f41bb35fa86c381c0e40c28cea18f2c125186f9ad97?apiKey=d50a8ac48a794455921e96e10fadf455&"
        className="mt-5 w-full aspect-[1.75]"
      />
      <div className="flex gap-1 justify-center self-end p-1.5 mt-5 text-xs font-medium text-center bg-white rounded border border-gray-100 border-solid shadow-sm text-slate-800">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/10ed1242934f6573c7cc698006bea853421aa7d8f1e3a0e7a066a8de56c90ef7?apiKey=d50a8ac48a794455921e96e10fadf455&"
          className="shrink-0 my-auto aspect-square w-[11px]"
        />
        <div>Data by Google Finance</div>
      </div>
    </div>
  );
}
