"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useApp } from "@/context/AppContext";

export default function BalanceChart() {
  const { transactions } = useApp();

  // Calculate running balance over time
  const getChartData = () => {
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    let runningBalance = 0;
    return sortedTransactions.map(t => {
      runningBalance += t.amount;
      return {
        date: new Date(t.date).toLocaleDateString(),
        balance: runningBalance,
        amount: t.amount
      };
    });
  };

  const data = getChartData();

  if (data.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Balance Trend</h2>
        <div className="h-48 flex items-center justify-center text-gray-400">
          No transactions to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Balance Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}