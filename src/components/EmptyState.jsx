import { Link } from "react-router-dom";
import "./EmptyState.css";

export function EmptyState({ title, message, actionTo, actionLabel }) {
  return (
    <div className="empty-state">
      <div className="empty-state__waveform" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.07}s` }} />
        ))}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {actionTo && (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
