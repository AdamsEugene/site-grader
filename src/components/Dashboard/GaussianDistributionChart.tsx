interface GaussianDistributionChartProps {
  benchmarkValue: number | null;
}

const GaussianDistributionChart = ({
  benchmarkValue,
}: GaussianDistributionChartProps) => {
  const mean = benchmarkValue || 60; // Default to 60 if industryValue is null
  const sigma = 11;
  const curveHeight = 110; // Desired peak height of the curve
  const totalWidth = 250;
  const totalHeight = 120;
  const xRangeMin = 30;
  const xRangeMax = 90;

  const generateBellCurveData = () => {
    const data = [];
    let maxY = 0;

    for (let x = xRangeMin; x <= xRangeMax; x += 1) {
      const y =
        (1 / (sigma * Math.sqrt(2 * Math.PI))) *
        Math.exp(-((x - mean) ** 2) / (2 * sigma ** 2));
      data.push({ x, y });
      if (y > maxY) maxY = y;
    }

    const normalizedData = data.map((point) => ({
      x: point.x,
      y: (point.y / maxY) * curveHeight,
    }));

    return { normalizedData, maxY };
  };

  const { normalizedData: curveData } = generateBellCurveData();

  const meanIndex = curveData.findIndex((point) => point.x === mean);
  const leftCurvePath = curveData
    .slice(0, meanIndex + 1)
    .map(
      (point, i) =>
        `${i === 0 ? "M" : "L"} ${
          ((point.x - xRangeMin) / (xRangeMax - xRangeMin)) * totalWidth
        } ${totalHeight - point.y}`
    )
    .join(" ");

  const rightCurvePath = curveData
    .slice(meanIndex)
    .map(
      (point, i) =>
        `${i === 0 ? "M" : "L"} ${
          ((point.x - xRangeMin) / (xRangeMax - xRangeMin)) * totalWidth
        } ${totalHeight - point.y}`
    )
    .join(" ");

  const xLabels = [30, 40, 50, 60, 70, 80, 90];
  const labelPositions = xLabels.map(
    (label) => ((label - xRangeMin) / (xRangeMax - xRangeMin)) * totalWidth
  );

  return (
    <div style={{ width: "100%", maxWidth: "250px", margin: "0 auto" }}>
      <div>
        {benchmarkValue ? (
          <>
            <div className="text-2xl font-semibold">{benchmarkValue}%</div>
            <h4>Average</h4>
          </>
        ) : (
          <div>Industry Average</div>
        )}
      </div>

      <svg
        viewBox={`-5 0 ${totalWidth + 15} ${totalHeight + 20}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={leftCurvePath}
          stroke="white"
          strokeWidth="4"
          fill="transparent"
        />
        <path
          d={rightCurvePath}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="3"
          fill="transparent"
        />

        {xLabels.map((label, i) => {
          const xPos = labelPositions[i];
          const curvePoint = curveData.find((point) => point.x === label);
          const yPosOnCurve = totalHeight - (curvePoint ? curvePoint.y : 0);

          return (
            <line
              key={`line-${i}`}
              x1={xPos}
              y1={totalHeight + 5}
              x2={xPos}
              y2={yPosOnCurve}
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1"
            />
          );
        })}

        <circle
          cx={(mean - xRangeMin) * (totalWidth / (xRangeMax - xRangeMin))}
          cy={totalHeight - curveHeight / 1}
          r="4"
          fill="white"
        />

        {xLabels.map((label, i) => (
          <text
            key={`label-${i}`}
            x={labelPositions[i]}
            y={totalHeight + 15}
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
