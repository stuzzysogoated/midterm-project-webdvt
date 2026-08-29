import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTransactionsContext } from "../context/TransactionsContext";
import { GlassCard } from "../components/GlassCard";
import { SpendingChart } from "../components/SpendingChart";
import { EmptyState } from "../components/EmptyState";
import { ThemeToggle } from "../components/ThemeToggle";
import { computeCategoryBreakdown, computeTotals, formatCurrency } from "../utils/transactionUtils";
import "./Summary.css";

export default function Summary() {
  const { transactions } = useTransactionsContext();

  const breakdown = useMemo(() => computeCategoryBreakdown(transactions), [transactions]);
  const totals = useMemo(() => computeTotals(transactions), [transactions]);
  const expenseCount = useMemo(() => transactions.filter((t) => t.type === "expense").length, [transactions]);
  const avgExpense = expenseCount > 0 ? totals.expense / expenseCount : 0;
  const topFlow = breakdown[0];

  return (
    <div className="page">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="summary__header">
          <div>
            <span className="eyebrow">Summary</span>
            <h1 className="page-heading">THE BREAKDOWN</h1>
            <p className="page-subheading">See where the stack is going.</p>
          </div>
          <div className="summary__theme glass" aria-label="Theme">
            <span className="eyebrow">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </motion.div>

      {breakdown.length === 0 ? (
        <GlassCard tilt={false} strong>
          <EmptyState
            title="NO FLOW DATA"
            message="Once you start spending, we'll break it down for you."
            actionTo="/add-transaction"
            actionLabel="DROP A TRACK"
          />
        </GlassCard>
      ) : (
        <>
          <GlassCard tilt={false} strong className="summary__chart-card">
            <SpendingChart breakdown={breakdown} total={totals.expense} />
          </GlassCard>

          <div className="summary__insights">
            <GlassCard>
              <span className="eyebrow">Bars</span>
              <p className="summary__insight-label">Total Expenses</p>
              <p className="summary__insight-value mono">{formatCurrency(totals.expense)}</p>
            </GlassCard>
            <GlassCard>
              <span className="eyebrow">Top Flow</span>
              <p className="summary__insight-label">{topFlow?.category ?? "—"}</p>
              <p className="summary__insight-value mono">{formatCurrency(topFlow?.amount ?? 0)}</p>
            </GlassCard>
            <GlassCard>
              <span className="eyebrow">Bars</span>
              <p className="summary__insight-label">Expense Tracks</p>
              <p className="summary__insight-value mono">{expenseCount}</p>
            </GlassCard>
            <GlassCard>
              <span className="eyebrow">Bars</span>
              <p className="summary__insight-label">Average Expense</p>
              <p className="summary__insight-value mono">{formatCurrency(avgExpense)}</p>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
}
