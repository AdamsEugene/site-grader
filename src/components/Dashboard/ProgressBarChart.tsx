import React from "react";

interface ProgressBarProps {
  percentage?: number; // Expect a number between 0 and 100
  labelClassName?: string;
  label?: string;
}

const ProgressBarChart: React.FC<ProgressBarProps> = ({
  percentage = 10,
  labelClassName,
  label,
}) => {
  // Ensure percentage is between 0 and 100
  const value = Math.min(Math.max(percentage, 0), 100);

  // Determine the color based on the percentage
  let bgColor;
  if (value < 33.33) {
    bgColor = "bg-red-500"; // Tailwind CSS class for red
  } else if (value < 66.67) {
    bgColor = "bg-orange-500"; // Tailwind CSS class for orange
  } else {
    bgColor = "bg-green-500"; // Tailwind CSS class for green
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-1">
        <p className={labelClassName}>{label}</p>
        <p className="text-sm text-gray-200">
          {value < 33.33 ? "Poor" : value < 66.67 ? "Average" : "Good"} (
          {percentage}%)
        </p>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-3">
        <div
          className={`h-full rounded-full ${bgColor}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarChart;
