import React, { useEffect, useState } from "react"; // ✅ Add Hooks
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ArrowUpRight, DollarSign, Sprout, Tractor } from "lucide-react";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { investmentApi } from "../api/investments"; // ✅ Import API
import { useAuth } from "../contexts/AuthContext";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalValue: 0,
    totalYield: 0,
    activeProjects: 0,
  });

  // Fetch Real Data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await investmentApi.getPortfolio();
        if (response.data?.success) {
          const investments = response.data.data.portfolio;
          setPortfolio(investments);

          // Calculate Stats
          const totalVal = investments.reduce(
            (acc: number, curr: any) => acc + parseFloat(curr.amount_invested),
            0
          );
          const totalRoi = investments.reduce(
            (acc: number, curr: any) => acc + parseFloat(curr.expected_roi),
            0
          );

          setStats({
            totalValue: totalVal,
            totalYield: totalRoi,
            activeProjects: investments.filter(
              (i: any) => i.status === "active"
            ).length,
          });
        }
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Prepare Chart Data from Real Portfolio
  const portfolioData = portfolio.reduce((acc: any[], curr) => {
    const category = curr.FarmProject?.category || "Other";
    const existing = acc.find((i) => i.name === category);
    if (existing) {
      existing.value += parseFloat(curr.amount_invested);
    } else {
      acc.push({ name: category, value: parseFloat(curr.amount_invested) });
    }
    return acc;
  }, []);

  const COLORS = ["#22c55e", "#3b82f6", "#eab308", "#a855f7"];

  // Prepare Recent Activity (Last 5 Investments)
  const recentActivity = portfolio.slice(0, 5).map((inv: any) => ({
    id: inv.id,
    action: "Investment",
    project: inv.FarmProject?.title || "Farm Project",
    amount: `-₦${parseFloat(inv.amount_invested).toLocaleString()}`,
    date: new Date(inv.createdAt).toLocaleDateString(),
  }));

  if (loading)
    return (
      <div className="p-10 text-white text-center">Loading Portfolio...</div>
    );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0] || "Investor"}
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your farm portfolio today.
          </p>
        </div>
        <Link to="/invest">
          <Button variant="primary">Invest Now</Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-farm-500/10 rounded-lg text-farm-500">
              <DollarSign size={24} />
            </div>
            <span className="text-green-500 flex items-center text-sm font-medium bg-green-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" /> Active
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
          <h3 className="text-3xl font-bold text-white">
            ₦{stats.totalValue.toLocaleString()}
          </h3>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <Sprout size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Expected ROI</p>
          <h3 className="text-3xl font-bold text-white text-green-400">
            +₦{stats.totalYield.toLocaleString()}
          </h3>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
              <Tractor size={24} />
            </div>
            <span className="text-gray-400 text-xs">Projects</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Active Projects</p>
          <h3 className="text-3xl font-bold text-white">
            {stats.activeProjects}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activity List (Replaces Growth Chart if no data, or sits alongside) */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">
            Recent Investments
          </h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-500/10 rounded-full text-green-500">
                      <Sprout size={20} />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {activity.project}
                      </p>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                  </div>
                  <span className="text-white font-medium">
                    {activity.amount}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-10">
                No investments yet. Start investing today!
              </p>
            )}
          </div>
        </div>

        {/* Allocation Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">
            Asset Allocation
          </h3>
          <div className="h-[300px]">
            {portfolioData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                    formatter={(value: any) => `₦${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No Data
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
