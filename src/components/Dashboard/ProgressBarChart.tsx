import React from "react";

interface ProgressBarProps {
  percentage?: number | null;
  labelClassName?: string;
  label?: string;
}

const ProgressBarChart: React.FC<ProgressBarProps> = ({
  percentage = 10,
  labelClassName,
  label,
}) => {
  const value = Math.min(Math.max(percentage ? percentage : 0), 100);

  let bgColor;
  if (value < 33.33) {
    bgColor = "bg-progressRed";
  } else if (value < 66.67) {
    bgColor = "bg-progressOrange";
  } else {
    bgColor = "bg-progressGreen";
  }

  const ratingLabel =
    value < 33.33 ? "Poor" : value < 66.67 ? "Average" : "Good";

  const strokePositions = [50, 70, 90];
  const strokeWidth = 1.5;

  const strokes = strokePositions.map((position, index) => (
    <div
      key={index}
      className="absolute h-full bg-brandGreen"
      style={{
        left: `${position}%`,
        width: `${strokeWidth}px`,
        top: "0",
        bottom: "0",
        opacity: 1,
      }}
    />
  ));

  return (
    <div className="relative w-full max-w-lg mx-auto hover:bg-brandGreen p-2 transition-all duration-200 cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <p className={labelClassName}>{label}</p>
        <p className="text-sm text-white-600">
          {ratingLabel} ({value}%)
        </p>
      </div>

      <div className="w-full relative overflow-hidden bg-white/20 h-2 rounded-l">
        <div
          className={`h-full ${bgColor} rounded-full transition-[width] duration-300 ease-in-out`}
          style={{
            width: `${value}%`,
          }}
        />

        {strokes}
      </div>
    </div>
  );
};

export default ProgressBarChart;
