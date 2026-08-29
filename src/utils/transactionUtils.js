export const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Bills",
  "Shopping",
  "Education",
  "Health",
  "Income",
  "Other",
];

export function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `trk_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function formatCurrency(amount) {
  const value = Number(amount) || 0;
  const formatted = new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  return `₱${formatted}`;
}

export function formatSignedCurrency(amount, type) {
  const sign = type === "expense" ? "−" : "+";
  return `${sign}${formatCurrency(amount)}`;
}

export function formatDate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}

export function formatDateShort(dateStr) {
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase();
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function computeTotals(transactions) {
  return transactions.reduce(
    (acc, t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") acc.income += amt;
      else acc.expense += amt;
      return acc;
    },
    { income: 0, expense: 0 }
  );
}

export function computeCategoryBreakdown(transactions) {
  const expenseTxns = transactions.filter((t) => t.type === "expense");
  const byCategory = {};
  for (const t of expenseTxns) {
    const cat = t.category || "Other";
    byCategory[cat] = (byCategory[cat] || 0) + (Number(t.amount) || 0);
  }
  const total = Object.values(byCategory).reduce((a, b) => a + b, 0);
  return Object.entries(byCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percent: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function validateTransaction(form) {
  const errors = {};
  if (!form.title || !form.title.trim()) errors.title = "Give this track a title.";
  const amountNum = Number(form.amount);
  if (!form.amount || Number.isNaN(amountNum) || amountNum <= 0) {
    errors.amount = "Enter an amount greater than zero.";
  }
  if (form.type !== "income" && form.type !== "expense") errors.type = "Pick income or expense.";
  if (!form.category) errors.category = "Choose a flow.";
  if (!form.date) errors.date = "Pick a date.";
  return errors;
}
