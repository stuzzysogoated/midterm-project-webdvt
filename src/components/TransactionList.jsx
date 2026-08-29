import { memo } from "react";
import { TransactionItem } from "./TransactionItem";
import { EmptyState } from "./EmptyState";

function TransactionListBase({ transactions, emptyTitle, emptyMessage }) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title={emptyTitle ?? "NO TRACKS YET"}
        message={emptyMessage ?? "Drop your first track and start building your stack."}
        actionTo="/add-transaction"
        actionLabel="DROP A TRACK"
      />
    );
  }

  return (
    <div className="track-list" role="list">
      {transactions.map((t, i) => (
        <TransactionItem key={t.id} transaction={t} index={i} />
      ))}
    </div>
  );
}

export const TransactionList = memo(TransactionListBase);
