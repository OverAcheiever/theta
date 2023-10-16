"use client";
import { useState } from "react";

const Stats = () => {
  const [weight, setWeight] = useState(84500);
  const [height, setHeight] = useState(190);

  const bmi = () => {
    const bmi = weight / ((height / 100) * (height / 100));
    return (Math.floor(bmi) / 1000).toFixed(1);
  };

  return (
    <div className="w-full rounded-lg border-2 border-[#111] h-20 mt-4 flex justify-between items-center px-3 pl-3.5">
      <div className="w-full flex gap-x-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-4xl text-orange-600">
            {(weight / 1000).toFixed(1)}
          </div>
          <div className="text-xs text-neutral-500">YOUR WEIGHT</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold text-4xl text-orange-600">
            {Math.floor(height / 30.48)}'{Math.round((height % 30.48) / 2.54)}
          </div>
          <div className="text-xs text-neutral-500">HEIGHT</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold text-4xl text-orange-600">{bmi()}</div>
          <div className="text-xs text-neutral-500">BMI</div>
        </div>
      </div>

      <button className="h-12 rounded-full text-black px-6 bg-orange-600">
        Update
      </button>
    </div>
  );
};

export default Stats;
