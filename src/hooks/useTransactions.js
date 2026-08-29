import { useCallback, useEffect, useState } from "react";
// (isReady flag removed — initial state is always synchronous/ready here)
import { generateId } from "../utils/transactionUtils";
import { SEED_TRANSACTIONS } from "../utils/seedData";

const STORAGE_KEY = "strakd:transactions";

function readFromStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeToStorage(transactions) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // localStorage may be unavailable (private browsing, quota) — fail silently,
    // the app still works for the current session using in-memory state.
  }
}

/**
 * useTransactions — single source of truth for STRAKD's transaction data.
 * Reads/writes localStorage so every page shares one hook instead of
 * duplicating persistence logic across components.
 */
export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    const stored = readFromStorage();
    if (stored) return stored;
    writeToStorage(SEED_TRANSACTIONS);
    return SEED_TRANSACTIONS;
  });
  useEffect(() => {
    writeToStorage(transactions);
  }, [transactions]);

  const addTransaction = useCallback((data) => {
    const newTransaction = { ...data, id: generateId(), amount: Number(data.amount) };
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates, amount: Number(updates.amount ?? t.amount) } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTransaction = useCallback(
    (id) => transactions.find((t) => t.id === id) ?? null,
    [transactions]
  );

  return { transactions, addTransaction, updateTransaction, deleteTransaction, getTransaction };
}
