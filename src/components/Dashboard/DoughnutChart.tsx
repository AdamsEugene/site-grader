import React from "react";

interface DoughnutChartProps {
  percentage?: number | null;
  labelClassName?: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  percentage = 10,
  labelClassName,
}) => {
  const orangeValue = Math.min(Math.max(percentage || 0, 0), 100);
  const totalArcCircumference = (300 / 360) * 283;
  const filledArcLength = (orangeValue / 100) * totalArcCircumference;
  const strokeDashArray = `${filledArcLength} ${totalArcCircumference}`;

  let filledColor;
  if (orangeValue < 33.33) {
    filledColor = "red";
  } else if (orangeValue < 66.67) {
    filledColor = "orange";
  } else {
    filledColor = "#22C322";
  }

  const calculateStrokePositions = (
    angle: number,
    heightInPixels: number,
    verticalOffset: number,
    rotationAngle: number
  ) => {
    const adjustedAngle = angle + rotationAngle;
    const shortX = 50 + 40 * Math.cos(((adjustedAngle + 120) * Math.PI) / 180);
    const shortY =
      50 +
      verticalOffset +
      40 * Math.sin(((adjustedAngle + 120) * Math.PI) / 180);
    const shortXEnd =
      shortX +
      heightInPixels * Math.cos(((adjustedAngle + 120) * Math.PI) / 180);
    const shortYEnd =
      shortY +
      heightInPixels * Math.sin(((adjustedAngle + 120) * Math.PI) / 180);
    return { shortX, shortY, shortXEnd, shortYEnd };
  };

  const strokeWidthGroup1 = 1.5;
  const strokeWidthGroup2 = 0.5;

  return (
    <div
      style={{
        position: "relative",
        width: "200px",
        height: "200px",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ transform: "rotate(120deg)" }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="7"
          fill="transparent"
          strokeDasharray={`${totalArcCircumference} ${
            283 - totalArcCircumference
          }`}
          strokeDashoffset="0"
        />

        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={filledColor}
          strokeWidth="7"
          fill="transparent"
          strokeDasharray={strokeDashArray}
          strokeDashoffset="0"
          strokeLinecap="round"
        />

        {[
          {
            angle: 33,
            heightInPixels: 8,
            verticalOffset: 2,
            rotationAngle: -2,
            slantAngle: 0,
          },
          {
            angle: 85,
            heightInPixels: 7,
            verticalOffset: -2,
            rotationAngle: 15,
            slantAngle: -5,
          },
          {
            angle: 172,
            heightInPixels: 7,
            verticalOffset: -2,
            rotationAngle: -10,
            slantAngle: 2,
          },
        ].map(
          (
            {
              angle,
              heightInPixels,
              verticalOffset,
              rotationAngle,
              slantAngle,
            },
            index
          ) => {
            const { shortX, shortY, shortXEnd, shortYEnd } =
              calculateStrokePositions(
                angle,
                heightInPixels,
                verticalOffset,
                rotationAngle
              );
            return (
              <line
                key={index}
                x1={shortX}
                y1={shortY}
                x2={shortXEnd}
                y2={shortYEnd}
                stroke="#00523D"
                strokeWidth={strokeWidthGroup1}
                strokeLinecap="round"
                transform={`rotate(${slantAngle}, ${shortX}, ${shortY})`}
              />
            );
          }
        )}

        {[
          {
            angle: 173,
            heightInPixels: 6,
            verticalOffset: -5,
            rotationAngle: -10,
            slantAngle: 49,
          },
          {
            angle: 173,
            heightInPixels: 10,
            verticalOffset: -2,
            rotationAngle: -10,
            slantAngle: 50,
          },
          {
            angle: 176,
            heightInPixels: 11,
            verticalOffset: -1,
            rotationAngle: -10,
            slantAngle: 48,
          },
          {
            angle: 181,
            heightInPixels: 10,
            verticalOffset: -1,
            rotationAngle: -10,
            slantAngle: 44,
          },
          {
            angle: 186,
            heightInPixels: 6,
            verticalOffset: -1,
            rotationAngle: -10,
            slantAngle: 39,
          },
        ].map(
          (
            {
              angle,
              heightInPixels,
              verticalOffset,
              rotationAngle,
              slantAngle,
            },
            index
          ) => {
            const { shortX, shortY, shortXEnd, shortYEnd } =
              calculateStrokePositions(
                angle,
                heightInPixels,
                verticalOffset,
                rotationAngle
              );
            return (
              <line
                key={index}
                x1={shortX}
                y1={shortY}
                x2={shortXEnd}
                y2={shortYEnd}
                stroke="#00523D"
                strokeWidth={strokeWidthGroup2}
                strokeLinecap="round"
                transform={`rotate(${slantAngle}, ${shortX}, ${shortY})`}
              />
            );
          }
        )}
      </svg>

      <div
        className="flex flex-col items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <span
          className={`${labelClassName}`}
          style={{ fontSize: "42px", fontWeight: 600 }}
        >
          {orangeValue}
        </span>

        <span style={{ fontSize: "14px", fontWeight: "medium" }}>
          out of 100
        </span>
      </div>
    </div>
  );
};

export default DoughnutChart;
