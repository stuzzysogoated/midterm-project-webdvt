import { createContext, useContext } from "react";
import { useTransactions } from "../hooks/useTransactions";

const TransactionsContext = createContext(null);

export function TransactionsProvider({ children }) {
  const value = useTransactions();
  return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
}

export function useTransactionsContext() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("useTransactionsContext must be used within a TransactionsProvider");
  return ctx;
}
