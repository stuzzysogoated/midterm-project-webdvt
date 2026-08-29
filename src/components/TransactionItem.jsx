import { memo } from "react";
import { Link } from "react-router-dom";
import { formatDateShort, formatSignedCurrency } from "../utils/transactionUtils";
import "./TransactionItem.css";

function TransactionItemBase({ transaction, index }) {
  const isIncome = transaction.type === "income";
  return (
    <Link to={`/transaction/${transaction.id}`} className="track-row">
      <span className="track-row__index mono">{String(index + 1).padStart(2, "0")}</span>
      <span
        className={`track-row__marker ${isIncome ? "track-row__marker--income" : "track-row__marker--expense"}`}
        aria-hidden="true"
      >
        {isIncome ? "▲" : "▼"}
      </span>
      <span className="track-row__main">
        <span className="track-row__title">{transaction.title}</span>
        <span className="track-row__meta mono">
          {(transaction.category || "OTHER").toUpperCase()} · {formatDateShort(transaction.date)}
        </span>
      </span>
      <span
        className={`track-row__amount mono ${isIncome ? "track-row__amount--income" : "track-row__amount--expense"}`}
      >
        {formatSignedCurrency(transaction.amount, transaction.type)}
      </span>
    </Link>
  );
}

// Every transaction row is re-created on each render of TransactionList (new
// filtered array reference). React.memo + a stable per-item key means only
// rows whose own props actually changed re-render, not the whole list.
export const TransactionItem = memo(TransactionItemBase);
