import { memo } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggleBase() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">☀</span>
        <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">☾</span>
        <span className={`theme-toggle__thumb theme-toggle__thumb--${theme}`} aria-hidden="true" />
      </span>
    </button>
  );
}

// Depends only on theme context, not on any parent's frequently-changing
// props (transaction lists, filters) — memoizing skips needless re-renders.
export const ThemeToggle = memo(ThemeToggleBase);
