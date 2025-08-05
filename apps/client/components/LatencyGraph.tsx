"use client";
import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LatencyDataPoint {
  time: string;
  latency: number;
  status: "good" | "bad" | "unknown";
}

interface LatencyGraphProps {
  data: LatencyDataPoint[];
  averageLatency: number;
  className?: string;
}

export function LatencyGraph({
  data,
  averageLatency,
  className = "",
}: LatencyGraphProps) {
  const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div
        className={`bg-gray-900 rounded-lg p-4 border border-gray-800 ${className}`}
      >
        <h3 className="text-sm font-medium text-gray-300 mb-4">
          Response Time
        </h3>
        <div className="flex items-center justify-center h-24 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const maxLatency = Math.max(...data.map((d) => d.latency), 1);
  const minLatency = Math.min(
    ...data.filter((d) => d.latency > 0).map((d) => d.latency),
    0
  );

  // Calculate trend
  const recentData = data.slice(-5).filter((d) => d.latency > 0);
  const trend =
    recentData.length >= 2
      ? recentData[recentData.length - 1].latency - recentData[0].latency
      : 0;

  const getTrendIcon = () => {
    if (trend > 10) return <TrendingUp className="w-3 h-3 text-red-400" />;
    if (trend < -10) return <TrendingDown className="w-3 h-3 text-green-400" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getTrendColor = () => {
    if (trend > 10) return "text-red-400";
    if (trend < -10) return "text-green-400";
    return "text-gray-400";
  };

  // Create SVG path for line chart
  const createPath = () => {
    const width = 280;
    const height = 60;
    const padding = 10;

    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y =
        height -
        padding -
        (point.latency / maxLatency) * (height - 2 * padding);
      return { x, y };
    });

    const pathData = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");

    return { pathData, points };
  };

  const { pathData, points } = createPath();

  return (
    <div
      className={`bg-[#0a0a0a] rounded-lg p-4 border border-gray-800 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">Response Time</h3>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <span className={`text-xs ${getTrendColor()}`}>
            {Math.abs(trend).toFixed(0)}ms
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-white">
            {averageLatency}
          </span>
          <span className="text-sm text-gray-400">ms avg</span>
        </div>
        <div className="text-xs text-gray-500">
          Range: {minLatency}ms - {maxLatency}ms
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="relative">
        <svg
          width="100%"
          height="80"
          viewBox="0 0 300 80"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="1" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[20, 40, 60].map((y) => (
            <line
              key={y}
              x1="10"
              y1={y}
              x2="290"
              y2={y}
              stroke="#374151"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Area under curve */}
          <path
            d={`${pathData} L 290,70 L 10,70 Z`}
            fill="url(#areaGradient)"
          />

          {/* Main line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {/* Data points */}
          {points.map((point, index) => (
            <g key={index}>
              {index === points.length - 1 ? (
                <>
                  {/* Outer breathing ring */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="none"
                    stroke={
                      data[index].status === "good"
                        ? "#ea580c"
                        : data[index].status === "bad"
                          ? "#dc2626"
                          : "#6b7280"
                    }
                    strokeWidth="2"
                    opacity="0.6"
                  >
                    {/* expand radius */}
                    <animate
                      attributeName="r"
                      values="6;14;6"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                    {/* fade stroke */}
                    <animate
                      attributeName="opacity"
                      values="0.45;0;0.45"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Main pulsing dot */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={hoveredPoint === index ? "7" : "4"}
                    fill={
                      data[index].status === "good"
                        ? "#ea580c"
                        : data[index].status === "bad"
                          ? "#dc2626"
                          : "#6b7280"
                    }
                    stroke="#1f2937"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    {/* subtle radius pulse so dot 'breathes' too */}
                    <animate
                      attributeName="r"
                      values={hoveredPoint === index ? "7;9;7" : "4;6;4"}
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                    {/* optional fill opacity pulse */}
                    <animate
                      attributeName="fill-opacity"
                      values="1;0.85;1"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              ) : (
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hoveredPoint === index ? "6" : "4"}
                  fill={
                    data[index].status === "good"
                      ? "#ea580c"
                      : data[index].status === "bad"
                        ? "#dc2626"
                        : "#6b7280"
                  }
                  stroke="#1f2937"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              )}

              {/* Tooltip (unchanged) */}
              {hoveredPoint === index && (
                <g className="pointer-events-none">
                  <rect
                    x={point.x - 45}
                    y={point.y - 55}
                    width="90"
                    height="45"
                    rx="6"
                    fill="#1f2937"
                    stroke="#374151"
                    strokeWidth="1"
                    filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))"
                  />
                  <text
                    x={point.x}
                    y={point.y - 40}
                    textAnchor="middle"
                    className="text-xs fill-orange-400 font-medium"
                  >
                    {data[index].time}
                  </text>
                  <text
                    x={point.x}
                    y={point.y - 28}
                    textAnchor="middle"
                    className="text-xs fill-white font-bold"
                  >
                    {data[index].latency}ms
                  </text>
                  <text
                    x={point.x}
                    y={point.y - 16}
                    textAnchor="middle"
                    className={`text-xs capitalize font-medium ${
                      data[index].status === "good"
                        ? "fill-green-400"
                        : data[index].status === "bad"
                          ? "fill-red-400"
                          : "fill-gray-400"
                    }`}
                  >
                    {data[index].status}
                  </text>
                </g>
              )}
            </g>
          ))}
        </svg>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{data[0]?.time || "--:--"}</span>
        <span>{data[data.length - 1]?.time || "--:--"}</span>
      </div>
    </div>
  );
}
