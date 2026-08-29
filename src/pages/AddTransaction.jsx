import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTransactionsContext } from "../context/TransactionsContext";
import { TransactionForm } from "../components/TransactionForm";
import { GlassCard } from "../components/GlassCard";
import "./AddTransaction.css";

export default function AddTransaction() {
  const { addTransaction } = useTransactionsContext();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (data) => {
      addTransaction(data);
      navigate("/dashboard");
    },
    [addTransaction, navigate]
  );

  return (
    <div className="page page--narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="eyebrow">Add Transaction</span>
        <h1 className="page-heading">DROP A TRACK</h1>
        <p className="page-subheading">Add a new move to your money flow.</p>
      </motion.div>

      <GlassCard tilt={false} className="txn-form-card" strong>
        <TransactionForm onSubmit={handleSubmit} submitLabel="DROP IT" onCancel={() => navigate(-1)} />
      </GlassCard>
    </div>
  );
}
