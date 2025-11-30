import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { ArrowUpRight, DollarSign, Sprout, Tractor, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { MOCK_PROJECTS } from '../constants';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  // Mock Data for the dashboard
  const portfolioData = [
    { name: 'Grains', value: 45000 },
    { name: 'Vineyards', value: 25000 },
    { name: 'Livestock', value: 15000 },
    { name: 'Citrus', value: 10000 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#eab308', '#a855f7'];

  const growthData = [
    { month: 'Jan', value: 85000 },
    { month: 'Feb', value: 87500 },
    { month: 'Mar', value: 89000 },
    { month: 'Apr', value: 88500 },
    { month: 'May', value: 92000 },
    { month: 'Jun', value: 95000 },
  ];

  const recentActivity = [
    { id: 1, action: "Dividend Received", project: "Emerald Valley Corn", amount: "+$1,250", date: "2 days ago" },
    { id: 2, action: "Investment", project: "Alpine Dairy Pastures", amount: "-$10,000", date: "1 week ago" },
    { id: 3, action: "Harvest Update", project: "Napa Organic Vine", amount: "Info", date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, John</h1>
          <p className="text-gray-400">Here's what's happening with your farm portfolio today.</p>
        </div>
        <Button variant="primary">Add Funds</Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-farm-500/10 rounded-lg text-farm-500">
              <DollarSign size={24} />
            </div>
            <span className="text-green-500 flex items-center text-sm font-medium bg-green-500/10 px-2 py-1 rounded">
              <ArrowUpRight size={14} className="mr-1" /> +12.5%
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Portfolio Value</p>
          <h3 className="text-3xl font-bold text-white">$95,000.00</h3>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <Sprout size={24} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Annual Yield</p>
          <h3 className="text-3xl font-bold text-white">$11,450.00</h3>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
              <Tractor size={24} />
            </div>
            <span className="text-gray-400 text-xs">4 Active</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Active Projects</p>
          <h3 className="text-3xl font-bold text-white">4</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Portfolio Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#9ca3af" 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#22c55e' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">Asset Allocation</h3>
          <div className="h-[300px]">
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
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {portfolioData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-gray-300">{entry.name}</span>
                </div>
                <span className="text-white font-medium">${entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                <div>
                  <p className="text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.project}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
                <span className={`text-sm font-bold ${activity.amount.startsWith('+') ? 'text-green-500' : activity.amount.startsWith('-') ? 'text-white' : 'text-blue-500'}`}>
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-sm">View All History</Button>
        </div>

        {/* Your Investments List */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Your Investments</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Invested</th>
                  <th className="pb-3 font-medium">Current Value</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {MOCK_PROJECTS.slice(0, 3).map((project, idx) => {
                  // Simulate some investment data based on mock projects
                  const invested = [20000, 15000, 10000][idx];
                  const current = invested * (1 + (project.roi / 100));
                  
                  return (
                    <tr key={project.id} className="group hover:bg-gray-700/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img src={project.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium text-white">{project.title}</p>
                            <p className="text-xs text-gray-400">{project.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-300">${invested.toLocaleString()}</td>
                      <td className="py-4 text-white font-medium">${Math.floor(current).toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <Link to={`/project/${project.id}`}>
                           <button className="text-farm-500 hover:text-white hover:bg-farm-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center ml-auto gap-1">
                             View Details <ArrowRight size={12} />
                           </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};