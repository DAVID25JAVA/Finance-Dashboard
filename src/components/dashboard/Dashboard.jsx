import Navbar from "../layout/Navbar";
import SummaryCards from "./SummeryCard";
import BalanceChart from "./BalanceChart";
import SpendingBreakdown from "./SpendingBreakDown";
import Insights from "./Insight";
import TransactionTable from "../transaction/TransactionTable";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Navbar />
        <div className="space-y-6 mt-6">
          <SummaryCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BalanceChart />
            <SpendingBreakdown />
          </div>
          
          <Insights />
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}