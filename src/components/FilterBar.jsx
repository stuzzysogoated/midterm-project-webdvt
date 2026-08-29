import { memo } from "react";
import { CATEGORIES } from "../utils/transactionUtils";
import "./FilterBar.css";

const TYPES = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

function FilterBarBase({ typeFilter, onTypeChange, categoryFilter, onCategoryChange, categories }) {
  const availableCategories = categories ?? CATEGORIES;

  return (
    <div className="filter-bar glass" role="group" aria-label="Filter tracks">
      <div className="filter-bar__group" role="radiogroup" aria-label="Filter by type">
        {TYPES.map((t) => (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={typeFilter === t.value}
            className={`filter-chip ${typeFilter === t.value ? "filter-chip--active" : ""}`}
            onClick={() => onTypeChange(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="filter-bar__divider" aria-hidden="true" />
      <label className="filter-bar__select">
        <span className="visually-hidden">Filter by category</span>
        <select value={categoryFilter} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="all">All Flows</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// FilterBar's own inputs rarely change identity; memoizing avoids re-render
// when the parent Dashboard re-renders due to unrelated transaction edits.
export const FilterBar = memo(FilterBarBase);
