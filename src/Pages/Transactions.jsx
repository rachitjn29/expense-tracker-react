import "../styles/Transactions.css";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Transactions = ({
  transactions,
  setTransactions,
  setShowModal,
  setEditingTransaction,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedMonth, setSelectedMonth] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  // both filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || transaction.category === selectedCategory;

    const matchesMonth =
      selectedMonth === "All" ||
      transaction.date.split("-")[1] === selectedMonth;

    return matchesSearch && matchesCategory && matchesMonth;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedMonth]);


  // Sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
  switch (sortBy) {
    case "latest":
      return new Date(b.date) - new Date(a.date);

    case "oldest":
      return new Date(a.date) - new Date(b.date);

    case "high":
      return Number(b.amount) - Number(a.amount);

    case "low":
      return Number(a.amount) - Number(b.amount);

    default:
      return 0;
  }
});

  const currentTransactions = sortedTransactions.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);

  //Pagination
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //Delete
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  };

  return (
    <>
      <Sidebar />
      <Navbar title={"Transactions Page"} />
      <div className="transactions ml-72">
        {/* Header */}
        <div className="transaction-header">
          <div>
            <h2>Transactions</h2>
            <p>Manage your income and expenses.</p>
          </div>

          <button className="add-btn" onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* Search & Filters */}
        <div className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filters">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Gift">Gift</option>
              <option value="Bills">Bills</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="All">All Months</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="high">Highest Amount</option>
              <option value="low">Lowest Amount</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Action</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              {currentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td>
                    <span
                      className={`category ${
                        transaction.type === "income"
                          ? "income-category"
                          : "expense-category"
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>

                  <td>{transaction.date}</td>

                  <td>
                    {transaction.type === "income" ? "Income" : "Expense"}
                  </td>

                  <td
                    className={
                      transaction.type === "income" ? "income" : "expense"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {Number(transaction.amount).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditingTransaction(transaction);
                          setShowModal(true);
                        }}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => {
                          const confirmDelete = window.confirm(
                            "Want to delete this transaction?",
                          );
                          if (confirmDelete) {
                            deleteTransaction(transaction.id);
                          }
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>

                  <td>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="pagination">
          <p>
            Showing {firstIndex + 1}-
            {Math.min(lastIndex, sortedTransactions.length)} of{" "}
            {sortedTransactions.length} Transactions
          </p>

          <div className="page-buttons">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
