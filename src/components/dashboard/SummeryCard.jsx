 'use client'
import { useApp } from "@/context/AppContext";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryCards() {
  const { transactions } = useApp();

  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const balance = income - expense;

  const cards = [
    {
      title: "Total Balance",
      value: balance,
      icon: Wallet,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "Total Income",
      value: income,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "Total Expenses",
      value: expense,
      icon: TrendingDown,
      color: "text-red-400",
      bgColor: "bg-red-400/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <span className="text-3xl font-bold text-white">
              ${card.value.toFixed(2)}
            </span>
          </div>
          <p className="text-gray-400">{card.title}</p>
        </div>
      ))}
    </div>
  );
}