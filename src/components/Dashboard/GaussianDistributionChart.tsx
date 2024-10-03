import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BellCurveChart = () => {
  // Function to generate the Gaussian bell curve data
  const generateBellCurveData = () => {
    const mean = 60;
    const sigma = 10;
    const data = [];

    for (let x = 30; x <= 90; x += 1) {
      const y =
        (1 / (sigma * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((x - mean) ** 2) / (2 * sigma ** 2));
      data.push({ x, y: y * 100 });
    }

    return data;
  };

  // Generate the data for the chart
  const curveData = generateBellCurveData();

  // Separate the dataset into two parts: below and above the 69.7% mark
  const beforeThreshold = curveData.map((point) =>
    point.x <= 70 ? point.y : null
  ); // Data points before 69.7% (white area)
  const afterThreshold = curveData.map((point) =>
    point.x > 70 ? point.y : null
  ); // Data points after 69.7% (#f2f2f2 area)

  // Data for Chart.js
  const data = {
    labels: curveData.map((point) => point.x), // X-axis values (30 to 90)
    datasets: [
      {
        label: "Below 69.7%",
        data: beforeThreshold, // White shaded area data
        borderColor: "white",
        borderWidth: 2,
        fill: true,
        backgroundColor: "white", // Fill with white color for the covered area
        tension: 0.4, // Makes the line smooth
        pointBackgroundColor: "white",
        pointRadius: 0,
      },
      {
        label: "Above 69.7%",
        data: afterThreshold, // #f2f2f2 shaded area data
        borderColor: "#02221A",
        borderWidth: 2,
        fill: true,
        backgroundColor: "#02221A", // Fill with #f2f2f2 for the remaining area
        tension: 0.4, // Makes the line smooth
        pointBackgroundColor: "white",
        pointRadius: 0,
      },
      {
        label: "Highlighted Point",
        data: curveData.map(
          (point) => (point.x === 70 ? point.y : null) // Highlight point closest to 69.7
        ),
        borderColor: "transparent",
        pointBackgroundColor: "white",
        pointBorderColor: "white",
        pointRadius: 6, // Size of the dot
        showLine: false, // Don't draw a line for this dataset
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { display: false },
      },
      y: {
        display: false, // Hide Y-axis entirely
      },
    },
    plugins: {
      legend: { display: false }, // No need for the legend
      tooltip: { enabled: false }, // Disable tooltips
    },
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        width: "300px",
      }}
    >
      <h3 style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
        69.7% Average
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default BellCurveChart;
