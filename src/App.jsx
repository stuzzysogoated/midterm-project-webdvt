import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { TransactionsProvider } from "./context/TransactionsContext";
import { Navbar } from "./components/Navbar";
import { Scene } from "./components/Scene";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetail from "./pages/TransactionDetail";
import Summary from "./pages/Summary";
import NotFoundRoute from "./pages/NotFoundRoute";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TransactionsProvider>
        <BrowserRouter>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Scene />
          <Navbar />
          <main id="main-content">
            <AnimatedRoutes />
          </main>
        </BrowserRouter>
      </TransactionsProvider>
    </ThemeProvider>
  );
}
