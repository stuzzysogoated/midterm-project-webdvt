import "./Logo.css";

export function Logo({ size = "md" }) {
  return (
    <span className={`logo logo--${size}`} aria-label="STRAKD">
      <span className="logo__stack" aria-hidden="true">
        STRAKD
      </span>
      <span className="logo__face">STRAKD</span>
    </span>
  );
}
