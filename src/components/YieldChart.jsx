import { useState, useEffect, useRef } from 'react';

export default function YieldChart({ data, title = 'Historical APY', height = 200 }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const svgRef = useRef(null);

  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-empty">
          <p>No historical data available</p>
        </div>
        <style jsx>{`
          .chart-container {
            background: var(--noir-void);
            border: 1px solid var(--noir-slate);
            border-radius: var(--radius-md);
            padding: var(--space-md);
          }
          .chart-empty {
            height: ${height}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--noir-fog);
            font-family: var(--font-mono);
            font-size: 0.875rem;
          }
        `}</style>
      </div>
    );
  }

  // Chart dimensions
  const width = 800;
  const padding = { top: 40, right: 40, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find min/max values
  const apyValues = data.map(d => d.apy);
  const minAPY = Math.min(...apyValues);
  const maxAPY = Math.max(...apyValues);
  const apyRange = maxAPY - minAPY;
  const apyPadding = apyRange * 0.1; // Add 10% padding

  // Scale functions
  const scaleX = (index) => {
    return padding.left + (index / (data.length - 1)) * chartWidth;
  };

  const scaleY = (apy) => {
    const normalized = (apy - (minAPY - apyPadding)) / (apyRange + 2 * apyPadding);
    return padding.top + chartHeight - normalized * chartHeight;
  };

  // Generate path for line chart
  const linePath = data
    .map((point, i) => {
      const x = scaleX(i);
      const y = scaleY(point.apy);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate path for area fill
  const areaPath =
    linePath +
    ` L ${scaleX(data.length - 1)} ${padding.top + chartHeight}` +
    ` L ${scaleX(0)} ${padding.top + chartHeight}` +
    ' Z';

  // Y-axis ticks
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) => {
    const min = minAPY - apyPadding;
    const max = maxAPY + apyPadding;
    return min + (max - min) * (i / (yTicks - 1));
  });

  // X-axis ticks (show every ~7 days)
  const xTickIndices = data
    .map((_, i) => i)
    .filter((i) => i % 7 === 0 || i === data.length - 1);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {hoveredPoint && (
          <div className="chart-tooltip-inline">
            <span className="tooltip-date">{hoveredPoint.date}</span>
            <span className="tooltip-value">{hoveredPoint.apy.toFixed(2)}%</span>
          </div>
        )}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="chart-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        <g className="grid">
          {yTickValues.map((value, i) => (
            <line
              key={i}
              x1={padding.left}
              y1={scaleY(value)}
              x2={padding.left + chartWidth}
              y2={scaleY(value)}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Area fill */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          opacity="0.3"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="var(--emerald-electric)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((point, i) => (
          <circle
            key={i}
            cx={scaleX(i)}
            cy={scaleY(point.apy)}
            r="4"
            fill="var(--noir-void)"
            stroke="var(--emerald-electric)"
            strokeWidth="2"
            className="data-point"
            onMouseEnter={() => setHoveredPoint(point)}
            onMouseLeave={() => setHoveredPoint(null)}
          />
        ))}

        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + chartHeight}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
        />

        {/* Y-axis labels */}
        {yTickValues.map((value, i) => (
          <text
            key={i}
            x={padding.left - 10}
            y={scaleY(value)}
            textAnchor="end"
            dominantBaseline="middle"
            fill="var(--noir-fog)"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            {value.toFixed(1)}%
          </text>
        ))}

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={padding.top + chartHeight}
          x2={padding.left + chartWidth}
          y2={padding.top + chartHeight}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
        />

        {/* X-axis labels */}
        {xTickIndices.map((index) => {
          const point = data[index];
          const dateParts = point.date.split('-');
          const label = `${dateParts[1]}/${dateParts[2]}`; // MM/DD
          return (
            <text
              key={index}
              x={scaleX(index)}
              y={padding.top + chartHeight + 20}
              textAnchor="middle"
              fill="var(--noir-fog)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {label}
            </text>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--emerald-electric)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--emerald-electric)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        .chart-container {
          background: var(--noir-void);
          border: 1px solid var(--noir-slate);
          border-radius: var(--radius-md);
          padding: var(--space-md);
          transition: border-color var(--duration-fast);
        }

        .chart-container:hover {
          border-color: var(--emerald-electric);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-md);
          min-height: 32px;
        }

        .chart-title {
          margin: 0;
          font-size: 1rem;
          font-family: var(--font-mono);
          color: var(--emerald-electric);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .chart-tooltip-inline {
          display: flex;
          gap: var(--space-md);
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.875rem;
        }

        .tooltip-date {
          color: var(--noir-fog);
        }

        .tooltip-value {
          color: var(--emerald-electric);
          font-weight: 600;
          font-size: 1rem;
        }

        .chart-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .chart-svg :global(.data-point) {
          cursor: pointer;
          transition: r 0.2s ease;
        }

        .chart-svg :global(.data-point:hover) {
          r: 6;
          filter: drop-shadow(0 0 8px var(--emerald-electric));
        }

        .chart-empty {
          height: ${height}px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--noir-fog);
          font-family: var(--font-mono);
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
