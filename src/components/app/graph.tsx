"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState, useRef } from "react";

const Graph = () => {
  const goal = 80000;
  const chartRef = useRef<HTMLDivElement>(null);

  const [weights, setWeights] = useState<
    {
      date: Date;
      grams: number;
    }[]
  >([
    { date: new Date("2022-01-01"), grams: 86000 },
    { date: new Date("2022-01-02"), grams: 85000 },
    { date: new Date("2022-01-03"), grams: 84500 },
    { date: new Date("2022-01-04"), grams: 83000 },
    { date: new Date("2022-01-05"), grams: 83000 },
    { date: new Date("2022-01-06"), grams: 82000 },
    { date: new Date("2022-01-07"), grams: 81000 },
    { date: new Date("2022-01-08"), grams: 80500 },
    { date: new Date("2022-01-09"), grams: 80000 },
    { date: new Date("2022-01-10"), grams: 80000 },
    { date: new Date("2022-01-11"), grams: 80000 },
    { date: new Date("2022-01-12"), grams: 80000 },
    { date: new Date("2022-01-13"), grams: 80000 },
    { date: new Date("2022-01-14"), grams: 80000 },
    { date: new Date("2022-01-15"), grams: 80000 },
  ]);

  useEffect(() => {
    // fetch weights from server
    const fetchWeights = async () => {
      const response = await fetch("/api/weights");
      const data = await response.json();
      setWeights(data);
    };
    fetchWeights();
  }, []);

  const data = weights.map((weight) => {
    return {
      name: weight.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      weight: weight.grams / 1000,
      goal: goal / 1000,
    };
  });

  const [chartWidth, setChartWidth] = useState<number>(0);
  const [chartHeight, setChartHeight] = useState<number>(0);

  useEffect(() => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.clientWidth);
      setChartHeight(chartRef.current.clientHeight);
    }
  }, [chartRef]);

  return (
    <div
      className="w-full h-80 rounded-lg border-2 border-[#111] flex items-center justify-center"
      ref={chartRef}
    >
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={data}
        margin={{
          left: -20,
          right: 40,
        }}
      >
        <CartesianGrid strokeDasharray="10 5" vertical={false} />
        <XAxis
          dataKey="name"
          interval={"equidistantPreserveStart"}
          tickCount={1}
        />
        <YAxis
          domain={[
            Math.min(...data.map((d) => d.weight)),
            Math.max(...data.map((d) => d.weight), goal),
          ]}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="orange"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="goal"
          stroke="#222"
          strokeDasharray="5 5"
        />
      </LineChart>
    </div>
  );
};

export default Graph;
