import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Transactions from "./Pages/Transactions";
import Analytics from "./Pages/Analytics";
import Reports from "./Pages/Reports";
import { Routes, Route } from "react-router-dom";
import AddTransactionModal from "./components/AddTransactionModal";
import Error from "./Pages/Error";

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              setShowModal={setShowModal}
              transactions={transactions}
            />
          }
        />

        <Route
          path="/transactions"
          element={
            <Transactions
              setShowModal={setShowModal}
              transactions={transactions}
              setTransactions={setTransactions}
              setEditingTransaction={setEditingTransaction}
            />
          }
        />

        <Route path="/analytics" element={<Analytics transactions={transactions} />} />

        <Route path="/reports" element={<Reports transactions={transactions} />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {showModal && (
        <div className="modal-overlay">
          <AddTransactionModal
            setShowModal={setShowModal}
            setTransactions={setTransactions}
            editingTransaction={editingTransaction}
            setEditingTransaction={setEditingTransaction}
          />
        </div>
      )}
    </>
  );
};

export default App;
