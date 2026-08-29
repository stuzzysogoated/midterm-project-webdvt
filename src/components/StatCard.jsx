import { memo } from "react";
import { GlassCard } from "./GlassCard";
import "./StatCard.css";

function StatCardBase({ eyebrow, label, value, tone = "neutral", icon }) {
  return (
    <GlassCard className={`stat-card stat-card--${tone}`} strong={tone !== "neutral"}>
      <div className="stat-card__top">
        <span className="eyebrow">{eyebrow}</span>
        {icon && <span className="stat-card__icon" aria-hidden="true">{icon}</span>}
      </div>
      <p className="stat-card__value mono">{value}</p>
      <p className="stat-card__label">{label}</p>
    </GlassCard>
  );
}

export const StatCard = memo(StatCardBase);
