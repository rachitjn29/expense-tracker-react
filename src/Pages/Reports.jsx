import React from "react";
import "../styles/Reports.css";
import { Download } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  getTotalIncome,
  getTotalExpense,
  getTotalSavings,
  getTransactionCount,
  getChartData,
  getCategoryReport,
  getQuickInsights,
} from "../utils/analytics";

const Reports = ({ transactions }) => {
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);
  const totalSavings = getTotalSavings(transactions);
  const totalTransactions = getTransactionCount(transactions);

  const chartData = getChartData(transactions);

  const categories = getCategoryReport(transactions);

  const { highestExpense, largestIncome, averageDailySpend, savingsRate } =
    getQuickInsights(transactions);

  return (
    <>
      <Sidebar />
      <Navbar title={"Reports Page"} />
      <div className="reports ml-72">
        <div className="reports-header">
          <div>
            <h2>Reports</h2>
            <p>View your financial summary</p>
          </div>

          <select>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Summary */}

        <div className="report-box">
          <h3>Financial Summary</h3>

          <div className="summary-row">
            <span>Total Income</span>

            <strong className="income">
              ₹{totalIncome.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="summary-row">
            <span>Total Expense</span>

            <strong className="expense">
              ₹{totalExpense.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="summary-row">
            <span>Total Balance</span>

            <strong className={totalSavings >= 0 ? "income" : "expense"}>
              {totalSavings < 0 ? "-₹" : "₹"}
              {Math.abs(totalSavings).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {/* Categories */}

        <div className="report-box">
          <h3>Category Report</h3>

          {categories.length === 0 ? (
            <p>No Expense Categories</p>
          ) : (
            categories.map((item) => (
              <div className="summary-row" key={item.name}>
                <span>{item.name}</span>

                <strong>₹{item.amount.toLocaleString("en-IN")}</strong>
              </div>
            ))
          )}
        </div>

        {/* Export */}

        <div className="export-buttons">
          <button onClick={() => alert("PDF Export Coming Soon")}>
            <Download size={18} />
            Export PDF
          </button>

          <button onClick={() => alert("CSV Export Coming Soon")}>
            <Download size={18} />
            Export CSV
          </button>
        </div>

        <p className="mt-2 text-xl font-medium">
          You can Export Reports from here..
        </p>
      </div>
    </>
  );
};

export default Reports;
