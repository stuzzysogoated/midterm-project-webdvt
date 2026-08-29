import { memo, useMemo } from "react";
import { formatCurrency } from "../utils/transactionUtils";
import "./SpendingChart.css";

const PALETTE = [
  "var(--gold)",
  "var(--maroon-soft)",
  "var(--gold-soft)",
  "var(--maroon)",
  "var(--charcoal)",
  "var(--text-secondary)",
  "var(--gold-soft)",
  "var(--text-tertiary)",
];

function SpendingChartBase({ breakdown, total }) {
  const segments = useMemo(() => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    return breakdown.map((item, i) => {
      const length = (item.percent / 100) * circumference;
      const segment = {
        ...item,
        color: PALETTE[i % PALETTE.length],
        dasharray: `${length} ${circumference - length}`,
        dashoffset: -offset,
      };
      offset += length;
      return segment;
    });
  }, [breakdown]);

  if (breakdown.length === 0) return null;

  return (
    <div className="spending-chart">
      <div className="spending-chart__ring-wrap">
        <svg viewBox="0 0 180 180" className="spending-chart__svg" role="img" aria-label="Spending by category">
          <circle cx="90" cy="90" r="70" className="spending-chart__track" />
          {segments.map((seg) => (
            <circle
              key={seg.category}
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke={seg.color}
              strokeWidth="20"
              strokeDasharray={seg.dasharray}
              strokeDashoffset={seg.dashoffset}
              transform="rotate(-90 90 90)"
              className="spending-chart__segment"
            />
          ))}
        </svg>
        <div className="spending-chart__center">
          <span className="eyebrow">Stack Out</span>
          <span className="spending-chart__total mono">{formatCurrency(total)}</span>
        </div>
      </div>

      <ul className="spending-chart__legend">
        {segments.map((seg) => (
          <li key={seg.category} className="spending-chart__legend-item">
            <span className="spending-chart__swatch" style={{ background: seg.color }} aria-hidden="true" />
            <span className="spending-chart__legend-label">{seg.category}</span>
            <span className="spending-chart__legend-value mono">{formatCurrency(seg.amount)}</span>
            <span className="spending-chart__legend-percent mono">{seg.percent.toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const SpendingChart = memo(SpendingChartBase);
