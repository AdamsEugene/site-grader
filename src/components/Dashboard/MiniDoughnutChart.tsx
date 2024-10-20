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
    filledColor = "red";
  } else if (orangeValue < 66.67) {
    filledColor = "orange";
  } else {
    filledColor = "#22C322";
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
        rotation: 210,
      },
    ],
  };

  const backgroundData = {
    labels: ["Background"],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["transparent"],
        borderWidth: 0,
        borderRadius: [10, 0],
        cutout: "85%",
        circumference: 360,
        rotation: 210,
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        position: "relative",
        aspectRatio: "1",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Doughnut data={backgroundData} options={options} />
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Doughnut data={data} options={options} />
      </div>

      <div
        className="flex flex-col items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: "bold",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <span
          className={`${labelClassName}`}
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          {orangeValue}
        </span>
      </div>
    </div>
  );
};

export default MiniDoughnutChart;
