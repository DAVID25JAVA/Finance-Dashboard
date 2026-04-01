"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useApp } from "@/context/AppContext";

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export default function SpendingBreakdown() {
  const { transactions } = useApp();

  const getSpendingByCategory = () => {
    const expenses = transactions.filter(t => t.amount < 0);
    const categoryMap = {};
    
    expenses.forEach(t => {
      const category = t.category;
      categoryMap[category] = (categoryMap[category] || 0) + Math.abs(t.amount);
    });
    
    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value
    }));
  };

  const data = getSpendingByCategory();

  if (data.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Spending Breakdown</h2>
        <div className="h-48 flex items-center justify-center text-gray-400">
          No expense data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Spending Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}