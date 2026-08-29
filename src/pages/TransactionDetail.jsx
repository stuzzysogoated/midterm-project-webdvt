import { useCallback, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTransactionsContext } from "../context/TransactionsContext";
import { GlassCard } from "../components/GlassCard";
import { TransactionForm } from "../components/TransactionForm";
import { formatCurrency, formatDate } from "../utils/transactionUtils";
import "./TransactionDetail.css";

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransaction, updateTransaction, deleteTransaction } = useTransactionsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const transaction = getTransaction(id);

  const handleUpdate = useCallback(
    (data) => {
      updateTransaction(id, data);
      setIsEditing(false);
    },
    [id, updateTransaction]
  );

  const handleDelete = useCallback(() => {
    deleteTransaction(id);
    navigate("/dashboard");
  }, [id, deleteTransaction, navigate]);

  if (!transaction) {
    return (
      <div className="page page--narrow">
        <div className="not-found glass">
          <span className="eyebrow">Track Details</span>
          <h1 className="page-heading">TRACK NOT FOUND</h1>
          <p className="page-subheading">This track doesn't exist, or it's already been deleted.</p>
          <Link to="/dashboard" className="btn btn-primary">
            BACK TO THE DECK
          </Link>
        </div>
      </div>
    );
  }

  const isIncome = transaction.type === "income";

  return (
    <div className="page page--narrow">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="eyebrow">Track Details</span>
        <h1 className="page-heading">{isEditing ? "EDIT TRACK" : transaction.title}</h1>
      </motion.div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard tilt={false} strong className="txn-detail-card">
              <TransactionForm
                initialValues={transaction}
                submitLabel="SAVE CHANGES"
                onSubmit={handleUpdate}
                onCancel={() => setIsEditing(false)}
              />
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard strong className="txn-detail-card">
              <div className={`txn-detail__amount mono ${isIncome ? "txn-detail__amount--income" : "txn-detail__amount--expense"}`}>
                {isIncome ? "+" : "−"}
                {formatCurrency(transaction.amount)}
              </div>

              <dl className="txn-detail__meta">
                <div>
                  <dt>Type</dt>
                  <dd>{isIncome ? "Stack In (Income)" : "Stack Out (Expense)"}</dd>
                </div>
                <div>
                  <dt>Flow</dt>
                  <dd>{transaction.category || "Other"}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{formatDate(transaction.date)}</dd>
                </div>
                <div>
                  <dt>Track ID</dt>
                  <dd className="mono txn-detail__id">{transaction.id}</dd>
                </div>
              </dl>

              {transaction.description && (
                <div className="txn-detail__description">
                  <span className="eyebrow">Description</span>
                  <p>{transaction.description}</p>
                </div>
              )}

              <div className="txn-detail__actions">
                <button type="button" className="btn" onClick={() => setIsEditing(true)}>
                  EDIT TRACK
                </button>
                <button type="button" className="btn btn-danger" onClick={() => setConfirmingDelete(true)}>
                  DELETE
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmingDelete && (
          <motion.div
            className="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmingDelete(false)}
          >
            <motion.div
              className="confirm-dialog glass-strong"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="confirm-title">Delete this track?</h2>
              <p>“{transaction.title}” will be removed from your stack for good.</p>
              <div className="confirm-dialog__actions">
                <button type="button" className="btn" onClick={() => setConfirmingDelete(false)}>
                  KEEP IT
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  DELETE TRACK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
