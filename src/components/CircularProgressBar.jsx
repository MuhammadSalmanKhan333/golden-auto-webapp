import React from "react";
const CircularProgressBar = ({ progress }) => {
  const radius = 45;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex justify-center items-center">
      <svg width="104" height="104" viewBox="0 0 100 100">
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#000"
          strokeWidth={strokeWidth}
          fill="none"
          opacity="0.2"
        />

        {/* Progress Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#000"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />

        {/* Progress Text */}
        <text
          x="50"
          y="55"
          textAnchor="middle"
          fontSize="24"
          fontWeight="semi-bold"
          fill="black "
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
