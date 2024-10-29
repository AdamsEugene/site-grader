import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";

ChartJS.register(ArcElement, Legend);

interface DoughnutChartProps {
  percentage?: number | null;
  labelClassName?: string;
}

const MiniDoughnutChart: React.FC<DoughnutChartProps> = ({
  percentage = 10,
  labelClassName,
}) => {
  const orangeValue = Math.min(Math.max(percentage ? percentage : 0), 100);
  const remainingValue = 100 - orangeValue;

  let filledColor;
  if (orangeValue < 33.33) {
    filledColor = "#FF0000"; // Red
  } else if (orangeValue < 66.67) {
    filledColor = "#FFA500"; // Orange
  } else {
    filledColor = "#22C322"; // Green
  }

  const data = {
    labels: ["Filled", "Remaining"],
    datasets: [
      {
        label: "Percentage",
        data: [orangeValue, remainingValue],
        backgroundColor: [filledColor, "#C7CCD1"],
        borderWidth: 0,
        borderRadius: [10, 0],
        spacing: 0,
        cutout: "85%",
        circumference: 360,
        rotation: 210, // or 0 if needed
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-[400px] aspect-square m-auto">
      {/* Foreground Doughnut */}
      <div className="relative w-full h-full z-10">
        <Doughnut data={data} options={options} />
      </div>

      {/* Center Label */}
      <div className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold">
        <span className={`text-xs font-semibold ${labelClassName}`}>
          {orangeValue}
        </span>
      </div>
    </div>
  );
};

export default MiniDoughnutChart;
