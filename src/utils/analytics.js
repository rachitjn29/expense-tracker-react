// ================= Summary =================

export const getTotalIncome = (transactions) => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
};

export const getTotalExpense = (transactions) => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
};

export const getTotalSavings = (transactions) => {
  return getTotalIncome(transactions) - getTotalExpense(transactions);
};

export const getTransactionCount = (transactions) => {
  return transactions.length;
};

// ================= Monthly Chart =================

export const getChartData = (transactions) => {
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  return monthNames.map((month, index) => {
    const monthTransactions = transactions.filter((transaction) => {
      return new Date(transaction.date).getMonth() === index;
    });

    return {
      month,

      income: monthTransactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0),

      expense: monthTransactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0),
    };
  });
};

// ================= Category Report =================

export const getCategoryReport = (transactions) => {
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    if (transaction.type === "expense") {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) +
        Number(transaction.amount);
    }
  });

  return Object.entries(categoryTotals)
    .map(([name, amount]) => ({
      name,
      amount,
    }))
    .sort((a, b) => b.amount - a.amount);
};

// ================= Top Categories =================

export const getTopCategories = (transactions) => {
  return getCategoryReport(transactions).slice(0, 4);
};

// ================= Quick Insights =================

export const getQuickInsights = (transactions) => {
  const totalIncome = getTotalIncome(transactions);
  const totalExpense = getTotalExpense(transactions);
  const totalSavings = totalIncome - totalExpense;

  const highestExpense =
    transactions
      .filter((transaction) => transaction.type === "expense")
      .sort((a, b) => Number(b.amount) - Number(a.amount))[0] || {};

  const largestIncome =
    transactions
      .filter((transaction) => transaction.type === "income")
      .sort((a, b) => Number(b.amount) - Number(a.amount))[0] || {};

  const averageDailySpend =
    totalExpense /
    (new Set(transactions.map((transaction) => transaction.date)).size || 1);

  const savingsRate =
    totalIncome === 0
      ? 0
      : ((totalSavings / totalIncome) * 100).toFixed(1);

  return {
    highestExpense,
    largestIncome,
    averageDailySpend,
    savingsRate,
  };
};