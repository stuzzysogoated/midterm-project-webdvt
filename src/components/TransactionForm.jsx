import { useCallback, useState } from "react";
import { CATEGORIES, todayISO, validateTransaction } from "../utils/transactionUtils";
import "./TransactionForm.css";

const EMPTY_FORM = {
  title: "",
  amount: "",
  type: "expense",
  category: "",
  date: todayISO(),
  description: "",
};

export function TransactionForm({ initialValues, onSubmit, submitLabel = "DROP IT", onCancel }) {
  const [form, setForm] = useState(() => ({ ...EMPTY_FORM, ...initialValues }));
  const [errors, setErrors] = useState({});

  const setField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const nextErrors = validateTransaction(form);
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        return;
      }
      onSubmit({ ...form, amount: Number(form.amount) });
    },
    [form, onSubmit]
  );

  return (
    <form className="txn-form" onSubmit={handleSubmit} noValidate>
      <div className={`field ${errors.title ? "field-error" : ""}`}>
        <label htmlFor="title">Track Title</label>
        <input
          id="title"
          type="text"
          placeholder="e.g. Grocery Run"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && <span className="field-error-msg" id="title-error">{errors.title}</span>}
      </div>

      <div className="txn-form__row">
        <div className={`field ${errors.amount ? "field-error" : ""}`}>
          <label htmlFor="amount">Amount (₱)</label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setField("amount", e.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? "amount-error" : undefined}
          />
          {errors.amount && <span className="field-error-msg" id="amount-error">{errors.amount}</span>}
        </div>

        <div className={`field ${errors.date ? "field-error" : ""}`}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setField("date", e.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && <span className="field-error-msg" id="date-error">{errors.date}</span>}
        </div>
      </div>

      <div className="field">
        <label id="type-label">Type</label>
        <div className="type-toggle" role="radiogroup" aria-labelledby="type-label">
          <button
            type="button"
            data-type="income"
            role="radio"
            aria-pressed={form.type === "income"}
            aria-checked={form.type === "income"}
            onClick={() => setField("type", "income")}
          >
            Stack In (Income)
          </button>
          <button
            type="button"
            data-type="expense"
            role="radio"
            aria-pressed={form.type === "expense"}
            aria-checked={form.type === "expense"}
            onClick={() => setField("type", "expense")}
          >
            Stack Out (Expense)
          </button>
        </div>
      </div>

      <div className={`field ${errors.category ? "field-error" : ""}`}>
        <label htmlFor="category">Flow / Category</label>
        <select
          id="category"
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={errors.category ? "category-error" : undefined}
        >
          <option value="" disabled>
            Choose a flow
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span className="field-error-msg" id="category-error">{errors.category}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          placeholder="Any extra notes on this move…"
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </div>

      <div className="txn-form__actions">
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            CANCEL
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-block">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
