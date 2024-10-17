import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(ArcElement, Legend);

// Define the props type
interface DoughnutChartProps {
  percentage?: number; // Expect a number between 0 and 100
  labelClassName?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  percentage = 10,
  labelClassName,
}) => {
  const orangeValue = Math.min(Math.max(percentage, 0), 100);
  const remainingValue = 100 - orangeValue;

  let backgroundColor;
  if (orangeValue < 33.33) {
    backgroundColor = ["red", "rgba(0,0,0, 0.2)"];
  } else if (orangeValue < 66.67) {
    backgroundColor = ["orange", "rgba(0,0,0, 0.2)"];
  } else {
    backgroundColor = ["green", "rgba(0,0,0, 0.2)"];
  }

  const data = {
    labels: ["Value", "Remaining"],
    datasets: [
      {
        label: "# of Votes",
        data: [orangeValue, remainingValue],
        backgroundColor: backgroundColor,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "80%",
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px", // Set a maximum width if desired
        margin: "auto",
        position: "relative",
      }}
    >
      <Doughnut data={data} options={options} />
      <div
        className="flex"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <span className={`${labelClassName}`}>{orangeValue}%</span>
      </div>
    </div>
  );
};

export default DoughnutChart;
