import React from "react";

interface GaussianDistributionChartProps {
  benchmarkValue: number | null;
}

const GaussianDistributionChart = ({
  benchmarkValue,
}: GaussianDistributionChartProps) => {
  const mean = benchmarkValue || 60; // Default to 60 if industryValue is null
  const sigma = 10;
  const curveHeight = 130; // Desired peak height of the curve
  const totalWidth = 300;
  const totalHeight = 150;

  const generateBellCurveData = () => {
    const data = [];
    let maxY = 0; // Track the maximum y value

    // Generate data points
    for (let x = mean - 30; x <= mean + 30; x += 1) {
      const y =
        (1 / (sigma * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((x - mean) ** 2) / (2 * sigma ** 2));
      data.push({ x, y });
      if (y > maxY) maxY = y; // Update maxY if the current y is larger
    }

    // Scale all y values to fit the curveHeight
    const normalizedData = data.map((point) => ({
      x: point.x,
      y: (point.y / maxY) * curveHeight, // Scale y to match the desired curveHeight
    }));

    return { normalizedData, maxY };
  };

  const { normalizedData: curveData } = generateBellCurveData();

  // Map data points to SVG coordinates
  const meanIndex = curveData.findIndex((point) => point.x === mean);
  const leftCurvePath = curveData
    .slice(0, meanIndex + 1)
    .map(
      (point, i) =>
        `${i === 0 ? "M" : "L"} ${
          ((point.x - (mean - 30)) / 60) * totalWidth
        } ${totalHeight - point.y}`
    )
    .join(" ");

  const rightCurvePath = curveData
    .slice(meanIndex)
    .map(
      (point, i) =>
        `${i === 0 ? "M" : "L"} ${
          ((point.x - (mean - 30)) / 60) * totalWidth
        } ${totalHeight - point.y}`
    )
    .join(" ");

  // Define x-axis labels (30, 40, 50, 60, 70, 80, 90) and their positions
  const xLabels = [30, 40, 50, 60, 70, 80, 90];
  const labelPositions = xLabels.map(
    (label) => ((label - (mean - 30)) / 60) * totalWidth
  );

  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <div>
        {benchmarkValue ? (
          <>
            <div>{benchmarkValue}%</div>
            <h4>Average</h4>
          </>
        ) : (
          <div>Industry Average</div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight + 20}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left Curve Path (Full White) */}
        <path
          d={leftCurvePath}
          stroke="white"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Right Curve Path (Semi-transparent White) */}
        <path
          d={rightCurvePath}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="3"
          fill="transparent"
        />

        {/* Vertical Lines from Labels to Curve */}
        {xLabels.map((label, i) => {
          const xPos = labelPositions[i];
          const curvePoint = curveData.find((point) => point.x === label);
          const yPosOnCurve = totalHeight - (curvePoint ? curvePoint.y : 0);

          return (
            <line
              key={`line-${i}`}
              x1={xPos}
              y1={totalHeight + 5} // Slightly below the x-axis labels
              x2={xPos}
              y2={yPosOnCurve}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
            />
          );
        })}

        {/* Mean Point */}
        <circle
          cx={(mean - (mean - 30)) * (totalWidth / 60)}
          cy={totalHeight - curveHeight / 1}
          r="4"
          fill="white"
        />

        {/* X-axis Labels */}
        {xLabels.map((label, i) => (
          <text
            key={`label-${i}`}
            x={labelPositions[i]}
            y={totalHeight + 15} // Position below the curve
            fontSize="10"
            fill="white"
            textAnchor="middle"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default GaussianDistributionChart;
