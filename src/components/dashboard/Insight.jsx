"use client";
import { useApp } from "@/context/AppContext";
import { TrendingUp, TrendingDown, Award, Calendar } from "lucide-react";

export default function Insights() {
  const { transactions } = useApp();

  const getInsights = () => {
    if (transactions.length === 0) return null;

    // Highest spending category
    const categoryMap = {};
    transactions.forEach((t) => {
      if (t.amount < 0) {
        categoryMap[t.category] =
          (categoryMap[t.category] || 0) + Math.abs(t.amount);
      }
    });
    const topCategory = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // Monthly comparison
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthExpenses = transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          t.amount < 0 &&
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const lastMonthExpenses = transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          t.amount < 0 &&
          date.getMonth() === currentMonth - 1 &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const monthlyChange = lastMonthExpenses
      ? (
          ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) *
          100
        ).toFixed(1)
      : 0;

    // Average transaction
    const avgTransaction = (
      transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) /
      transactions.length
    ).toFixed(2);

    return { topCategory, monthlyChange, avgTransaction, currentMonthExpenses };
  };

  const insights = getInsights();

  if (!insights) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Insights</h2>
        <p className="text-gray-400">Add transactions to see insights</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Insights</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
          <Award className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-400">Highest Spending Category</p>
            <p className="text-lg font-semibold text-white">
              {insights.topCategory?.[0] || "N/A"}
            </p>
            <p className="text-sm text-gray-400">
              ${insights.topCategory?.[1]?.toFixed(2) || "0"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Monthly Comparison</p>
            <p className="text-lg font-semibold text-white">
              {insights.monthlyChange > 0 ? (
                <span className="text-red-400">
                  ↑ {insights.monthlyChange}%
                </span>
              ) : (
                <span className="text-green-400">
                  ↓ {Math.abs(insights.monthlyChange)}%
                </span>
              )}
            </p>
            <p className="text-sm text-gray-400">
              vs last month (${insights.currentMonthExpenses?.toFixed(2) || "0"}
              )
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-400">Average Transaction</p>
            <p className="text-lg font-semibold text-white">
              ${insights.avgTransaction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
