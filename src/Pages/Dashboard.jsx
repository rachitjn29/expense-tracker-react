import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Pie,
} from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setShowModal, transactions }) => {
  const navigate = useNavigate();
  const data = [
    { name: "Food", value: 400 },
    { name: "Travel", value: 300 },
    { name: "Shopping", value: 300 },
    { name: "Bills", value: 200 },
  ];

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const categoryTotal = {};


  const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EF4444"];

  console.log(transactions);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <Sidebar />

        <Navbar title="Dashboard Page" />
        <div className="dashboard ml-72">
          {/* main grid */}
          <div className="dashboard-grid">
          {/* Left */}
          <div className="dashboard-left">
            {/* Total Balance */}
            <div className="total-balance-card">
              <div className="balance-info">
                <p className="balance-title text-xl">Total Balance</p>
                <h1 className="balance-amount text-6xl">
                  {totalBalance < 0 ? "-" : ""}₹
                  {Math.abs(totalBalance).toLocaleString("en-IN")}
                </h1>
              </div>

              <div className="balance-growth">
                <p className="growth-month text-sm">This Month</p>
                <h2 className="growth-amount text-3xl m-2.5">+₹5,200</h2>
                <p className="growth-text text-green-300 font-semibold">
                  ▲ 12% Growth
                </p>
              </div>
            </div>

            {/* Income & Expense */}
            <div className="summary-cards">
              <div className="income-card bg-green-100">
                <div className="card-details">
                  <p className="card-title">Total Income</p>
                  <h2 className="card-amount">₹{totalIncome}</h2>
                  <span className="income-status text-green-600 font-semibold">
                    +8% this month
                  </span>
                </div>
                <div className="card-icon">
                  <TrendingUp size={28} />
                </div>
              </div>

              <div className="expense-card bg-red-100">
                <div className="card-details">
                  <p className="card-title">Total Expense</p>
                  <h2 className="card-amount">₹{totalExpense}</h2>
                  <span className="expense-status text-red-600 font-semibold">
                    -3% this month
                  </span>
                </div>
                <div className="card-icon">
                  <TrendingDown size={28} />
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="transaction-btn-wrapper">
              <button
                className="transaction-btn"
                onClick={() => setShowModal(true)}
              >
                + Add Transaction
              </button>
            </div>
            </div>
            

          {/* Right Section */}
          <div className="dashboard-right">
            <div className="pie-chart-card">
              <h2>Expense by Category</h2>

              <div className="d-chart-box">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      align="left"
                      verticalAlign="middle"
                      wrapperStyle={{
                        paddingLeft: "30px",
                        lineHeight: "20px",
                      }}
                      itemStyle={{
                        padding: "10px 0",
                      }}
                      formatter={(value, entry) =>
                        `${value} (${entry.payload.value})`
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          </div>
          {/* Recent Transactions */}
            <div className="d-recent-transactions">
              <div className="d-transaction-header">
                <h2>Recent Transactions</h2>
                <button onClick={() => navigate("/transactions") }>View All</button>
              </div>

              <table className="d-transaction-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.slice(0,4).map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.category}</td>

                      <td>
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </td>

                      <td>{new Date(transaction.date).toLocaleDateString()}</td>

                      <td
                        className={
                          transaction.type === "income"
                            ? "income-text"
                            : "expense-text"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}₹
                        {Number(transaction.amount).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </>
  );
};

export default Dashboard;
