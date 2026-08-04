import React, { useEffect, useState } from "react";
import {
  X,
  TrendingUp,
  TrendingDown,
  Shapes,
  BadgeIndianRupee,
  CalendarRange,
  NotebookPen,
} from "lucide-react";
import "../components/AddTransactionModal.css";

const AddTransactionModal = ({
  setShowModal,
  setTransactions,
  editingTransaction,
  setEditingTransaction,
}) => {
  const [type, setType] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Gift"],
    expense: ["Food", "Travel", "Shopping", "Bills", "Health"],
  };

  useEffect(() => {
    console.log(editingTransaction);
    if (editingTransaction) {
      setType(editingTransaction.type);

      setFormData({
        title: editingTransaction.title || "",
        category: editingTransaction.category,
        amount: editingTransaction.amount,
        date: editingTransaction.date,
        description: editingTransaction.description,
      });
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !formData.title || !formData.category || !formData.amount || !formData.date) {
      return alert("Please fill all the valid details");
    }

    console.log(formData);

    if (editingTransaction) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === editingTransaction.id
            ? {
                ...transaction,
                type,
                ...formData,
              }
            : transaction,
        ),
      );

      alert("Transaction Updated Successfully");
      setEditingTransaction(null);
      setShowModal(false); // Sirf edit ke baad modal band hoga
    } else {
      const transaction = {
        id: Date.now(),
        type,
        ...formData,
      };

      setTransactions((prev) => [transaction, ...prev]);

      alert("Transaction Added Successfully");

      setType("");
      setFormData({
        title: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
    }
  };

  return (
    <div className="transaction-modal flex flex-col">
      <div className="modal-header">
        <h2>
          {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
        </h2>

        {/* X button */}
        <button
          className="close-btn p-2"
          onClick={() => {
            setEditingTransaction(null);
            setShowModal(false);
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Transaction Type */}
      <div className="input-group">
        <label>Transaction Type</label>

        <div className="transaction-type">
          <button
            type="button"
            className={`type-btn income ${type === "income" ? "active" : ""}`}
            onClick={() => setType("income")}
          >
            <TrendingUp size={20} />
            Income
          </button>

          <button
            type="button"
            className={`type-btn expense ${type === "expense" ? "active" : ""}`}
            onClick={() => setType("expense")}
          >
            <TrendingDown size={20} />
            Expense
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* title */}
        <div className="input-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="Enter title here..."
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>

        {/* Category */}
        <div className="input-group">
          <label>
            <Shapes size={18} />
            Category
          </label>

          <select
            disabled={!type}
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            <option>Select Transaction Type First</option>

            {type &&
              categories[type].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>

        {/* Amount */}
        <div className="input-group">
          <label>
            <BadgeIndianRupee size={18} /> Amount{" "}
          </label>

          <input
            type="number"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />
        </div>

        {/* Date */}
        <div className="input-group">
          <label>
            <CalendarRange size={18} /> Date{" "}
          </label>

          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({
                ...formData,
                date: e.target.value,
              })
            }
          />
        </div>

        {/* Description */}
        <div className="input-group">
          <label>
            <NotebookPen size={18} />
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Write description..."
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>

        {/* Buttons */}
        <div className="modal-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setEditingTransaction(null);
              setShowModal(false);
            }}
          >
            Cancel
          </button>

          <button type="submit" className="add-btn">
            {editingTransaction ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionModal;
