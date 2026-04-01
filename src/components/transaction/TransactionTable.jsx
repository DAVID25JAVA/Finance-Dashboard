"use client";
import { useApp } from "@/context/AppContext";
import AddTransaction from "./AddTransaction";
import { Search, Trash2, Edit, ArrowUpDown } from "lucide-react";
import { useState } from "react";

export default function TransactionTable() {
  const { 
    transactions, 
    filter, 
    setFilter, 
    role, 
    searchTerm, 
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    deleteTransaction 
  } = useApp();
  
  const [editingId, setEditingId] = useState(null);

  // Filter transactions
  let filtered = transactions.filter(t => {
    const matchesFilter = filter === "all" || 
      (filter === "income" && t.amount > 0) || 
      (filter === "expense" && t.amount < 0);
    
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Sort transactions
  filtered = [...filtered].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'amount') {
      aVal = Math.abs(aVal);
      bVal = Math.abs(bVal);
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-white">Transactions</h2>
        
        <div className="flex gap-2 flex-col sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 w-full sm:w-0 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-1">
                  Date <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left py-3 cursor-pointer" onClick={() => handleSort('title')}>
                <div className="flex items-center gap-1">
                  Title <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-left py-3 cursor-pointer" onClick={() => handleSort('category')}>
                <div className="flex items-center gap-1">
                  Category <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              <th className="text-right py-3 cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1">
                  Amount <ArrowUpDown className="w-4 h-4" />
                </div>
              </th>
              {role === "admin" && <th className="text-right py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} className="text-center py-8 text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="py-3 text-gray-300">{formatDate(t.date)}</td>
                  <td className="py-3 font-medium text-white">{t.title}</td>
                  <td className="py-3 text-gray-300">{t.category}</td>
                  <td className={`py-3 text-right font-semibold ${t.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    ${Math.abs(t.amount).toFixed(2)}
                  </td>
                  {role === "admin" && (
                    <td className="py-3 text-right">
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {role === "admin" && <AddTransaction />}
    </div>
  );
}