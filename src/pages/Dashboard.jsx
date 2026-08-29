import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTransactionsContext } from "../context/TransactionsContext";
import { StatCard } from "../components/StatCard";
import { FilterBar } from "../components/FilterBar";
import { TransactionList } from "../components/TransactionList";
import { computeTotals, formatCurrency } from "../utils/transactionUtils";
import "./Dashboard.css";

export default function Dashboard() {
  const { transactions } = useTransactionsContext();
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Recomputed only when transactions actually change, not on every render —
  // this sum runs over the full list, so it's worth skipping when filters change.
  const totals = useMemo(() => computeTotals(transactions), [transactions]);
  const balance = totals.income - totals.expense;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const typeMatch = typeFilter === "all" || t.type === typeFilter;
      const categoryMatch = categoryFilter === "all" || t.category === categoryFilter;
      return typeMatch && categoryMatch;
    });
  }, [transactions, typeFilter, categoryFilter]);

  return (
    <div className="page">
      <motion.div
        className="dashboard__hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">The Deck</span>
        <h1 className="dashboard__title">
          Your Stack
          <span className="dashboard__title-value mono"> {formatCurrency(balance)}</span>
        </h1>
        <p className="dashboard__subtitle">Track the paper. Build the stack.</p>
      </motion.div>

      <div className="dashboard__stats">
        <StatCard eyebrow="Stack In" label="Total income" value={formatCurrency(totals.income)} tone="income" icon="↑" />
        <StatCard eyebrow="Stack Out" label="Total expenses" value={formatCurrency(totals.expense)} tone="expense" icon="↓" />
        <StatCard eyebrow="Your Stack" label="Current balance" value={formatCurrency(balance)} tone="accent" icon="◆" />
        <StatCard eyebrow="Tracks" label="Total transactions" value={transactions.length} tone="neutral" icon="≡" />
      </div>

      <div className="dashboard__list-header">
        <h2>Recent Tracks</h2>
        <Link to="/add-transaction" className="btn btn-primary btn-sm">
          DROP A TRACK
        </Link>
      </div>

      <FilterBar
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      <div className="dashboard__list glass" style={{ marginTop: 20, padding: 12 }}>
        <TransactionList
          transactions={filteredTransactions}
          emptyTitle={transactions.length === 0 ? "NO TRACKS YET" : "NO MATCHES"}
          emptyMessage={
            transactions.length === 0
              ? "Drop your first track and start building your stack."
              : "Nothing fits these filters. Try a different flow."
          }
        />
      </div>
    </div>
  );
}
