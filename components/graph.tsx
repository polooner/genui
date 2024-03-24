import * as React from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graph() {
  const [graphData, setGraphData] = useState({
    price: "$547.10",
    change: "+1.12%",
    previousClose: "$548.22",
    open: "$546.20",
  });

  const handleUpdateGraph = () => {
    // This function would ideally fetch new data and update the state
    // For demonstration, let's simulate an update
    setGraphData({
      price: "$550.30",
      change: "+0.58%",
      previousClose: "$547.10",
      open: "$549.00",
    });
  };

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
            <div className="text-2xl font-semibold text-slate-800">
              {graphData.price}
            </div>
            <div className="text-xs font-medium text-green-400">
              {graphData.change} (Yesterday: {graphData.previousClose})
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
                <div className="text-slate-500">{graphData.open}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-0.5">
                <div className="text-slate-800">Previous close:</div>
                <div className="text-slate-500">{graphData.previousClose}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 w-full aspect-[1.75]">
        <Line
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                label: "Stock Price",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={handleUpdateGraph}
      >
        Update Graph
      </button>
    </div>
  );
}
