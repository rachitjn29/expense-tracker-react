import React from "react";
import "../styles/Analytics.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  getTotalIncome,
  getTotalExpense,
  getTotalSavings,
  getTransactionCount,
  getChartData,
  getTopCategories,
  getQuickInsights,
} from "../utils/analytics";

const Analytics = ({ transactions }) => {
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);
  const totalSavings = getTotalSavings(transactions);
  const totalTransactions = getTransactionCount(transactions);

  const chartData = getChartData(transactions);

  const topCategories = getTopCategories(transactions);

  const { highestExpense, largestIncome, averageDailySpend, savingsRate } =
    getQuickInsights(transactions);


  return (
    <>
      <Sidebar />
      <Navbar title={"Analytics Page"} />
      <div className="analytics ml-72">
        <div className="analytics-header">
          <div>
            <h2>Analytics</h2>
            <p>Track your spending habits</p>
          </div>

          <select>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Summary */}

        <div className="summary">
          <div className="summary-card">
            <h4>Total Income</h4>
            <h3 style={{ color: "green" }}>
              ₹{totalIncome.toLocaleString("en-IN")}
            </h3>
          </div>

          <div className="summary-card">
            <h4>Total Expense</h4>
            <h3 style={{ color: "red" }}>
              ₹{totalExpense.toLocaleString("en-IN")}
            </h3>
          </div>

          <div className="summary-card">
            <h4>Total Savings</h4>
              <h3 style={{ color: totalSavings < 0 ? "red" : "green" }}>
                {totalSavings < 0 ? "-" : "+"}₹
                {Math.abs(totalSavings).toLocaleString("en-IN")}
              </h3>
          </div>

          <div className="summary-card">
            <h4>Transactions</h4>
            <h3>{totalTransactions}</h3>
          </div>
        </div>

        <div className="a-chart-box">
          <h3>Income vs Expense</h3>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

              <XAxis dataKey="month" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories */}

        <div className="box">
          <h3>Top Categories</h3>

          {topCategories.map((item, index) => (
            <div className="category-item" key={index}>
              <div className="left">
                <p>{item.name}</p>
              </div>

              <h4>₹{item.amount.toLocaleString("en-IN")}</h4>
            </div>
          ))}
        </div>

        {/* Quick Insights */}

        <div className="box">
          <h3>Quick Insights</h3>

          <div className="insights">
            <div className="insight-card">
              <h4>Average Daily Spend</h4>
              <p>₹{averageDailySpend.toFixed(0)}</p>
            </div>

            <div className="insight-card">
              <h4>Highest Expense</h4>
              <p>
                {highestExpense.title || "-"} (₹
                {Number(highestExpense.amount || 0).toLocaleString("en-IN")})
              </p>
            </div>

            <div className="insight-card">
              <h4>Largest Income</h4>
              <p>
                {largestIncome.title || "-"} (₹
                {Number(largestIncome.amount || 0).toLocaleString("en-IN")})
              </p>
            </div>

            <div className="insight-card">
              <h4>Savings Rate</h4>
              <p>
                {Number(savingsRate) < 0 ? "" : "+"}
                {savingsRate}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
